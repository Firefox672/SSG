function toggleFlip(cardElement) {
    // Check if the card is already flipped
    if (cardElement.classList.contains("flipped")) {
        // If flipped, remove the class to unflip it
        cardElement.classList.remove("flipped");
    } else {
        // If not flipped, add the class to flip it
        cardElement.classList.add("flipped");
    }
}

    // Hamburger Menu Functionality
    const menuToggle = document.getElementById('menu-toggle');
    const overlayMenu = document.getElementById('overlay-menu');

    menuToggle.addEventListener('click', () => {
        const isOpen = overlayMenu.style.display === 'flex';
        overlayMenu.style.display = isOpen ? 'none' : 'flex';
        menuToggle.classList.toggle('active');
    });