/**
 * script.js
 * Handles interactive animations, tilt effects, page switching, mobile navigation, and theme toggling.
 * Optimized version with proper dark/light mode support.
 */

// --- 1. DOM ELEMENTS ---
const contentWrapper = document.getElementById('content-wrapper');
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuOpenIcon = document.getElementById('menu-open');
const menuCloseIcon = document.getElementById('menu-close');
const pageButtons = document.querySelectorAll('.page-button');
const allPages = document.querySelectorAll('.page');
const tiltCards = document.querySelectorAll('.tilt-card');
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

// --- 2. UTILITIES ---
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// --- 3. 3D TILT EFFECT ---
function handleCardTilt(card, mouseX, mouseY) {
  const rect = card.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const offsetX = (mouseX - centerX) / (rect.width / 2);
  const offsetY = (mouseY - centerY) / (rect.height / 2);

  const maxTilt = parseFloat(card.getAttribute('data-tilt-max')) || 5;
  const rotateY = -maxTilt * offsetX;
  const rotateX = maxTilt * offsetY;

  card.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale3d(1.02, 1.02, 1.02)
  `;
}

// Attach tilt event listeners
tiltCards.forEach(card => {
  let tiltRAF;
  card.addEventListener('mousemove', e => {
    cancelAnimationFrame(tiltRAF);
    tiltRAF = requestAnimationFrame(() => handleCardTilt(card, e.clientX, e.clientY));
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  });
});

// --- 4. PAGE SWITCHING ---
function showPage(pageId) {
  allPages.forEach(page => {
    page.classList.add('hidden', 'opacity-0');
    page.classList.remove('opacity-100', 'transition-opacity', 'duration-500');
    page.querySelectorAll('.animated-content').forEach(el => {
      el.classList.remove('animate-slide-up-fade', 'animate-slow-fade');
    });
  });

  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.remove('hidden', 'opacity-0');
    requestAnimationFrame(() => {
      targetPage.classList.add('transition-opacity', 'duration-500', 'opacity-100');
    });
    targetPage.querySelectorAll('.animated-content').forEach((el, index) => {
      el.style.animationDelay = `${index * 0.08}s`;
      el.classList.add('animate-slide-up-fade');
    });
  }

  pageButtons.forEach(button => {
    const isActive = button.getAttribute('data-page') === pageId;
    button.setAttribute('data-active', isActive);
    if (isActive) {
      button.classList.add('bg-accent-blue', 'text-primary-dark');
      button.classList.remove('text-text-faint', 'hover:text-accent-blue');
    } else {
      button.classList.remove('bg-accent-blue', 'text-primary-dark');
      button.classList.add('text-text-faint', 'hover:text-accent-blue');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (!mobileMenu.classList.contains('hidden')) toggleMobileMenu();
}
window.showPage = showPage;

// --- 5. MOBILE MENU TOGGLE ---
function toggleMobileMenu() {
  const isHidden = mobileMenu.classList.toggle('hidden');
  menuOpenIcon.classList.toggle('hidden', !isHidden);
  menuCloseIcon.classList.toggle('hidden', isHidden);
}
mobileToggle?.addEventListener('click', toggleMobileMenu);
window.toggleMobileMenu = toggleMobileMenu;

// --- 6. DARK/LIGHT THEME LOGIC ---
function applyTheme(isDark) {
  if (isDark) {
    document.documentElement.classList.add('dark');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
    document.documentElement.style.setProperty('--bg-color', '#0f172a');
    document.documentElement.style.setProperty('--text-color', '#ffffff');
    document.documentElement.style.setProperty('--card-bg', '#1e293b');
    document.documentElement.style.setProperty('--card-text', '#ffffff');
  } else {
    document.documentElement.classList.remove('dark');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
    document.documentElement.style.setProperty('--bg-color', '#ffffff');
    document.documentElement.style.setProperty('--text-color', '#000000');
    document.documentElement.style.setProperty('--card-bg', '#f0f0f0');
    document.documentElement.style.setProperty('--card-text', '#111111');
  }
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize theme
const userTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let isDarkMode = userTheme === 'dark' || (!userTheme && systemPrefersDark);
applyTheme(isDarkMode);

// Theme toggle button
themeToggle?.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  applyTheme(isDarkMode);
});

// --- 7. INITIAL PAGE LOAD ---
document.addEventListener('DOMContentLoaded', () => {
  if (!contentWrapper || !pageButtons.length) return;

  // Fade-in wrapper
  contentWrapper.style.opacity = '0';
  requestAnimationFrame(() => {
    contentWrapper.style.transition = 'opacity 0.8s ease-in-out';
    contentWrapper.style.opacity = '1';
  });

  // Show default page
  showPage('page-about');
});
