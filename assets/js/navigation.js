// Show menu
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

// Menu Show
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Menu Hidden
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Remove menu mobile and handle dropdowns
const navLink = document.querySelectorAll('.nav__link:not(.dropdown__link)');
const dropdownLinks = document.querySelectorAll('.dropdown__link');
const dropdownItems = document.querySelectorAll('.nav__item.dropdown');

// Close mobile menu when clicking a link
function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.classList.remove('show-menu');
    }
}

// Handle dropdown toggle on mobile
function toggleDropdown(e) {
    if (window.innerWidth <= 768) {
        e.preventDefault();
        const parentItem = this.closest('.nav__item.dropdown');
        
        // Close all other dropdowns
        dropdownItems.forEach(item => {
            if (item !== parentItem) {
                item.classList.remove('active');
            }
        });
        
        // Toggle current dropdown
        if (parentItem) {
            parentItem.classList.toggle('active');
        }
    }
}

// Add event listeners
if (navLink.length > 0) {
    navLink.forEach(n => n.addEventListener('click', linkAction));
}

// Add click event for dropdown toggles on mobile
const dropdownToggles = document.querySelectorAll('.nav__item.dropdown > .nav__link');
if (dropdownToggles.length > 0) {
    dropdownToggles.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the click was on the dropdown icon or the link text
            const isDropdownIcon = e.target.classList.contains('dropdown__icon') || 
                                 e.target.parentElement.classList.contains('dropdown__icon');
            
            if (window.innerWidth <= 768) {
                // On mobile, always toggle dropdown
                e.preventDefault();
                const parentItem = this.closest('.nav__item.dropdown');
                if (parentItem) {
                    parentItem.classList.toggle('active');
                }
            } else if (isDropdownIcon) {
                // On desktop, only toggle dropdown if clicking the icon
                e.preventDefault();
                const parentItem = this.closest('.nav__item.dropdown');
                if (parentItem) {
                    parentItem.classList.toggle('active');
                }
            }
            // If it's a regular click on desktop, let the default link behavior happen
        });
    });
}

// Close dropdowns when clicking outside
window.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        if (!e.target.closest('.nav__item.dropdown')) {
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    }
});

// Handle blog links
document.addEventListener('click', function(e) {
    // Check if the clicked element is a blog link
    const blogLink = e.target.closest('.blog-link');
    if (blogLink) {
        e.preventDefault();
        const target = blogLink.getAttribute('data-target');
        
        // If we're already on the index page, scroll to the section
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
            const section = document.getElementById(target);
            if (section) {
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                if (navMenu) navMenu.classList.remove('show-menu');
                
                // Scroll to section
                window.scrollTo({
                    top: section.offsetTop - 70, // Adjust for header
                    behavior: 'smooth'
                });
            }
        } else {
            // If we're not on the index page, go to index.html#target
            window.location.href = `index.html#${target}`;
        }
    }
});

// Change background header
function scrollHeader() {
    const header = document.getElementById('header');
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) header.classList.add('scroll-header'); 
    else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

// Active link
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (sectionsClass) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link');
            } else {
                sectionsClass.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);
