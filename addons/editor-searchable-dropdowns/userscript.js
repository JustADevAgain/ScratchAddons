export default async function ({ addon, global, console }) {
  // The hierarchy is:
  // blocklyDropDownDiv (position, background color, etc.) -> blocklyDropDownContent (scrollbar) -> blocklyDropdownMenu (items)
  // The capitalization of dropdown is inconsistent in blockly too.
  let blocklyDropDownDiv = null;
  let blocklyDropDownContent = null;
  let blocklyDropdownMenu = null;

  function createSearchBar(node) {
    blocklyDropdownMenu = node;
    blocklyDropdownMenu.focus = () => {}; // no-op focus() so it can't steal it from the search bar

    // Lock the width of the dropdown before adding the search bar.
    blocklyDropDownContent.style.width = getComputedStyle(blocklyDropDownContent).width;

    const searchBar = document.createElement("input");
    searchBar.type = "text";
    searchBar.addEventListener("input", handleInputEvent);
    searchBar.addEventListener("keydown", handleKeyDownEvent);
    searchBar.classList.add("u-dropdown-searchbar");
    blocklyDropdownMenu.insertBefore(searchBar, blocklyDropdownMenu.firstChild);

    // Lock the height of the dropdown after adding the search bar.
    blocklyDropDownContent.style.height = getComputedStyle(blocklyDropDownContent).height;

    // Fix layout issues when the dropdown is opened above the block (instead of below) and there is no scroll bar.
    const hasScrollBar = blocklyDropDownContent.scrollHeight > blocklyDropDownContent.clientHeight;
    if (!hasScrollBar) {
      const blocklyDropDownArrow = blocklyDropDownDiv.querySelector(".blocklyDropDownArrow");
      if (blocklyDropDownArrow.classList.contains("arrowBottom")) {
        const searchBarHeight = searchBar.offsetHeight;
        blocklyDropDownDiv.style.transform += ` translateY(-${searchBarHeight}px)`;
        blocklyDropDownArrow.style.transform = ` translateY(${searchBarHeight}px) ${blocklyDropDownArrow.style.transform}`;
      }
    }

    searchBar.focus();
  }

  function cleanup() {
    blocklyDropdownMenu = null;
    // Reset all the things we changed about the dropdown menu.
    // This matters because there's other types of dropdowns such as angle selectors where a search bar doesn't make sense.
    blocklyDropDownContent.style.width = "";
    blocklyDropDownContent.style.height = "";
  }

  function closeDropDown() {
    document.querySelector(".blocklyToolboxDiv").dispatchEvent(new MouseEvent("mousedown"));
  }

  function selectItem(item, click) {
    // You can't just use click() or focus() because Blockly uses mousedown and mouseup handlers, not click handlers.
    item.dispatchEvent(new MouseEvent("mousedown", { relatedTarget: item, bubbles: true }));
    if (click) {
      item.dispatchEvent(new MouseEvent("mouseup", { relatedTarget: item, bubbles: true }));
    }

    // Scroll the item into view if it is offscreen.
    const itemTop = item.offsetTop;
    const itemEnd = itemTop + item.offsetHeight;

    const scrollTop = blocklyDropDownContent.scrollTop;
    const scrollHeight = blocklyDropDownContent.offsetHeight;
    const scrollEnd = scrollTop + scrollHeight;

    if (scrollTop > itemTop) {
      blocklyDropDownContent.scrollTop = itemTop;
    } else if (itemEnd > scrollEnd) {
      blocklyDropDownContent.scrollTop = itemEnd - scrollHeight;
    }
  }

  function handleInputEvent(event) {
    const value = event.target.value.toLowerCase();
    for (const item of getItems()) {
      const text = item.textContent.toLowerCase();
      const contains = text.includes(value);
      item.hidden = !contains;
    }
  }

  function handleKeyDownEvent(event) {
    if (event.key === "Enter") {
      // Reimplement enter to select item to account for hidden items and default to the top item.
      event.stopPropagation();
      event.preventDefault();

      const selectedItem = blocklyDropdownMenu.querySelector(".goog-menuitem-highlight");
      if (selectedItem && !selectedItem.hidden) {
        selectItem(selectedItem, true);
        return;
      }

      for (const item of getItems()) {
        if (!item.hidden) {
          selectItem(item, true);
          break;
        }
      }
      // If there is no top value, just leave the dropdown open.
    } else if (event.key === "Escape") {
      closeDropDown();
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      // Reimplement keyboard navigation to account for hidden items.
      event.preventDefault();
      event.stopPropagation();

      const items = getItems().filter((item) => !item.hidden);
      if (items.length === 0) {
        // No items.
        return;
      }

      let selectedIndex = -1;
      for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains("goog-menuitem-highlight")) {
          selectedIndex = i;
          break;
        }
      }

      const lastIndex = items.length - 1;
      let newIndex = 0;
      if (event.key === "ArrowDown") {
        if (selectedIndex === -1 || selectedIndex === lastIndex) {
          newIndex = 0;
        } else {
          newIndex = selectedIndex + 1;
        }
      } else {
        if (selectedIndex === -1 || selectedIndex === 0) {
          newIndex = lastIndex;
        } else {
          newIndex = selectedIndex - 1;
        }
      }

      selectItem(items[newIndex], false);
    }
  }

  function getItems() {
    if (blocklyDropdownMenu) {
      return Array.from(blocklyDropdownMenu.children).filter((child) => child.tagName !== "INPUT");
    }
    return [];
  }

  function findBlocklyDropDownDiv() {
    return addon.tab.waitForElement(".blocklyDropDownDiv").then(() => document.querySelector(".blocklyDropDownDiv"));
  }

  blocklyDropDownDiv = await findBlocklyDropDownDiv();
  blocklyDropDownContent = blocklyDropDownDiv.querySelector(".blocklyDropDownContent");

  const observer = new MutationObserver((mutationList) => {
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        // Look for a dropdown being created.
        for (const node of mutation.addedNodes) {
          if (node.classList && node.classList.contains("blocklyDropdownMenu")) {
            createSearchBar(node);
            break;
          }
        }
        // Look for a dropdown being removed.
        for (const node of mutation.removedNodes) {
          if (node.classList && node.classList.contains("blocklyDropdownMenu")) {
            cleanup();
            break;
          }
        }
      }
    }
  });
  observer.observe(blocklyDropDownContent, {
    childList: true,
  });
}
