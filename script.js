// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const icon = hamburger.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const icon = hamburger.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

// ===== STICKY NAVBAR SHADOW =====
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 40) {
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id], footer[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = '#00C49A';
    }
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add animation class to cards and sections
document.querySelectorAll(
  '.service-card, .why-card, .blog-card, .contact-card, .about-grid, .stat'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// ===== CONTACT FORM SUBMIT – WhatsApp Redirect =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name    = this.querySelector('input[type="text"]').value.trim();
  const email   = this.querySelector('input[type="email"]').value.trim();
  const phone   = this.querySelector('input[type="tel"]').value.trim();
  const service = this.querySelector('select').value;
  const message = this.querySelector('textarea').value.trim();

  const whatsappNumber = '918541926505';

  let text = `Hello Advocate Rishi Raj Singh,\n\n`;
  text += `*Name:* ${name}\n`;
  if (email)   text += `*Email:* ${email}\n`;
  if (phone)   text += `*Phone:* ${phone}\n`;
  if (service) text += `*Service Required:* ${service}\n`;
  if (message) text += `\n*Message:*\n${message}`;

  const encodedText = encodeURIComponent(text);
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

  window.open(whatsappURL, '_blank');
  this.reset();
});

// ===== SMOOTH NUMBER COUNTER FOR STATS =====
function animateCounter(el, target, suffix = '') {
  let count = 0;
  const increment = target / 60;
  const update = () => {
    count += increment;
    if (count < target) {
      el.textContent = Math.floor(count) + suffix;
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  };
  update();
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = document.querySelectorAll('.stat-num');
      nums[0] && animateCounter(nums[0], 10, '+');
      nums[1] && animateCounter(nums[1], 500, '+');
      nums[2] && animateCounter(nums[2], 100, '%');
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
