// ==UserScript==
// @name         🐭️ MouseHunt - No Sidebar
// @version      1.0.0
// @description  Hides the sidebar.
// @license      MIT
// @author       bradp
// @namespace    bradp
// @match        https://www.mousehuntgame.com/*
// @icon         https://brrad.com/mouse.png
// @grant        none
// @run-at      document-end
// ==/UserScript==

(() => {
	const style = document.createElement('style');
	style.innerHTML = `.pageFrameView {
		grid-template-columns: [first] auto [content-start] 760px [content-end] auto [last];
	}
	.pageSidebarView, .pageFrameView-footer {
		display: none;
	}`;
	document.head.appendChild(style);
})();
