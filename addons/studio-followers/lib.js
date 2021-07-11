export function createModal(addon, title, msg, switchType) {
  const overlay = Object.assign(document.createElement("div"), {
    className: "modal-overlay",
  });

  const div = Object.assign(document.createElement("div"), {
    className: "modal-content user-projects-modal modal-content user-projects-modal",
    tabindex: "-1",
    role: "dialog",
  });

  const closeBtnContainer = document.createElement("div");
  closeBtnContainer.className = "modal-content-close";
  const closeBtn = Object.assign(document.createElement("img"), {
    src: addon.self.dir + "/close.svg",
    alt: "close-icon",
    className: "modal-content-close-img",
    draggable: "false",
  });

  function close() {
    overlay.style.display = "none";
  }

  closeBtnContainer.addEventListener("click", close);
  closeBtnContainer.appendChild(closeBtn);
  div.appendChild(closeBtnContainer);

  const titleEl = document.createElement("div");
  titleEl.className = "modal-title user-projects-modal-title modal-header";
  titleEl.innerText = title;
  div.appendChild(titleEl);

  const switcher = document.createElement("div");
  switcher.className = "sub-nav user-projects-modal-nav sub-nav-align-left";

  function createBtn(txt, active) {
    let btn = document.createElement("button");
    btn.active = `${active}`;
    btn.innerText = txt;
    switcher.appendChild(btn);
    return btn;
  }

  const followers = createBtn(msg("followers"), true);
  followers.addEventListener("click", () => {
    followers.active = `true`;
    following.active = `false`;
    switchType("followers");
  });
  const following = createBtn(msg("following"), () => {
    followers.active = `false`;
    following.active = `true`;
    switchType("following");
  });
  following.addEventListener("click", () => switchType("following"));

  div.appendChild(switcher);

  const main = document.createElement("div");
  main.className = "modal-inner-content user-projects-modal-content";

  const followersGrid = document.createElement("div");
  followersGrid.className = "user-projects-modal-grid sa-followers-modal-grid followers";

  const followingGrid = document.createElement("div");
  followingGrid.className = "user-projects-modal-grid sa-followers-modal-grid following";
  followingGrid.style.display = "none";

  main.appendChild(followersGrid);
  main.appendChild(followingGrid);

  div.appendChild(main);

  overlay.appendChild(div);

  // By default, hide the screen

  close();

  return overlay;
}

export function createUser(follower, addon, msg, members) {
  let { redux } = addon.tab;
  const btn = Object.assign(document.createElement("div"), {
    className: "studio-follower mod-clickable",
    tabindex: "0",
    role: "button",
  });
  const userImage = Object.assign(document.createElement("img"), {
    className: "studio-follower-pfp",
    src: `https://cdn2.scratch.mit.edu/get_image/user/${follower.id}_90x90.png`,
  });

  btn.appendChild(userImage);

  const bottom = Object.assign(document.createElement("div"), {
    className: "studio-follower-bottom",
  });
  const username = Object.assign(document.createElement("div"), {
    className: "studio-follower-username",
    innerText: follower.username,
    title: follower.username,
  });
  bottom.appendChild(username);

  const add = Object.assign(document.createElement("div"), {
    className: "studio-tile-dynamic-add",
  });

  const img = Object.assign(document.createElement("img"), {
    className: "studio-follower-add-remove-image",
    src: addon.self.dir + "/add.svg",
  });

  let onclick = async (e) => {
    btn.classList.remove("mod-clickable");
    btn.classList.add("mod-mutating");
    // Add user as a curator
    let res = await fetch(
      `/site-api/users/curators-in/${redux.state.studio.id}/invite_curator/?usernames=${follower.username}`,
      {
        headers: {
          "x-csrftoken": addon.auth.csrfToken,
          "x-requested-with": "XMLHttpRequest",
        },
        method: "PUT",
        credentials: "include",
      }
    );

    if (res.status !== 200) {
      return alert(msg("fetch-err"));
    }
    btn.classList.remove("mod-mutating");
    add.classList.add("studio-follower-dynamic-remove");
    img.src = addon.self.dir + "/tick.svg";
    btn.removeEventListener("click", onclick);
  };

  if (!members.includes(follower.username)) {
    btn.addEventListener("click", onclick);
  } else {
    btn.classList.remove("mod-mutating");
    add.classList.add("studio-follower-dynamic-remove");
    img.src = addon.self.dir + "/tick.svg";
  }

  add.appendChild(img);
  bottom.appendChild(add);
  btn.appendChild(bottom);

  return btn;
}
