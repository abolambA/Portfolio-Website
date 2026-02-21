/* CURSOR */
const cur = document.getElementById('cur');
const ring = document.getElementById('curRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px'; });
(function anim() { rx += (mx - rx) * .12; ry += (my - ry) * .12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(anim); })();
document.querySelectorAll('a,button,.build-tile,.ach-card,.micro-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.style.transform = 'translate(-50%,-50%) scale(2.5)'; cur.style.opacity = '.4'; ring.style.transform = 'translate(-50%,-50%) scale(1.6)'; ring.style.borderColor = 'rgba(34,211,238,.6)'; });
  el.addEventListener('mouseleave', () => { cur.style.transform = 'translate(-50%,-50%) scale(1)'; cur.style.opacity = '1'; ring.style.transform = 'translate(-50%,-50%) scale(1)'; ring.style.borderColor = 'rgba(34,211,238,.4)'; });
});

/* PARTICLES */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, pts = [];
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize(); window.addEventListener('resize', resize);
for (let i = 0; i < 70; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, r: Math.random() * 1.4 + .4, a: Math.random() });
function draw() {
  ctx.clearRect(0, 0, W, H);
  pts.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(34,211,238,${p.a * .3})`; ctx.fill();
  });
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
    const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
    if (d < 120) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = `rgba(34,211,238,${.055 * (1 - d / 120)})`; ctx.lineWidth = .5; ctx.stroke(); }
  }
  requestAnimationFrame(draw);
}
draw();

/* NAV SCROLL */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60));

/* SCROLL REVEAL */
const srEls = document.querySelectorAll('.sr');
const srObs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }), { threshold: .07, rootMargin: '0px 0px -50px 0px' });
srEls.forEach(el => srObs.observe(el));

/* TILE STAGGER */
const tiles = document.querySelectorAll('.build-tile');
const tileObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const i = Array.from(tiles).indexOf(e.target);
      setTimeout(() => e.target.classList.add('in'), i * 80);
      tileObs.unobserve(e.target);
    }
  });
}, { threshold: .04, rootMargin: '0px 0px -20px 0px' });
tiles.forEach(t => tileObs.observe(t));

/* NAV ACTIVE */
const navLinks = document.querySelectorAll('.nav-center a');
const secObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const m = document.querySelector(`.nav-center a[href="#${e.target.id}"]`);
      if (m) m.classList.add('active');
    }
  });
}, { threshold: .45 });
document.querySelectorAll('[id]').forEach(s => secObs.observe(s));

/* CERT OPEN */
function openCert(el) {
  const cert = el.getAttribute('data-cert');
  if (cert) window.open(cert, '_blank');
}

/* FORM */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = {
      name: document.getElementById('contactName').value,
      email: document.getElementById('contactEmail').value,
      subject: document.getElementById('contactSubject').value,
      message: document.getElementById('contactMessage').value
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        btn.textContent = 'Sent ✓';
        btn.style.background = 'var(--emerald)';
        contactForm.reset();
      } else {
        btn.textContent = 'Failed to Send';
        btn.style.background = 'var(--rose)';
      }
    } catch (error) {
      console.error('Error:', error);
      btn.textContent = 'Failed to Send';
      btn.style.background = 'var(--rose)';
    }

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 3500);
  });
}

/* STAT COUNTER */
const statNums = document.querySelectorAll('.stat-num');
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const raw = e.target.textContent.trim();
    const numMap = { '5+': 5, '6+': 6, '4': 4 };
    const n = numMap[raw];
    if (!n) { cntObs.unobserve(e.target); return; }
    const suf = raw.includes('+') ? '+' : '';
    let v = 0; const inc = n / 60;
    const id = setInterval(() => { v = Math.min(v + inc, n); e.target.textContent = Math.floor(v) + suf; if (v >= n) clearInterval(id); }, 16);
    cntObs.unobserve(e.target);
  });
}, { threshold: .6 });
statNums.forEach(n => cntObs.observe(n));
