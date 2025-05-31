// ====== MENU TOGGLE FUNCTIONALITY ======

const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close'),
      navLink = document.querySelectorAll('.nav__link:not(.dropdown__link)'),
      dropdownLinks = document.querySelectorAll('.dropdown__link'),
      dropdownItems = document.querySelectorAll('.nav__item.dropdown');

// Show Menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        document.body.classList.add('menu-open'); // Prevent background scroll
    });
}

// Hide Menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.classList.remove('menu-open'); // Restore scroll
    });
}

// Close Menu on nav link click (mobile only)
navLink.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
            document.body.classList.remove('menu-open');
        }
    });
});

// Dropdown toggle on mobile
dropdownLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const parent = link.parentElement;
            parent.classList.toggle('dropdown-open');
            link.setAttribute('aria-expanded', parent.classList.contains('dropdown-open'));
        }
    });
});

// Dropdown open/close on desktop hover
dropdownItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
        if (window.innerWidth > 768) {
            item.classList.add('dropdown-open');
            const link = item.querySelector('.dropdown__link');
            if (link) link.setAttribute('aria-expanded', 'true');
        }
    });
    item.addEventListener('mouseleave', function () {
        if (window.innerWidth > 768) {
            item.classList.remove('dropdown-open');
            const link = item.querySelector('.dropdown__link');
            if (link) link.setAttribute('aria-expanded', 'false');
        }
    });
});

// Reset menus and dropdowns on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu) {
        navMenu.classList.remove('show-menu');
        dropdownItems.forEach(item => {
            item.classList.remove('dropdown-open');
            const link = item.querySelector('.dropdown__link');
            if (link) link.setAttribute('aria-expanded', 'false');
        });
    }
});

// Set ARIA attributes on dropdowns
dropdownLinks.forEach(link => {
    link.setAttribute('aria-haspopup', 'true');
    link.setAttribute('aria-expanded', 'false');
});

// ====== SCROLL ACTIVE LINK ======

const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

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