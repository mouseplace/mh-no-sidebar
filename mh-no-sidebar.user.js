// ==UserScript==
// @name         🐭️ MouseHunt - No Sidebar
// @version      1.0.1
// @description  Hides the sidebar.
// @license      MIT
// @author       bradp
// @namespace    bradp
// @match        https://www.mousehuntgame.com/*
// @icon         https://i.mouse.rip/mouse.png
// @grant        none
// @run-at      document-end
// ==/UserScript==

((function () {
  'use strict';

  const style = document.createElement('style');
  style.innerHTML = `.pageSidebarView,
  .pageFrameView-footer {
    display: none;
  }

  .pageFrameView {
    -ms-grid-columns: [first] auto [content-start] 760px [content-end] auto [last];
    grid-template-columns: [first] auto [content-start] 760px [content-end] auto [last];
  }`;
  document.head.appendChild(style);
})());
