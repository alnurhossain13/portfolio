// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('backTop').classList.toggle('show', window.scrollY > 400);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===== TYPING ANIMATION =====
const texts = [
  'Frontend Developer 💻',
  'Web Designer 🎨',
  'JavaScript Enthusiast ⚡',
  'Responsive UI Builder 📱',
  'Open Source Learner 🚀'
];
let textIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeWriter() {
  const current = texts[textIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
  }
  let speed = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === current.length + 1) {
    speed = 1800; isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    speed = 400;
  }
  setTimeout(typeWriter, speed);
}
typeWriter();

// ===== PARTICLES =====
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
  const p = document.createElement('div');
  const size = Math.random() * 4 + 1;
  p.style.cssText = `
    position:absolute;
    width:${size}px; height:${size}px;
    background:rgba(99,102,241,${Math.random() * 0.5 + 0.1});
    border-radius:50%;
    left:${Math.random() * 100}%;
    top:${Math.random() * 100}%;
    animation: particleFloat ${Math.random() * 10 + 8}s ease-in-out infinite;
    animation-delay:${Math.random() * 5}s;
  `;
  particlesContainer.appendChild(p);
}
const style = document.createElement('style');
style.textContent = `@keyframes particleFloat {
  0%,100%{transform:translateY(0) translateX(0);}
  33%{transform:translateY(-30px) translateX(15px);}
  66%{transform:translateY(20px) translateX(-10px);}
}`;
document.head.appendChild(style);

// ===== SKILL BARS ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach(fill => {
        const w = fill.getAttribute('data-width');
        setTimeout(() => { fill.style.width = w + '%'; }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

// ===== REVEAL ON SCROLL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .skill-card, .project-card, .service-card, .timeline-item').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      const cats = card.getAttribute('data-category') || '';
      if (filter === 'all' || cats.includes(filter)) {
        card.classList.remove('hide');
        card.style.animation = 'fadeInUp 0.4s ease forwards';
      } else {
        card.classList.add('hide');
      }
    });
  });
});

const fadeStyle = document.createElement('style');
fadeStyle.textContent = `@keyframes fadeInUp {
  from{opacity:0;transform:translateY(20px);}
  to{opacity:1;transform:translateY(0);}
}`;
document.head.appendChild(fadeStyle);

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !subject || !message) {
    formMsg.textContent = '⚠️ Please fill in all fields!';
    formMsg.className = 'form-msg error';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formMsg.textContent = '⚠️ Please enter a valid email address!';
    formMsg.className = 'form-msg error';
    return;
  }

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    formMsg.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
    formMsg.className = 'form-msg success';
    form.reset();
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    submitBtn.disabled = false;
    setTimeout(() => { formMsg.textContent = ''; }, 5000);
  }, 1800);
});

// ===== FOOTER YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--primary)' : '';
  });
});
