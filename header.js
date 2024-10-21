document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.toggle');
    const navLinks = document.querySelector('nav ul');

    toggleButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});