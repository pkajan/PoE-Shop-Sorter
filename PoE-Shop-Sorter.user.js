// ==UserScript==
// @name         Path of Exile shop Sorter
// @namespace    pk-ap
// @version      1.0
// @description  try to take over the world!
// @author       pKajan
// @match        https://www.pathofexile.com/shop/category/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pathofexile.com
// @grant        none
// @downloadURL  https://github.com/pkajan/PoE-Shop-Sorter/raw/main/PoE-Shop-Sorter.user.js
// @updateURL    https://github.com/pkajan/PoE-Shop-Sorter/raw/main/PoE-Shop-Sorter.user.js
// ==/UserScript==

(function() {
    'use strict';

    function resort() {
        // Step 1: Select the container element
        var container = document.getElementById('mtx-list');

        // Step 2: Convert NodeList to array for easier manipulation
        var shopItems = Array.from(container.querySelectorAll('.shopItem'));
        // Step 2a: Bundles -> diff class than rest
        if(shopItems.length < 1){
            shopItems = Array.from(container.querySelectorAll('.shopItemPackage'));
        }

        // Step 3: Sort the array based on the price of each shopItem
        shopItems.sort((a, b) => {
            const priceA = parseInt(a.querySelector('.price').textContent.trim().split(' ')[0]);
            const priceB = parseInt(b.querySelector('.price').textContent.trim().split(' ')[0]);
            return priceA - priceB;
        });

        // Step 4: Clear the container element
        container.innerHTML = '';

        // Step 5: Append the sorted shopItem elements back to the container
        shopItems.forEach(shopItem => {
            container.appendChild(shopItem);
        });
        console.log("resorted");
        window.scrollTo({
            top: 0
        });
    }

    // Scroll down the page by a specified amount
    function scrollDownBy(amount) {
        window.scrollBy({
            top: amount,
            behavior: 'smooth'
        });
    }

    // Simulate scrolling down to trigger loading additional items
    function simulateScrollDown() {
        let previousScrollPosition = window.scrollY; // Initialize previous scroll position
        let consecutiveStagnantScrolls = 0; // Initialize counter for consecutive stagnant scrolls

        // Set the interval to scroll down every 500 milliseconds
        const scrollInterval = setInterval(() => {
            // Scroll down by 500 pixels
            scrollDownBy(50000);

            // Check if the scroll position hasn't changed
            if (window.scrollY === previousScrollPosition) {
                consecutiveStagnantScrolls++; // Increment counter

            } else {
                consecutiveStagnantScrolls = 0; // Reset counter if scroll position changes
            }
            console.log(consecutiveStagnantScrolls);
            // If scroll position remains the same for two consecutive intervals, stop the script and scroll back to the top
            if (consecutiveStagnantScrolls >= 2) {
                clearInterval(scrollInterval);
                //scrollToTop(); // Move back to the top of the page
                resort();
            }

            // Update previous scroll position
            previousScrollPosition = window.scrollY;
        }, 500); // Adjust the interval time as needed
    }

    // Call the function to simulate scrolling down
    simulateScrollDown();

})();
