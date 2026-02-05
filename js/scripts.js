// --- Tab Navigation Function ---
// --- Tab Navigation Function ---
function openTab(evt, tabName) {
    console.log("Opening tab:", tabName); // Debug logging
    try {
        // Get all elements with class="tab-content" and hide them
        var tabcontent = document.getElementsByClassName("tab-content");
        for (var i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
            tabcontent[i].classList.remove("active");
        }

        // Get all elements with class="tab-link" and remove the class "active"
        var tablinks = document.getElementsByClassName("tab-link");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("active");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        var targetTab = document.getElementById(tabName);
        if (targetTab) {
            targetTab.style.display = "block";
            targetTab.classList.add("active");
        } else {
            console.error("Target tab not found:", tabName);
        }

        if (evt && evt.currentTarget) {
            evt.currentTarget.classList.add("active");

            // Check if the clicked button is inside a dropdown content
            // If so, also add 'active' to the parent dropdown button
            var parentDropdown = evt.currentTarget.closest('.dropdown');
            if (parentDropdown) {
                var dropBtn = parentDropdown.querySelector('.dropbtn');
                if (dropBtn) {
                    dropBtn.classList.add("active");
                }
            }
        }

        // --- CUSTOM: Show/Hide Banner ---
        // Hide the banner if the tab is NOT 'home', show it if it IS 'home'
        var banner = document.getElementById('banner-container');
        if (banner) {
            if (tabName === 'home') {
                banner.style.display = 'block';
            } else {
                banner.style.display = 'none';
            }
        }
    } catch (e) {
        console.error("Error in openTab:", e);
    }
}

// --- Run functions on page load ---
document.addEventListener('DOMContentLoaded', function () {
    // Set the "Home" tab to be active by default
    // Check if there is a hash in the URL to open specific tab
    var hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        openTab(null, hash);
        // Find the button and make it active
        var buttons = document.getElementsByClassName('tab-link');
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].getAttribute('onclick').includes("'" + hash + "'")) {
                buttons[i].classList.add('active');

                // Also highlight parent if it's a sub-item
                var parentDropdown = buttons[i].closest('.dropdown');
                if (parentDropdown) {
                    var dropBtn = parentDropdown.querySelector('.dropbtn');
                    if (dropBtn) {
                        dropBtn.classList.add("active");
                    }
                }
            }
        }
    } else {
        // Default to home
        var homeTab = document.getElementById('home');
        if (homeTab) {
            homeTab.style.display = 'block';
            var banner = document.getElementById('banner-container');
            if (banner) banner.style.display = 'block';
        }
    }
});

// --- NeoMycologist Subtab Navigation ---
function openNeoTab(evt, tabName) {
    // Get all elements with class="nm-subtab-content" and hide them
    var subtabs = document.getElementsByClassName("nm-subtab-content");
    for (var i = 0; i < subtabs.length; i++) {
        subtabs[i].style.display = "none";
    }

    // Get all elements with class="nm-nav-btn" and remove the class "active"
    var subtabLinks = document.getElementsByClassName("nm-nav-btn");
    for (var i = 0; i < subtabLinks.length; i++) {
        subtabLinks[i].classList.remove("active");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    var target = document.getElementById(tabName);
    if (target) {
        target.style.display = "block";
    }
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    }
}
