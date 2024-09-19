const homeButton = document.getElementById('homeButton');
    const navbar = document.querySelector('.navbar');

    let isNavbarVisible = false;
    let isHomeButtonVisible = false;
    let mouseOverNavbarOrButton = false;

    function showElement(element) {
        element.style.opacity = '1';
        element.style.pointerEvents = 'auto';
    }

    function hideElement(element) {
        element.style.opacity = '0';
        element.style.pointerEvents = 'none';
    }

    // Function to determine if the mo use is near the top of the screen (for the navbar)
    function isMouseNearTop(e) {
        return e.clientY < 100;  // Adjust this value to change the sensitivity for showing the navbar
    }

    // Function to determine if the mouse is near the bottom-right corner (for the home button)
    function isMouseNearBottomRight(e) {
        const distanceToBottomRight = Math.hypot(window.innerWidth - e.clientX, window.innerHeight - e.clientY);
        return distanceToBottomRight < 100;  // Adjust this value to change the sensitivity for showing the home button
    }

    // Show or hide elements based on scroll position
    function handleScroll() {
        if (window.scrollY < 50) {
            showElement(navbar);
            isNavbarVisible = true;
        } else if (!mouseOverNavbarOrButton) {
            hideElement(navbar);
            isNavbarVisible = false;
        }

        if (window.scrollY > 100 && !mouseOverNavbarOrButton) {
            hideElement(homeButton);
            isHomeButtonVisible = false;
        }
    }

    // Show elements when the mouse is near them
    document.addEventListener('mousemove', (e) => {
        if (isMouseNearTop(e)) {
            showElement(navbar);
            isNavbarVisible = true;
            mouseOverNavbarOrButton = true;
        } else if (!mouseOverNavbarOrButton && window.scrollY >= 50) {
            hideElement(navbar);
            isNavbarVisible = false;
        }

        if (isMouseNearBottomRight(e)) {
            showElement(homeButton);
            isHomeButtonVisible = true;
            mouseOverNavbarOrButton = true;
        } else if (!mouseOverNavbarOrButton && window.scrollY > 100) {
            hideElement(homeButton);
            isHomeButtonVisible = false;
        }

        // Reset the flag if the mouse is not near either element
        if (!isMouseNearTop(e) && !isMouseNearBottomRight(e)) {
            mouseOverNavbarOrButton = false;
        }
    });

    // Initial state - hide elements if not at the top or bottom-right corner
    if (window.scrollY >= 50) {
        hideElement(navbar);
        isNavbarVisible = false;
    }
    if (window.scrollY > 100) {
        hideElement(homeButton);
        isHomeButtonVisible = false;
    }

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll);

    
    