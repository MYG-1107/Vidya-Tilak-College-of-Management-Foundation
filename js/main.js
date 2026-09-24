document.addEventListener("DOMContentLoaded", function () {
    // Inject Header
    const headerPlaceholder = document.getElementById("header-placeholder");
    if (headerPlaceholder) {
        fetch("includes/header.html")
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                initMobileMenu();
            })
            .catch(err => console.error("Error loading header:", err));
    }

    // Inject Footer
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) {
        fetch("includes/footer.html")
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(err => console.error("Error loading footer:", err));
    }
});

function initMobileMenu() {
    const btn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");
    if (btn && menu) {
        btn.addEventListener("click", function () {
            menu.classList.toggle("hidden");
        });
    }
}
