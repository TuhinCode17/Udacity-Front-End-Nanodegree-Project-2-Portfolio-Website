// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

// Cache DOM references once to avoid repeated queries
const burgerMenu = document.getElementById('burger-menu');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.header__nav-link');
const header = document.getElementById('header');

function toggleMobileMenu() {
  // Read state from ARIA to keep visual and accessibility state in sync 
  const isOpen = burgerMenu.getAttribute('aria-expanded') === 'true';

  // Toggle ARIA states
  burgerMenu.setAttribute('aria-expanded', String(!isOpen));
  navMenu.setAttribute('aria-hidden', String(isOpen));
  
  // Prevent background scrolling when the mobile menu is open
  document.body.classList.toggle('menu-open');
}

// Open/close menu on burger click
if (burgerMenu) {
  burgerMenu.addEventListener('click', toggleMobileMenu);
}

// Close menu when clicking nav links
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (
      window.innerWidth < 768 &&
      burgerMenu &&
      burgerMenu.getAttribute('aria-expanded') === 'true'
    ) {
      toggleMobileMenu();
    }
  });
});

// Allow keyboard users to dismiss the mobile menu with ESC
document.addEventListener('keydown', (e) => {
  if (
    e.key === 'Escape' &&
    burgerMenu &&
    burgerMenu.getAttribute('aria-expanded') === 'true'
  ) {
    toggleMobileMenu();
  }
});

// ==========================================
// SHRINKING HEADER ON SCROLL
// ==========================================

function handleScroll() {
  if (window.scrollY > 50) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
}

// Use requestAnimationFrame to avoid scroll event jank
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  
  scrollTimeout = window.requestAnimationFrame(handleScroll);
}, { passive: true });

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================

// Smooth-scroll anchor links while accounting for the fixed header height
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    if (href && href !== '#' && href.length > 1) {
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        // Get header height and calculate position
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        // Smooth scroll
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ==========================================
// CONTACT FORM HANDLING
// ==========================================

const contactForm = document.querySelector('.footer__form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    
    // Show success message
    alert(`Thank you, ${name}! I'll get back to you soon.`);
    
    // Reset form
    contactForm.reset();
  });
}

// ==========================================
// WINDOW RESIZE HANDLER
// ==========================================


// Ensure menu state resets correctly when switching from mobile to desktop
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  
  resizeTimeout = setTimeout(() => {
    // Close mobile menu if window is resized to desktop
    if (window.innerWidth >= 768 && burgerMenu) {
      const isOpen = burgerMenu.getAttribute('aria-expanded') === 'true';
      
      if (isOpen) {
        burgerMenu.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('menu-open');
      }
    }
  }, 250);
});

// ==========================================
// INITIALIZE ON DOM LOAD
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  if (burgerMenu) {
    burgerMenu.setAttribute('aria-expanded', 'false');
  }
  if (navMenu) {
    navMenu.setAttribute('aria-hidden', 'true');
  }
  
  console.log('✅ Portfolio initialized!');
});