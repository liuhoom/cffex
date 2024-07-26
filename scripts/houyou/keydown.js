// ==UserScript==
// @name         Right Click to Next Page
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Capture right-click to find and click "Next Page" link
// @author       Your Name
// @match        *://*.hafuktxt.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Function to find and click the "Next Page" link
  function clickNextPage() {
    // Search for the link containing the text "下一页"
    const nextPageLink = Array.from(document.querySelectorAll('a')).find((a) =>
      a.textContent.includes('下一章')
    );
    console.log(nextPageLink);

    if (nextPageLink) {
      nextPageLink.click();
    } else {
      console.log('No "Next Page" link found');
    }
  }

  function clickBeforePage() {
    // Search for the link containing the text "下一页"
    const nextPageLink = Array.from(document.querySelectorAll('a')).find((a) =>
      a.textContent.includes('上一章')
    );
    console.log(nextPageLink);

    if (nextPageLink) {
      nextPageLink.click();
    } else {
      console.log('No "Before Page" link found');
    }
  }

  // Add an event listener to capture right-click events
  document.addEventListener(
    'keydown',
    function (event) {
      if (event.key === 'ArrowRight') {
        event.preventDefault(); // Prevent the default right-click menu
        clickNextPage();
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault(); // Prevent the default right-click menu
        clickBeforePage();
      }
    },
    false
  );

  document.addEventListener('contextmenu', function (event) {
    event.preventDefault(); // Prevent the default right-click menu
    clickNextPage();
  });
})();
