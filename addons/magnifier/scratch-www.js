export default async function ({ addon, global, console, msg }) {
  if (addon.auth.isLoggedIn) {
    const r = await fetch("https://api.magnifier.potatophant.net/api/Reactions");
    const reactions = await r.json();

    while (true) {
      const comment = await addon.tab.waitForElement("div.comment", {
        markAsSeen: true,
        reduxCondition: (state) => {
          if (!state.scratchGui) return true;
          return state.scratchGui.mode.isPlayerOnly;
        },
      });
      
      if (comment.querySelector("form")) continue; // Comment input

      let commentId = comment.id.replace(/\D/g,'');

      let bottomRow = comment.querySelector(".comment-bottom-row");

      bottomRow.style.lineHeight = "2rem";

      var reactionMenuVisible = false;

      let showReactionMenuButton = document.createElement("span");

      showReactionMenuButton.classList.add("magnifier-show-reaction-menu-button");

      showReactionMenuButton.innerText = "😀";

      showReactionMenuButton.addEventListener("click", (e) => {
        e.preventDefault();
        setReactionMenuVisibility(!reactionMenuVisible);
      });

      bottomRow.appendChild(showReactionMenuButton);

      let reactionMenu = document.createElement("div");

      reactionMenu.id = "magnifier-reaction-menu";

      reactionMenu.classList.add("magnifier-reaction-menu");

      reactionMenu.classList.add("hidden");

      bottomRow.appendChild(reactionMenu);

      window.addEventListener("click", (e) => {
        if (e.target !== showReactionMenuButton) {
          setReactionMenuVisibility(false);
        }
      });

      function setReactionMenuVisibility(visible) {
        if (visible) {
          showReactionMenuButton.parentElement.querySelector("#magnifier-reaction-menu").classList.remove("hidden");
          showReactionMenuButton.parentElement.querySelector("#magnifier-reaction-menu").classList.add("visible");
        }
        else {
          showReactionMenuButton.parentElement.querySelector("#magnifier-reaction-menu").classList.remove("visible");
          showReactionMenuButton.parentElement.querySelector("#magnifier-reaction-menu").classList.add("hidden");
        }

        reactionMenuVisible = visible;
      }

      let reactionList = document.createElement("div");

      reactionList.id = "magnifier-reaction-list";

      reactionList.classList.add("magnifier-reaction-list");

      bottomRow.appendChild(reactionList);

      // make list of reactions
      async function makeReactionList() {
        let commentReactions = await fetchReactions(commentId);

        reactionList.innerHTML = "";
        reactionMenu.innerHTML = "";

        reactions.forEach(j => {
          let reactionListButton = document.createElement("span");
          let reactionMenuButton = document.createElement("span");

          reactionListButton.classList.add("magnifier-reaction-button");
          reactionMenuButton.classList.add("magnifier-reaction-button");

          if (commentReactions.filter(reaction => reaction.reaction === j.name && reaction.user === addon.auth.username).length > 0) {
            reactionListButton.classList.add("selected");
            reactionMenuButton.classList.add("selected");
          }

          let reactionCount = commentReactions.filter(reaction => reaction.reaction === j.name).length;
    
          reactionListButton.innerText = `${j.emoji} ${reactionCount}`;
          reactionMenuButton.innerText = j.emoji;
    
          function react(e) {
            e.preventDefault();
            let magnifier = window.open(
              `https://localhost:4001/react/${commentId}`,
              "Magnifier",
              "width=300,height=300"
            );
            let timer = setInterval(checkClosed, 500);
    
            function checkClosed() {
              if (magnifier.closed) {
                clearInterval(timer);
                makeReactionList();
              }
            }
          }

          reactionListButton.addEventListener("click", (e) => {
            react(e);
          });
          reactionMenuButton.addEventListener("click", (e) => {
            react(e);
          });
    
          if (reactionCount > 0) {
            reactionList.appendChild(reactionListButton);
          }
          reactionMenu.appendChild(reactionMenuButton);
        });
      }

      makeReactionList();
    }

    async function fetchReactions(commentId) {
      const response = await fetch(`https://api.magnifier.potatophant.net/api/Comments/${commentId}/reactions`);
      return response.json();
    }
  }
}
