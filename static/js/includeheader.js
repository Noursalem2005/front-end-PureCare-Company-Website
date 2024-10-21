document.addEventListener('DOMContentLoaded', function() {
    // Function to load the header HTML
    function loadHeader() {
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                document.querySelector('header').innerHTML = data;

                // Add event listener for the toggle button
                const toggleButton = document.querySelector('.toggle');
                const navLinks = document.querySelector('nav ul');

                toggleButton.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                });
            });
    }

    // Function to load the header CSS
    function loadHeaderCSS() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'static/css/header.css';
        document.head.appendChild(link);
    }

    // Load the header HTML and CSS
    loadHeader();
    loadHeaderCSS();
});