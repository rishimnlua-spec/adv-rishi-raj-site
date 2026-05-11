// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

    // Open clicked if it was closed
    if (!isOpen) item.classList.add('open');
  });
});

// ===== CONTACT FORM SUBMIT – WhatsApp Redirect =====
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name    = this.querySelector('input[type="text"]').value.trim();
    const email   = this.querySelector('input[type="email"]').value.trim();
    const phone   = this.querySelector('input[type="tel"]').value.trim();
    const service = this.querySelector('select') ? this.querySelector('select').value : '';
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
}

// ===== SCROLL REVEAL FOR CARDS =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.info-card, .faq-item').forEach(el => {
  el.classList.add('fade-up');
  revealObserver.observe(el);
});
