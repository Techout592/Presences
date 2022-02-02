const presence = new Presence({
	clientId: "796509741957251112"
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "vector"
	};

	// Landing Site - something.host
	if (window.location.hostname === "techhost.live") {
		presenceData.details = "Landing Site";

		if (
			document.querySelector("head > title").textContent ===
			"Home | TechHost"
		)
			presenceData.state = "Home";
		else {
			presenceData.state = document
				.querySelector("head > title")
				.textContent.replace("TechHost", "")
				.replace("|", "");
		}
	}

	// CDN - cdn.techhost.live
	if (window.location.hostname === "cdn.techhost.live")
		presenceData.details = "Viewing TechHost's CDN";

	// Files - files.something.host
	if (window.location.hostname === "cloud.techhost.live")
		presenceData.details = "Viewing TechCloud";

	// TechPanel - panel.techhost.live
	if (window.location.hostname === "panel.techhost.live") {
		presenceData.details = "Viewing TechPanel";

		if (window.location.pathname.startsWith("/account"))
			presenceData.state = "Viewing their account";
		else {
			presenceData.state = document
				.querySelector("head > title")
				.textContent.replace("TechPanel - ", "");
		}
	}
	presence.setActivity(presenceData);
});
