// Custom Cursor Logic
const cur = document.getElementById('cur');
const ring = document.getElementById('curRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = px(mx);
  cur.style.top = px(my);
});

function px(v) { return v + 'px'; }

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = px(rx);
  ring.style.top = px(ry);
  requestAnimationFrame(animateRing);
}
animateRing();

// Cursor Hover Effects
document.querySelectorAll('a, button, .build-tile, .ach-card, .micro-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.transform = 'translate(-50%, -50%) scale(2.5)';
    cur.style.opacity = '0.4';
    ring.style.transform = 'translate(-50%, -50%) scale(1.6)';
    ring.style.borderColor = 'rgba(34, 211, 238, 0.6)';
  });

  el.addEventListener('mouseleave', () => {
    cur.style.transform = 'translate(-50%, -50%) scale(1)';
    cur.style.opacity = '1';
    ring.style.transform = 'translate(-50%, -50%) scale(1)';
    ring.style.borderColor = 'rgba(34, 211, 238, 0.4)';
  });
});

// Background Particle System
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H;
let pts = [];

function initBackground() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

initBackground();
window.addEventListener('resize', initBackground);

// Create initial points
for (let i = 0; i < 70; i++) {
  pts.push({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    r: Math.random() * 1.4 + 0.4,
    a: Math.random()
  });
}

function renderParticles() {
  ctx.clearRect(0, 0, W, H);

  pts.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(34, 211, 238, ${p.a * 0.3})`;
    ctx.fill();
  });

  // Draw connections
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x;
      const dy = pts[i].y - pts[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.055 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(renderParticles);
}
renderParticles();


// Scroll-based Header Styling
const navbar = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Scroll Reveal Observer
const revealElements = document.querySelectorAll('.sr');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
    }
  });
}, {
  threshold: 0.07,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Staggered Tile Entry
const buildTiles = document.querySelectorAll('.build-tile');
const tileObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = Array.from(buildTiles).indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('in');
      }, index * 80);
      tileObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.04,
  rootMargin: '0px 0px -20px 0px'
});

buildTiles.forEach(tile => tileObserver.observe(tile));

// Navigation Link Activity Tracking
const primaryNavLinks = document.querySelectorAll('.nav-center a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      primaryNavLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-center a[href="#${entry.target.id}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}, { threshold: 0.45 });

document.querySelectorAll('[id]').forEach(section => sectionObserver.observe(section));

// Handle Certificate Clicks
function openCert(element) {
  const certificatePath = element.getAttribute('data-cert');
  if (certificatePath) {
    window.open(certificatePath, '_blank');
  }
}

// Contact Form Submission
const contactFormElement = document.getElementById('contactForm');
if (contactFormElement) {
  contactFormElement.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const defaultBtnText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const formData = {
      name: document.getElementById('contactName').value,
      email: document.getElementById('contactEmail').value,
      subject: document.getElementById('contactSubject').value,
      message: document.getElementById('contactMessage').value
    };

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        submitBtn.textContent = 'Sent ✓';
        submitBtn.style.background = 'var(--emerald)';
        contactFormElement.reset();
      } else {
        throw new Error('Server responded with an error');
      }
    } catch (err) {
      console.error('Submission failed:', err);
      submitBtn.textContent = 'Failed to Send';
      submitBtn.style.background = 'var(--rose)';
    }

    // Reset button state
    setTimeout(() => {
      submitBtn.textContent = defaultBtnText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 3500);
  });
}

// Animated Statistics Counter
const countElements = document.querySelectorAll('.stat-num');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const content = entry.target.textContent.trim();
    const targetValues = { '5+': 5, '6+': 6, '4': 4 };
    const target = targetValues[content];

    if (!target) {
      countObserver.unobserve(entry.target);
      return;
    }

    const hasSuffix = content.includes('+');
    let currentCount = 0;
    const increment = target / 60;

    const interval = setInterval(() => {
      currentCount = Math.min(currentCount + increment, target);
      entry.target.textContent = Math.floor(currentCount) + (hasSuffix ? '+' : '');

      if (currentCount >= target) {
        clearInterval(interval);
      }
    }, 16);

    countObserver.unobserve(entry.target);
  });
}, { threshold: 0.6 });

countElements.forEach(el => countObserver.observe(el));
