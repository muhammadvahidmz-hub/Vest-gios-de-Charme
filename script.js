// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

// ─── Language Toggle ──────────────────────────────────────────────────────────
let currentLang = 'pt';

function toggleLanguage() {
  currentLang = currentLang === 'pt' ? 'en' : 'pt';

  document.querySelectorAll('[data-en]').forEach(el => {
    if (currentLang === 'en') {
      if (!el.dataset.pt) el.dataset.pt = el.innerHTML;
      el.innerHTML = el.dataset.en;
    } else {
      if (el.dataset.pt) el.innerHTML = el.dataset.pt;
    }
  });

  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = currentLang === 'pt' ? 'EN' : 'PT';

  document.documentElement.lang = currentLang;
  document.title = currentLang === 'en'
    ? 'Vestígios de Charme | Guest House in Figueira da Foz'
    : 'Vestígios de Charme | Guest House em Figueira da Foz';

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ─── Review Translation Toggle ────────────────────────────────────────────────
function toggleTranslation(btn) {
  const p = btn.previousElementSibling;
  const isTranslated = p.dataset.lang === 'translated';
  if (isTranslated) {
    p.textContent = p.dataset.original;
    p.dataset.lang = 'original';
    btn.innerHTML = '<i data-lucide="languages" class="icon-tiny"></i> Translate';
    btn.classList.remove('active');
  } else {
    p.textContent = p.dataset.translated;
    p.dataset.lang = 'translated';
    btn.innerHTML = '<i data-lucide="languages" class="icon-tiny"></i> See original';
    btn.classList.add('active');
  }
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ─── Mobile Navigation ────────────────────────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', mainNav.classList.contains('open'));
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ─── Scroll to section ────────────────────────────────────────────────────────
document.querySelectorAll('[data-scroll]').forEach(button => {
  button.addEventListener('click', () => {
    const target = document.querySelector(button.getAttribute('data-scroll'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ─── Current year ─────────────────────────────────────────────────────────────
const yearSpan = document.getElementById('current-year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ─── Scroll reveal ────────────────────────────────────────────────────────────
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  scrollRevealElements.forEach((el, index) => {
    if (el.getBoundingClientRect().top < windowHeight - 100) {
      setTimeout(() => el.classList.add('revealed'), index % 3 * 100);
    }
  });
};
revealOnScroll();
window.addEventListener('scroll', revealOnScroll, { passive: true });

// ─── Header on scroll ─────────────────────────────────────────────────────────
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.style.background = window.scrollY > 50
    ? 'rgba(10, 61, 98, 0.98)'
    : 'rgba(10, 61, 98, 0.95)';
}, { passive: true });

// ─── Lightbox ─────────────────────────────────────────────────────────────────
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox?.querySelector('.lightbox-image');
const galleryItems = document.querySelectorAll('[data-lightbox]');
const galleryImages = Array.from(galleryItems).map(item => item.getAttribute('data-lightbox'));
let currentImageIndex = 0;

const openLightbox = (index) => {
  currentImageIndex = index;
  lightboxImage.src = galleryImages[index];
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
};
const closeLightbox = () => {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
};
const showPrevImage = () => {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImage.src = galleryImages[currentImageIndex];
};
const showNextImage = () => {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  lightboxImage.src = galleryImages[currentImageIndex];
};

galleryItems.forEach((item, index) => item.addEventListener('click', () => openLightbox(index)));
lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
lightbox?.querySelector('.lightbox-prev')?.addEventListener('click', showPrevImage);
lightbox?.querySelector('.lightbox-next')?.addEventListener('click', showNextImage);
lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', (e) => {
  if (!lightbox?.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrevImage();
  if (e.key === 'ArrowRight') showNextImage();
});

// ─── Smooth scroll ────────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', this.getAttribute('href'));
    }
  });
});

// ─── Room Sliders ─────────────────────────────────────────────────────────────
document.querySelectorAll('.room-slider').forEach(slider => {
  const slides = slider.querySelectorAll('.room-slide');
  const dots = slider.querySelectorAll('.dot');
  let current = 0;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  slider.querySelector('.slider-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    goTo(current - 1);
  });

  slider.querySelector('.slider-next').addEventListener('click', (e) => {
    e.stopPropagation();
    goTo(current + 1);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      goTo(i);
    });
  });

  // Auto-advance every 4 seconds
  let autoplay = setInterval(() => goTo(current + 1), 4000);
  slider.addEventListener('mouseenter', () => clearInterval(autoplay));
  slider.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goTo(current + 1), 4000);
  });
});
