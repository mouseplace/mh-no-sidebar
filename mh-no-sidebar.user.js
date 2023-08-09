// ==UserScript==
// @name         🐭️ MouseHunt - No Sidebar
// @version      1.0.5
// @description  Hides the sidebar and moves it into a tab in the top menu.
// @license      MIT
// @author       bradp
// @namespace    bradp
// @match        https://www.mousehuntgame.com/*
// @icon         https://i.mouse.rip/mouse.png
// @grant        none
// @run-at       document-end
// @require      https://cdn.jsdelivr.net/npm/mousehunt-utils@1.7.3/mousehunt-utils.js
// ==/UserScript==

((function () {
  'use strict';

  const moveSidebar = () => {
    // Create menu tab.
    const menuTab = document.createElement('div');
    menuTab.classList.add('menuItem');
    menuTab.classList.add('dropdown');
    menuTab.classList.add('sidebar');

    // Register click event listener.
    menuTab.addEventListener('click', () => {
      menuTab.classList.toggle('expanded');
    });

    // Make title span.
    const menuTabTitle = document.createElement('span');
    menuTabTitle.innerText = 'Sidebar';

    // Make arrow div.
    const menuTabArrow = document.createElement('div');
    menuTabArrow.classList.add('arrow');

    // Create menu tab dropdown.
    const dropdownContent = document.createElement('div');
    dropdownContent.classList.add('dropdownContent');

    // Grab sidebar content.
    const sidebarUser = document.querySelector('.pageSidebarView-user');
    if (sidebarUser) {
      dropdownContent.appendChild(sidebarUser);
    }

    const scoreBoardRankings = document.querySelectorAll('.scoreboardRelativeRankingTableView-table');
    if (scoreBoardRankings) {
      const scoreBoardRankingWrapper = document.createElement('div');
      scoreBoardRankingWrapper.classList.add('scoreboardRankingsWrapper');

      // for each scoreBoardRanking in scoreBoardRankings, append
      scoreBoardRankings.forEach((scoreBoardRanking) => {
        scoreBoardRankingWrapper.appendChild(scoreBoardRanking);
      });

      dropdownContent.appendChild(scoreBoardRankingWrapper);
    }

    // Append menu tab title and arrow to menu tab.
    menuTab.appendChild(menuTabTitle);
    menuTab.appendChild(menuTabArrow);

    // Append menu tab dropdown to menu tab.
    menuTab.appendChild(dropdownContent);

    const tabsContainer = document.querySelector('.mousehuntHeaderView-dropdownContainer');
    if (! tabsContainer) {
      return;
    }

    // Append as the second to last tab.
    tabsContainer.insertBefore(menuTab, tabsContainer.lastChild);
  };

  const addBodyClass = () => {
    const body = document.querySelector('body');
    if (! body) {
      return;
    }

    body.classList.add('no-sidebar');
  };

  addStyles(`/* Reflow grid for no sidebar */
  body.no-sidebar .pageFrameView {
    -ms-grid-columns: [first] auto [content-start] 760px [content-end] auto [last];
    grid-template-columns: [first] auto [content-start] 760px [content-end] auto [last];
  }

  /* Sidebar moved into tab */
  body.no-sidebar .pageFrameView .pageSidebarView-user {
    padding: 0 0 10px;
    border-bottom: none;
  }

  body.no-sidebar .pageSidebarView {
    display: none;
  }

  body.no-sidebar .mousehuntHeaderView .menuItem.sidebar.dropdown {
    cursor: unset;
  }

  body.no-sidebar .mousehuntHeaderView .menuItem.sidebar .dropdownContent {
    width: 365px;

    /* 10px padding + 180px scoreboard + 5px gap + 180px scoreboard + 10px padding */
    padding: 10px;
  }

  body.no-sidebar .mousehuntHeaderView .menuItem.sidebar .dropdownContent a {
    display: unset;
    height: auto;
    padding: 0;
    font-variant: none;
    border-bottom: none;
  }

  body.no-sidebar .mousehuntHeaderView .menuItem.sidebar .dropdownContent a:hover,
  body.no-sidebar .mousehuntHeaderView .menuItem.sidebar .dropdownContent a:focus {
    text-decoration: underline;
    background-color: unset;
  }

  /* Image */
  body.no-sidebar .mousehuntHeaderView .menuItem.sidebar .dropdownContent a.pageSidebarView-user-image {
    width: 30px;
    height: 30px;
    padding: 0;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
    border: 1px solid #808080;
  }

  /* Name */
  body.no-sidebar .mousehuntHeaderView .menuItem.sidebar .dropdownContent .pageSidebarView-user a:nth-child(2) {
    display: inline;
    padding: 0;
    font-size: inherit;
    font-variant: none;
    color: #3b5998;
    border-bottom: none;
  }

  /* <br> between name and logout */
  body.no-sidebar .mousehuntHeaderView .menuItem.sidebar .dropdownContent .pageSidebarView-user br {
    display: none;
  }

  /* Logout */
  body.no-sidebar .mousehuntHeaderView .menuItem.sidebar .dropdownContent a.pageSidebarView-user-logout {
    display: inline-block;
    float: right;
    height: auto;
    padding: 5px 0;
    margin-right: 10px;
    font-size: inherit;
    font-variant: none;
    color: #3b5998;
    border-bottom: none;
    border-radius: 0;
  }

  body.no-sidebar .scoreboardRankingsWrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 5px;
    line-height: 14px;
  }

  body.no-sidebar .scoreboardRelativeRankingTableView-table {
    padding-top: 5px;
    background: #fff;
  }

  body.no-sidebar .mousehuntHeaderView .menuItem.sidebar .dropdownContent .scoreboardRankingsWrapper a {
    font-size: 9px;
    color: #3b5998;
    text-decoration: none;
    vertical-align: middle;
    border-radius: 0;
  }

  body.no-sidebar .mousehuntHeaderView .menuItem.sidebar .dropdownContent .scoreboardRankingsWrapper a:hover,
  body.no-sidebar .mousehuntHeaderView .menuItem.sidebar .dropdownContent .scoreboardRankingsWrapper a:focus {
    text-decoration: underline;
  }`);

  addBodyClass();
  onPageChange({ camp: { show: addBodyClass } });
  onTravel(null, { callback: () => {
    setTimeout(addBodyClass, 500);
  } });
  moveSidebar();
})());
