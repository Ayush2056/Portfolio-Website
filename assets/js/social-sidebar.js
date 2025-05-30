// Social Sidebar Functionality
document.addEventListener('DOMContentLoaded', function() {
  const socialSidebar = document.querySelector('.social-sidebar');
  const socialToggle = document.querySelector('.social-sidebar__toggle');
  
  if (!socialSidebar || !socialToggle) return;
  
  let isOpen = false;
  let hoverTimeout;
  const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Toggle sidebar function
  function toggleSidebar(e) {
    if (e) e.stopPropagation();
    isOpen = !isOpen;
    socialSidebar.classList.toggle('active', isOpen);
    
    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    }
  }

  // Handle clicks outside the sidebar
  function handleOutsideClick(e) {
    if (!socialSidebar.contains(e.target)) {
      closeSidebar();
    }
  }

  // Close sidebar with Escape key
  function handleEscapeKey(e) {
    if (e.key === 'Escape') closeSidebar();
  }

  // Close sidebar function
  function closeSidebar() {
    isOpen = false;
    socialSidebar.classList.remove('active');
    document.removeEventListener('click', handleOutsideClick);
    document.removeEventListener('keydown', handleEscapeKey);
  }

  // Desktop hover behavior
  if (!touchDevice) {
    socialSidebar.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
      if (!isOpen) hoverTimeout = setTimeout(toggleSidebar, 200);
    });

    socialSidebar.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout);
      if (isOpen) hoverTimeout = setTimeout(closeSidebar, 300);
    });
  }

  // Toggle on click
  socialToggle.addEventListener('click', toggleSidebar);

  // Mobile touch handling
  if (touchDevice) {
    let touchStartTime;
    
    socialSidebar.addEventListener('touchstart', () => {
      touchStartTime = Date.now();
    }, { passive: true });
    
    socialSidebar.addEventListener('touchend', (e) => {
      if (Date.now() - touchStartTime < 300) {
        e.preventDefault();
        toggleSidebar(e);
      }
    }, { passive: false });
  }

  // Add ripple effect to links
  document.querySelectorAll('.social-sidebar__link').forEach(link => {
    link.addEventListener('click', function(e) {
      if (!this.href || this.getAttribute('href') === '#') {
        e.preventDefault();
      }
      
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      
      Object.assign(ripple.style, {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        left: `${e.clientX - rect.left - size/2}px`,
        top: `${e.clientY - rect.top - size/2}px`,
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        transform: 'scale(0)',
        animation: 'ripple 0.6s linear',
        pointerEvents: 'none'
      });
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
      if (touchDevice) setTimeout(closeSidebar, 300);
    });
  });

  // Add ripple animation
  if (!document.querySelector('#ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes ripple { to { transform: scale(2.5); opacity: 0; } }
    `;
    document.head.appendChild(style);
  }
});
