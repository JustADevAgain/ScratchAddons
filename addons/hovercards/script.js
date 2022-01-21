const regexDict = {
	project: [
		/^(?:(?:https?:)?\/\/scratch\.mit\.edu)?\/projects\/(\d+)/,
	],
	studio: [
		/^(?:(?:https?:)?\/\/scratch\.mit\.edu)?\/studios\/(\d+)/,
	],
	user: [
		/^(?:(?:https?:)?\/\/scratch\.mit\.edu)?\/users\/([a-zA-Z0-9-_]+)/,
	],
	forumTopic: [
		/^(?:(?:https?:)?\/\/scratch\.mit\.edu)?\/discuss\/topic\/(\d+)(?!.+#post-\d)/,
	],
	forumPost: [
		/^(?:(?:https?:)?\/\/scratch\.mit\.edu)?\/discuss\/post\/(\d+)/,
		/^(?:(?:https?:)?\/\/scratch\.mit\.edu)?\/discuss\/topic\/\d+(?:.+#post-(\d+))/
	]
}

const selectorExclusionDict = {
	all: [
		"parent! parent! parent! parent! #navigation",    // Navigation bar on the top of the page
		".page",                                          // Links to topic page
		"parent! parent! .linksb",                        // Bottom links on forums
		"[href^='#']",                                    // Links that starts with and hash (don't link to another page)
		".thumbnail-image",                               // Thumbnail image (3.0)
		"parent! .thumbnail-title",                       // Thumbnail text (3.0)
		"parent! parent! .thumbnail-title",               // Thumbnail text (3.0)
		"parent! .thumb"                                  // Thumbnail image (2.0)
	],
	project: [
		"parent! parent! .thumb",                         // Thumbnail text (2.0)
	],
	studio: [
		"parent! .studio-tab-nav",                        // Tabs (such as the tab on the studio page)
		"parent! parent! .thumb"                          // Thumbnail text (2.0)
	],
	user: [
		".slider-carousel-control",                       // Control keys (next and prev) on user pages
		"[data-control='view-all']",                      // "View all" buttons
		"parent! .studio-member-tile",                    // Studio curator image
		".studio-member-name",                            // Studio curator text 
		"parent! parent! .thumb",                         // Thumbnail text (2.0)
		"parent! parent! parent! .postleft"               // Forum user avatar
	],
	forumPost: [
		"parent! .box-head"                               // Link on the post date 
	]
}

// let themeOptions = {
//     _default: {
//         extendedInfo: false
//     },
//     extended: {
//         extendedInfo: true
//     }
// }

const tooltipContentFunctions = {
	_default: {
		async project(msg, id) {
			const data = await fetch(`https://api.scratch.mit.edu/projects/${id}`)
				.then(response => response.json())
				.catch(error => {
					throw msg("error-request-failed", { error });
				})

			if (data.code) {
				if (data.code === "NotFound") throw msg("error-no-project")
				else throw msg("error-request-failed", { error: data.code })
			}    
			
			const imgInfo = document.createElement("img")
			const titleText = document.createElement("div")
			const authorText = document.createElement("div")
			const img = document.createElement("img")
			const imgWrapper = document.createElement("div")
			const infoWrapper = document.createElement("div")
			const wrapper = document.createElement("div")

			imgInfo.className = "sa-hovercards-project-author-img"
			titleText.className = "sa-hovercards-project-title"
			authorText.className = "sa-hovercards-project-author"
			img.className = "sa-hovercards-project-img"
			imgWrapper.className = "sa-hovercards-img-wrapper"
			infoWrapper.className = "sa-hovercards-info-wrapper"
			wrapper.className = "sa-hovercards-wrapper sa-hovercards-project"

			imgInfo.src = data.author.profile.images["32x32"]
			titleText.textContent = data.title
			authorText.textContent = data.author.username
			img.src = data.image

			imgWrapper.appendChild(img)
			infoWrapper.appendChild(imgInfo)
			infoWrapper.appendChild(titleText)
			infoWrapper.appendChild(authorText)
			wrapper.appendChild(imgWrapper)
			wrapper.appendChild(infoWrapper)
			return { wrapper, data }
		},

		async studio(msg, id) {
			const data = await fetch(`https://api.scratch.mit.edu/studios/${id}`)
			.then(response => response.json())
			.catch(error => {
				throw msg("error-request-failed", { error });
			})

			if (data.code) {
				if (data.code === "NotFound") throw msg("error-no-studio")
				else throw msg("error-request-failed", { error: data.code })
			}    
				
			const titleText = document.createElement("div")
			const img = document.createElement("img")
			const imgWrapper = document.createElement("div")
			const infoWrapper = document.createElement("div")
			const wrapper = document.createElement("div")

			titleText.className = "sa-hovercards-studio-title"
			img.className = "sa-hovercards-studio-img"
			imgWrapper.className = "sa-hovercards-img-wrapper"
			infoWrapper.className = "sa-hovercards-info-wrapper"
			wrapper.className = "sa-hovercards-wrapper sa-hovercards-studio"

			titleText.textContent = data.title.trim()
			img.src = data.image

			imgWrapper.appendChild(img)
			infoWrapper.appendChild(titleText)
			wrapper.appendChild(imgWrapper)
			wrapper.appendChild(infoWrapper)
			return { wrapper, data }
		},

		async user(msg, id) {
			const data = await fetch(`https://api.scratch.mit.edu/users/${id}`)
				.then(response => response.json())
				.catch(error => {
					throw msg("error-request-failed", { error });
				})

			if (data.code) {
				if (data.code === "NotFound") throw msg("error-no-user")
				else throw msg("error-request-failed", { error: data.code })
			}

			const usernameText = document.createElement("div")
			const img = document.createElement("img")
			const imgWrapper = document.createElement("div")
			const infoWrapper = document.createElement("div")
			const wrapper = document.createElement("div")

			usernameText.className = "sa-hovercards-user-name"
			img.className = "sa-hovercards-user-img"
			imgWrapper.className = "sa-hovercards-img-wrapper"
			infoWrapper.className = "sa-hovercards-info-wrapper"
			wrapper.className = "sa-hovercards-wrapper sa-hovercards-user"

			usernameText.textContent = data.username.trim()
			img.src = data.profile.images["90x90"].replace("90x90", "150x150")

			imgWrapper.appendChild(img)
			infoWrapper.appendChild(usernameText)
			wrapper.appendChild(imgWrapper)
			wrapper.appendChild(infoWrapper)
			return { wrapper, data }
		},

		async forumTopic(msg, id) {
			const data = await fetch(`https://scratchdb.lefty.one/v3/forum/topic/info/${id}`)
				.then(response => response.json())
				.catch(error => {
					throw msg("error-request-failed", { error });
				})

			if (data.error) {
				if (data.error === "TopicNotFoundError") throw msg("error-no-forum-topic");
				else throw msg("error-scratchdb", { error: data.error });
				// console.log(data)
			}

			if (data.deleted) {
				throw msg("error-deleted-forum-topic-scratchdb")
			}

			const categoryText = document.createElement("div")
			const titleText = document.createElement("div")
			const postCountText = document.createElement("div")
			const infoWrapper = document.createElement("div")
			const wrapper = document.createElement("div")

			categoryText.className = "sa-hovercards-topic-category"
			titleText.className = "sa-hovercards-topic-title"
			postCountText.className = "sa-hovercards-post-count"
			infoWrapper.className = "sa-hovercards-info-wrapper"
			wrapper.className = "sa-hovercards-wrapper sa-hovercards-forum-topic"

			categoryText.textContent = data.category
			titleText.textContent = data.title
			postCountText.textContent = msg("post-count", {count: data.post_count})

			infoWrapper.appendChild(categoryText)
			infoWrapper.appendChild(titleText)
			infoWrapper.appendChild(postCountText)
			wrapper.appendChild(infoWrapper)
			return wrapper
		},

		async forumPost(msg, id) {
			const data = await fetch(`https://scratchdb.lefty.one/v3/forum/post/info/${id}`)
				.then(response => response.json())
				.catch(error => {
					throw msg("error-request-failed", { error });
				})

			if (data.error) {
				if (data.error === "post not found" || data.error === "NoMorePostsError") throw msg("error-no-forum-post");
				else throw msg("error-scratchdb", { error: data.error });
				// console.log(data)
			}        

			if (data.deleted) {
				throw msg("error-deleted-forum-post-scratchdb")
				// console.log(data)
			}

			const categoryText = document.createElement("div")
			const titleText = document.createElement("div")
			const authorText = document.createElement("div")
			const postText = document.createElement("div")
			const postCountText = document.createElement("div")
			const infoWrapper = document.createElement("div")
			const wrapper = document.createElement("div")

			categoryText.className = "sa-hovercards-topic-category"
			titleText.className = "sa-hovercards-topic-title"
			authorText.className = "sa-hovercards-post-author"
			postText.className = "sa-hovercards-post"
			postCountText.className = "sa-hovercards-post-count"
			infoWrapper.className = "sa-hovercards-info-wrapper"
			wrapper.className = "sa-hovercards-wrapper sa-hovercards-forum-post"

			categoryText.textContent = data.topic.category
			titleText.textContent = data.topic.title
			authorText.textContent = data.username + ":"
			postText.textContent = data.content.bb.substr(0, 1024)

			infoWrapper.appendChild(categoryText)
			infoWrapper.appendChild(titleText)
			infoWrapper.appendChild(authorText)
			infoWrapper.appendChild(postText)
			wrapper.appendChild(infoWrapper)
			return { wrapper, data }
		},
	},

	scratch2: {
		async project(msg, id) {
			const { wrapper, data } = await tooltipContentFunctions._default.project(msg, id)

			wrapper.querySelector(".sa-hovercards-project-author").textContent = msg("info-by", {author: data.author.username})

			return wrapper
		}
	},

	extended: {
		async project(msg, id) {
			const { wrapper, data } = await tooltipContentFunctions._default.project(msg, id)

			const infoExtendedWrapper = document.createElement("div")
			infoExtendedWrapper.className = "sa-hovercards-info-extended-wrapper"    
			infoExtendedWrapper.textContent = data.description.replace(/^\n+|\n$/, "") || data.instructions.replace(/^\n+|\n$/, "")

			wrapper.appendChild(infoExtendedWrapper)

			return wrapper
		},

		async studio(msg, id) {
			const { wrapper, data } = await tooltipContentFunctions._default.studio(msg, id)

			const infoExtendedWrapper = document.createElement("div")
			infoExtendedWrapper.className = "sa-hovercards-info-extended-wrapper"    
			infoExtendedWrapper.textContent = data.description.replace(/^\n+|\n$/, "")

			wrapper.appendChild(infoExtendedWrapper)

			return wrapper
		},

		async user(msg, id) {
			const { wrapper, data } = await tooltipContentFunctions._default.user(msg, id)

			const infoExtendedWrapper = document.createElement("div")
			infoExtendedWrapper.className = "sa-hovercards-info-extended-wrapper"    
			infoExtendedWrapper.textContent = data.profile.bio.replace(/^\n+|\n$/, "")

			wrapper.appendChild(infoExtendedWrapper)

			return wrapper
		},

		async forumTopic(msg, id) {
			const wrapper = await tooltipContentFunctions._default.forumTopic(msg, id)

			const postText = document.createElement("div")
			postText.className = "sa-hovercards-post"

			const data = await fetch(`https://scratchdb.lefty.one/v3/forum/topic/posts/${id}?o=oldest`)
				.then(response => response.json())
				.catch(() => false)

			if (!data) return wrapper
			
			postText.textContent = data[0].content.bb.substr(0, 256)
			wrapper.lastChild.insertBefore(postText, wrapper.lastChild.children[2])

			return wrapper
		},

		async forumPost(msg, id) {
			let { wrapper, data } = await tooltipContentFunctions._default.forumPost(msg, id)

			const postCountText = document.createElement("div")
			postCountText.className = "sa-hovercards-post-count"

			data = await fetch(`https://scratchdb.lefty.one/v3/forum/topic/info/${data.topic.id}`)
				.then(response => response.json())
				.catch(() => false)

			if (!data) return wrapper
			
			postCountText.textContent = msg("post-count", {count: data.post_count})

			wrapper.lastChild.appendChild(postCountText)

			return wrapper
		}
	},

	extendedStatistics: {
		async project(msg, id) {
			const { wrapper, data } = await tooltipContentFunctions._default.project(msg, id)

			const viewsText = document.createElement("div")
			const lovesText = document.createElement("div")
			const favoritesText = document.createElement("div")
			const remixesText = document.createElement("div")
			const infoExtendedWrapper = document.createElement("div")

			viewsText.className = "sa-hovercards-views"
			lovesText.className = "sa-hovercards-loves"
			favoritesText.className = "sa-hovercards-favorites"
			remixesText.className = "sa-hovercards-remixes"
			infoExtendedWrapper.className = "sa-hovercards-info-extended-wrapper"

			viewsText.textContent = msg("info-views", { count: data.stats.views })
			lovesText.textContent = msg("info-loves", { count: data.stats.loves })
			favoritesText.textContent = msg("info-favorites", { count: data.stats.favorites })
			remixesText.textContent = msg("info-remixes", { count: data.stats.remixes })

			infoExtendedWrapper.appendChild(viewsText)
			infoExtendedWrapper.appendChild(lovesText)
			infoExtendedWrapper.appendChild(favoritesText)
			infoExtendedWrapper.appendChild(remixesText)
			wrapper.appendChild(infoExtendedWrapper)

			return wrapper
		},

		async studio(msg, id) {
			const { wrapper, data } = await tooltipContentFunctions._default.studio(msg, id)

			const projectsText = document.createElement("div")
			const commentsText = document.createElement("div")
			const followersText = document.createElement("div")
			const managersText = document.createElement("div")
			const infoExtendedWrapper = document.createElement("div")

			projectsText.className = "sa-hovercards-projects"
			commentsText.className = "sa-hovercards-comments"
			followersText.className = "sa-hovercards-followers"
			managersText.className = "sa-hovercards-managers"
			infoExtendedWrapper.className = "sa-hovercards-info-extended-wrapper"

			projectsText.textContent = data.stats.projects === 100 ? msg("info-projects-100") : msg("info-projects", { count: data.stats.projects })
			commentsText.textContent = data.stats.comments === 100 ? msg("info-comments-100") : msg("info-comments", { count: data.stats.comments })
			followersText.textContent = msg("info-followers", { count: data.stats.followers })
			managersText.textContent = msg("info-managers", { count: data.stats.managers })

			infoExtendedWrapper.appendChild(projectsText)
			infoExtendedWrapper.appendChild(commentsText)
			infoExtendedWrapper.appendChild(followersText)
			infoExtendedWrapper.appendChild(managersText)
			wrapper.appendChild(infoExtendedWrapper)

			return wrapper
		},

		async user(msg, id) {
			const { wrapper } = await tooltipContentFunctions._default.user(msg, id)

			const data = await fetch(`https://scratchdb.lefty.one/v3/user/info/${id}`)
				.then(response => response.json())
				.catch(() => false)

			console.log(data)

			const infoExtendedWrapper = document.createElement("div")
			wrapper.appendChild(infoExtendedWrapper)

			if (!data || (data.error && data.error === "UserNotFoundError")) {
				const warnElement = document.createElement("div")
				warnElement.className = "sa-hovercards-warning"
				warnElement.textContent = msg("error-no-user-scratchdb")
				infoExtendedWrapper.appendChild(warnElement)
				return wrapper
			}
			
			const originText = document.createElement("div")

			originText.className = "sa-hovercards-origin"
			infoExtendedWrapper.className = "sa-hovercards-info-extended-wrapper"

			originText.textContent = msg("info-origin", { status: data.status, country: data.country })

			infoExtendedWrapper.appendChild(originText)

			if (!data.statistics) {
				const warnElement = document.createElement("div")
				warnElement.className = "sa-hovercards-warn"
				warnElement.textContent = msg("error-no-user-statistics-scratchdb")
				infoExtendedWrapper.appendChild(warnElement)
				return wrapper
			}
			
			const viewsText = document.createElement("div")
			const lovesText = document.createElement("div")
			const favoritesText = document.createElement("div")
			const followersText = document.createElement("div")
			const followingText = document.createElement("div")    

			viewsText.className = "sa-hovercards-views"
			lovesText.className = "sa-hovercards-loves"
			favoritesText.className = "sa-hovercards-favorites"
			followersText.className = "sa-hovercards-followers"
			followingText.className = "sa-hovercards-following"
			
			viewsText.textContent = msg("info-views", { count: data.statistics.views })
			lovesText.textContent = msg("info-loves", { count: data.statistics.loves })
			favoritesText.textContent = msg("info-favorites", { count: data.statistics.favorites })
			followersText.textContent = msg("info-followers", { count: data.statistics.followers })
			followingText.textContent = msg("info-following", { count: data.statistics.following })

			infoExtendedWrapper.appendChild(viewsText)
			infoExtendedWrapper.appendChild(lovesText)
			infoExtendedWrapper.appendChild(favoritesText)
			infoExtendedWrapper.appendChild(followersText)
			infoExtendedWrapper.appendChild(followingText)    

			return wrapper
		},

		async forumTopic(msg, id) {
			return await tooltipContentFunctions.extended.forumTopic(msg, id)
		},

		async forumPost(msg, id) {
			return await tooltipContentFunctions.extended.forumPost(msg, id)
		},

		async _template(msg, id) {
			const { wrapper } = await tooltipContentFunctions._default.project(msg, id)

			return wrapper
		},

	}
}

const tippyGlobalOptions = {
	allowHTML: true,
	popperOptions: {
		strategy: 'fixed',
		modifiers: [
			{
				name: 'flip',
				options: {
					fallbackPlacements: ['bottom'],
				},
			},
			{
				name: 'preventOverflow',
				options: {
					altAxis: true,
					tether: false,
				},
			},
		],
	},
	onCreate(instance) {
		instance._isFetching = false;
		instance._src = null;
		instance._error = null;
	},
	//,
	// onHidden(instance) {
	//     instance.destroy()
	//     currentTarget = ""
	// }
}

const tippyGlobalOptionsChanging = {
	theme: 'sa-hovercards'
}

let tippyInstances = []

export default async function ({ addon, msg }) {

	let lastTheme = addon.settings.get("theme")

	tippyGlobalOptions.content = msg("loading")

	const changeColorScheme = async () => {
		if (addon.settings.get("color-scheme") !== "auto") {
			tippyGlobalOptionsChanging.theme = `sa-hovercards-${addon.settings.get("color-scheme")}`
		} else {
			if ((await addon.self.getEnabledAddons()).includes("dark-www")) tippyGlobalOptionsChanging.theme = "sa-hovercards-dark"
			else tippyGlobalOptionsChanging.theme = "sa-hovercards-light"
		}
	}

	const destroyAllInstances = () => {
		document.querySelectorAll('a.sa-hovercards-read').forEach(e => {
			e.classList.remove('sa-hovercards-read')
		})
		tippyInstances.forEach(instance => instance.destroy())
		tippyInstances.length = 0
	}

	const changeTheme = () => {
		const currentTheme = addon.settings.get("theme")
		if (currentTheme !== lastTheme) {
			destroyAllInstances()
			lastTheme = currentTheme
		}
	}

	/*global tippy*/
	await addon.tab.loadScript(addon.self.lib + "/thirdparty/cs/popper.js")
	await addon.tab.loadScript(addon.self.lib + "/thirdparty/cs/tippy.js")

	tippy.setDefaultProps(tippyGlobalOptions)

	addon.settings.addEventListener("change", async () => {
		changeTheme()
		await changeColorScheme()
	})

	changeColorScheme()

	const triggerTooltipUnified = (type, element, regexResult) => {

		const id = regexResult[1]

		const tippyOptions = {
			async onShow(instance) {
				instance.setProps(tippyGlobalOptionsChanging)
				if (instance._isFetching || instance._error) return
				instance._isFetching = true

				let themeKey
				if (tooltipContentFunctions[lastTheme] && tooltipContentFunctions[lastTheme][type]) themeKey = lastTheme
				else themeKey = "_default"

				await tooltipContentFunctions[themeKey][type](msg, id)
					.then(content => {
						if (content.wrapper) instance.setContent(content.wrapper)
						else instance.setContent(content)        
					})
					.catch(error => {
						instance._error = error
						instance.setContent(error)
					})

			}
		}

		const instance = tippy(element, tippyOptions)
		instance.show()
		tippyInstances = tippyInstances.concat(instance);

	}

	let currentTarget

	const mouseMoveFunction = () => {

		// const target = document.querySelector("a:hover")
		const target = document.querySelector("a:hover:not(.sa-hovercards-read)")
		if (!target || currentTarget === target) return
		target.classList.add("sa-hovercards-read")

		currentTarget = target

		// console.log(target)

		let type = ""
		let regexResult = []
		for (const regexType of Object.keys(regexDict)) {
			if (type) break
			for (const regex of regexDict[regexType]) {
				if (type) break
				if (regex.test(target.href)) {
					regexResult = regex.exec(target.href)
					type = regexType
				}
			}
		}

		if (!type) return

		// console.log(type)

		if (!addon.settings.get("forceAll")) {

			const selectorExclusions = [...selectorExclusionDict.all]
			if (selectorExclusionDict[type]) selectorExclusions.push(...selectorExclusionDict[type])
	
			for (let selector of selectorExclusions) {
				let elementToCheck = target
				while (selector.startsWith("parent! ")) {
					elementToCheck = elementToCheck.parentElement
					selector = selector.slice(8)
				}
				if (elementToCheck.matches(selector)) return
			}    

		}

		// let themeOption = {
		//     ...themeOptions._default
		// }

		// if (themeOptions[theme]) themeOption = {
		//     ...themeOption,
		//     ...themeOptions[theme]
		// }


		
		triggerTooltipUnified(type, target, regexResult)
	}

	document.addEventListener("mousemove", mouseMoveFunction)

	addon.self.addEventListener("disabled", () => {
		destroyAllInstances()
		document.removeEventListener("mousemove", mouseMoveFunction)
	})

	addon.self.addEventListener("reenabled", () => {
		document.addEventListener("mousemove", mouseMoveFunction)
	})

}