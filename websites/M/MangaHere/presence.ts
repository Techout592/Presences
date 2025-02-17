const presence = new Presence({
		clientId: "831262912815300638"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "mangahere",
			startTimestamp: browsingTimestamp
		},
		{ pathname } = document.location,
		ganres = [
			"martial-arts",
			"action",
			"school-life",
			"sci-fi",
			"yoi",
			"shotacon",
			"mystery",
			"shoujo",
			"ecchi",
			"doujinshi",
			"lolicon",
			"adventure",
			"romance",
			"gender-bender",
			"harem",
			"sports",
			"webtoons",
			"comedy",
			"shounen-ai",
			"josei",
			"shoujo-ai",
			"adult",
			"fantasy",
			"supernatural",
			"psychological",
			"yuri",
			"one-shot",
			"historical",
			"drama",
			"seinen",
			"mature",
			"smut",
			"horror",
			"shounen",
			"slice-of-life",
			"tragedy",
			"mecha"
		];

	if (pathname === "/") presenceData.details = "Viewing the Homepage";
	else if (pathname === "/latest/")
		presenceData.details = "Browsing latest manga";
	else if (pathname === "/ranking/")
		presenceData.details = "Browsing by ranking";
	else if (pathname === "/spoilers/")
		presenceData.details = "Browsing spoilers and news";
	else if (pathname === "/directory/")
		presenceData.details = "Browsing all manga";
	else if (pathname === "/on_going/")
		presenceData.details = "Browsing ongoing manga";
	//ganre/new/
	else if (pathname.endsWith("/new/")) {
		const url = pathname,
			splitUrl = url.split("/");
		presenceData.details =
			splitUrl[1] === "new"
				? "Browsing new manga"
				: `Browsing new ${splitUrl[1]} manga`;
	} else if (pathname.endsWith("/completed/")) {
		//ganre/completed/
		const url = pathname,
			splitUrl = url.split("/");
		presenceData.details =
			splitUrl[1] === "completed"
				? "Browsing completed manga"
				: `Browsing completed ${splitUrl[1]} manga`;
	} else if (pathname.endsWith("/on_going/")) {
		//ganre/on_going/
		const url = pathname,
			splitUrl = url.split("/");
		presenceData.details =
			splitUrl[1] === "on_going"
				? "Browsing ongoing manga"
				: `Browsing ongoing ${splitUrl[1]} manga`;
	} else if (pathname.startsWith("/manga") && pathname.endsWith("/")) {
		//Manga Viewing
		presenceData.details = "Viewing manga:";
		presenceData.state = document.querySelector(
			".detail-info-right-title-font"
		).textContent;
		presenceData.buttons = [{ label: "View Manga", url: window.location.href }];
		presenceData.smallImageKey = "viewing";
	} else if (pathname.startsWith("/manga") && pathname.endsWith(".html")) {
		//Manga Reading
		const chapter = document.querySelector(
				".reader-header-title-2"
			).textContent,
			//setting up page progress
			current = document.querySelector(".pager-list-left span");
		if (!current) presenceData.state = chapter;
		else {
			presenceData.state = `${chapter} page ${`${
				document.querySelector(".pager-list-left > span > .active").textContent
			}/${current.children[current.children.length - 2].textContent}`}`;
		}
		presenceData.details = document.querySelector(
			".reader-header-title-1"
		).textContent;
		presenceData.smallImageKey = "reading";
	} else if (pathname.startsWith("/search")) {
		//Searching
		const urlParams = new URLSearchParams(window.location.search);
		presenceData.details = "Searching:";
		presenceData.state =
			urlParams.get("title") === ""
				? urlParams.get("name")
				: urlParams.get("title");
		presenceData.smallImageKey = "searching";
	}
	ganres.forEach(function (ganre) {
		if (pathname.substring(1, pathname.length - 1) === ganre) {
			presenceData.details = "Browsing:";
			presenceData.state = `${ganre.replace("-", " ")} manga`;
		}
	});
	presence.setActivity(presenceData);
});
