// Select elements
const photoContainer = document.getElementById('photoContainer');
const contentBoxes = document.querySelectorAll('.content-box');
const photoImage = photoContainer.querySelector('img');

let isScrollingDown = false;
let currentImageIndex = -1; // Track current image to apply transition only once
const defaultImage = '../assets/images/1318497.jpeg'; // Default image when scrolled to top

// Images to display for each content box
const boxImages = [
    '../assets/images/event.webp', // Image for Box 1
    '../assets/images/1357585.png',  // Image for Box 2
    '../assets/images/1357587.png'   // Image for Box 3
];

// Apply transition effect to image
photoImage.style.transition = 'opacity 1s ease-in-out';

// Track scrolling direction
let lastScrollPosition = 0;
window.addEventListener('scroll', () => {
    isScrollingDown = window.scrollY > lastScrollPosition;
    lastScrollPosition = window.scrollY;
});

// Function to check which box is in view
function handleScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Shrink photo container
    if (scrollY > 50) {
        photoContainer.classList.add('shrink');
    } else {
        photoContainer.classList.remove('shrink');
    }

    let imageUpdated = false;

    contentBoxes.forEach((box, index) => {
        const boxTop = box.getBoundingClientRect().top;

        if (boxTop < windowHeight / 2 && boxTop > 0) {
            // Make only this box visible
            contentBoxes.forEach((b, i) => {
                if (i !== index) {
                    b.classList.remove('active');
                }
            });
            box.classList.add('active');

            // Animate image change with transition only once per change
            if (currentImageIndex !== index) {
                currentImageIndex = index;
                photoImage.style.opacity = 0;
                setTimeout(() => {
                    photoImage.src = boxImages[index];
                    photoImage.style.opacity = 1;
                }, 500);
            }
            imageUpdated = true;
        } else {
            box.classList.remove('active');
        }
    });

    // Restore the initial image when scrolling back to the top
    if (!imageUpdated && scrollY < 50 && currentImageIndex !== -1) {
        currentImageIndex = -1;
        photoImage.style.opacity = 0;
        setTimeout(() => {
            photoImage.src = defaultImage;
            photoImage.style.opacity = 1;
        }, 500);
    }
}

// Attach event listener
window.addEventListener('scroll', handleScroll);

// Initial check in case page is loaded mid-scroll
handleScroll();

    document.addEventListener("DOMContentLoaded", function () {
        if (window.innerWidth <= 768) {
            const photoContainer = document.getElementById("photoContainer");
            const contentBoxes = document.querySelectorAll(".content-box");
            const photoImage = photoContainer.querySelector("img");
            const description = document.querySelector(".description");
            const menuToggle = document.getElementById("menu-toggle");
            const overlayMenu = document.getElementById("overlay-menu");
            const contentSection = document.querySelector(".content");
    
            let isScrollingDown = false;
            let currentImageIndex = -1;
            const defaultImage = "../assets/images/1318497.jpeg";
            const boxImages = [
                "../assets/images/event.webp",
                "../assets/images/1357585.png",
                "../assets/images/1357587.png"
            ];
    
            let lastScrollPosition = 0;
            window.addEventListener("scroll", () => {
                isScrollingDown = window.scrollY > lastScrollPosition;
                lastScrollPosition = window.scrollY;
            });
    
            window.addEventListener("scroll", function () {
                let scrollTop = window.scrollY;
                let windowHeight = window.innerHeight;
                
                if (scrollTop > 50) {
                    photoContainer.classList.add("shrink");
                    description.style.display = "none";
                    contentSection.style.marginTop = "calc(30vh + 20px)"; // Push content below the shrunk image
                } else {
                    photoContainer.classList.remove("shrink");
                    description.style.display = "block";
                    contentSection.style.marginTop = "10px"; // Reset margin when at the top
                }
                
                let imageUpdated = false;
                contentBoxes.forEach((box, index) => {
                    const boxTop = box.getBoundingClientRect().top;
                    if (boxTop < windowHeight / 2 && boxTop > 0) {
                        if (currentImageIndex !== index) {
                            currentImageIndex = index;
                            photoImage.style.opacity = 0;
                            setTimeout(() => {
                                photoImage.src = boxImages[index];
                                photoImage.style.opacity = 1;
                            }, 300);
                        }
                        imageUpdated = true;
                    }
                });
                
                if (!imageUpdated && scrollTop < 50 && currentImageIndex !== -1) {
                    currentImageIndex = -1;
                    photoImage.style.opacity = 0;
                    setTimeout(() => {
                        photoImage.src = defaultImage;
                        photoImage.style.opacity = 1;
                    }, 300);
                }
            });
    
            menuToggle.addEventListener("click", () => {
                const isOpen = overlayMenu.style.display === "flex";
                overlayMenu.style.display = isOpen ? "none" : "flex";
                menuToggle.classList.toggle("active");
            });
        
                // Hamburger Menu Functionality
                menuToggle.addEventListener('click', () => {
                const isOpen = overlayMenu.style.display === 'flex';
                overlayMenu.style.display = isOpen ? 'none' : 'flex';
                menuToggle.classList.toggle('active');
    });

        }
    });

        // Hamburger Menu Functionality
    const menuToggle = document.getElementById('menu-toggle');
    const overlayMenu = document.getElementById('overlay-menu');

    menuToggle.addEventListener('click', () => {
        const isOpen = overlayMenu.style.display === 'flex';
        overlayMenu.style.display = isOpen ? 'none' : 'flex';
        menuToggle.classList.toggle('active');
    });


