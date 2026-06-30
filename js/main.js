// Product grid — samakan tinggi Garva (wide) dengan Mocafine (narrow)
(function () {
  var wide   = document.querySelector('.psvg-wide');
  var narrow = document.querySelector('.psvg-narrow');
  if (!wide || !narrow) return;

  function sync() {
    wide.style.height   = '';
    narrow.style.height = '';
    if (window.innerWidth < 900) return;
    // offsetWidth ditentukan murni oleh grid columns — selalu akurat
    var nw = narrow.offsetWidth;
    if (nw < 20) return;
    var h = Math.round(nw * 538 / 467);
    wide.style.height   = h + 'px';
    narrow.style.height = h + 'px';
  }

  window.addEventListener('load',   sync);
  window.addEventListener('resize', sync);
  // Fallback jika load sudah lewat
  if (document.readyState === 'complete') sync();
}());

// Media partner ticker — pixel-perfect seamless loop
(function () {
  var track = document.getElementById('mpTickerTrack');
  if (!track) return;

  function sync() {
    var logos = track.querySelectorAll('.mp-logo');
    if (logos.length < 14) return;
    // Posisi logo ke-14 (awal duplikat) relatif terhadap track = jarak animasi tepat
    var offset = logos[13].offsetLeft - track.offsetLeft;
    if (offset > 0) track.style.setProperty('--mp-offset', offset + 'px');
  }

  if (document.readyState === 'complete') { sync(); }
  else { window.addEventListener('load', sync); }
  window.addEventListener('resize', sync);
}());

// Hero ticker — pixel-perfect seamless loop
(function () {
  var track = document.getElementById('heroTickerTrack');
  var set   = document.getElementById('heroTickerSet');
  if (!track || !set) return;

  function sync() {
    var w = set.getBoundingClientRect().width;
    if (w > 0) track.style.setProperty('--hero-set-w', w + 'px');
  }

  // Sync after all images finish loading (SVGs need this)
  if (document.readyState === 'complete') {
    sync();
  } else {
    window.addEventListener('load', sync);
  }
  window.addEventListener('resize', sync);
}());

// Navbar scroll shadow
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const mobileDrawer = document.getElementById('mobileDrawer');
if (hamburger && mobileDrawer) {
  hamburger.addEventListener('click', () => mobileDrawer.classList.toggle('open'));
  document.querySelectorAll('.mobile-drawer a').forEach(link => {
    link.addEventListener('click', () => mobileDrawer.classList.remove('open'));
  });
}

// News filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Testimonial carousel
let currentSlide = 0;
function goToSlide(index) {
  const track = document.getElementById('testimonialTrack');
  if (!track) return;
  const cards = track.querySelectorAll('.testimonial-card');
  const visibleCards = window.innerWidth <= 900 ? 1 : 3;
  const cardWidth = cards[0].offsetWidth + 24;
  const maxSlide = cards.length - visibleCards;
  currentSlide = Math.min(Math.max(index, 0), maxSlide);
  track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}
window.goToSlide = goToSlide;

if (document.getElementById('testimonialTrack')) {
  setInterval(() => {
    const track = document.getElementById('testimonialTrack');
    const cards = track.querySelectorAll('.testimonial-card');
    const visibleCards = window.innerWidth <= 900 ? 1 : 3;
    const maxSlide = cards.length - visibleCards;
    goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1);
  }, 4000);
}

window.addEventListener('resize', () => {
  goToSlide(0);
});

// Ecosystem scroll-driven
const ecoWrap = document.getElementById('ecoWrap');
if (ecoWrap) {
  let currentEco = 0;
  const totalEco = 4;

  function updateEco(index) {
    if (index === currentEco && document.querySelector('.eco-slide:not(.inactive)')) return;
    currentEco = index;
    document.querySelectorAll('.eco-slide').forEach((el, i) => {
      el.classList.toggle('inactive', i !== index);
    });
    document.querySelectorAll('.eco-img').forEach((el, i) => {
      el.classList.toggle('active', i === index);
    });
    document.querySelectorAll('.eco-dot-btn').forEach((el, i) => {
      el.classList.toggle('active', i === index);
    });
  }

  window.addEventListener('scroll', () => {
    const rect = ecoWrap.getBoundingClientRect();
    const sectionH = ecoWrap.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / sectionH));
    const index = Math.min(totalEco - 1, Math.floor(progress * totalEco));
    updateEco(index);
  });

  document.querySelectorAll('.eco-dot-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.dataset.target);
      const sectionTop = ecoWrap.getBoundingClientRect().top + window.scrollY;
      const sectionH = ecoWrap.offsetHeight - window.innerHeight;
      window.scrollTo({ top: sectionTop + (target / totalEco) * sectionH, behavior: 'smooth' });
    });
  });
}

// Production process step animation
(function () {
  var stepsWrap = document.getElementById('processSteps');
  if (!stepsWrap) return;
  var steps = stepsWrap.querySelectorAll('.process-step');
  var current = 0;
  var timer = null;

  function activate(index) {
    steps.forEach(function (s, i) { s.classList.toggle('active', i <= index); });
  }

  function startCycle() {
    if (timer) return;
    timer = setInterval(function () {
      current++;
      if (current >= steps.length) {
        current = 0;
        steps.forEach(function (s) { s.classList.remove('active'); });
        setTimeout(function () { activate(current); }, 300);
        return;
      }
      activate(current);
    }, 1200);
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { startCycle(); }
      else { clearInterval(timer); timer = null; }
    });
  }, { threshold: 0.3 });
  obs.observe(stepsWrap);
}());

// Achievement card deck (tentang-kami.html)
(function () {
  var deck = document.getElementById('achieveDeck');
  if (!deck) return;
  var cards = Array.from(deck.querySelectorAll('.ach-card'));
  var dotsWrap = document.getElementById('achieveDots');
  var btnPrev = document.getElementById('achievePrev');
  var btnNext = document.getElementById('achieveNext');
  var current = 0;

  cards.forEach(function (_, i) {
    var d = document.createElement('span');
    d.className = 'proc-dot';
    d.addEventListener('click', function () { go(i); });
    dotsWrap.appendChild(d);
  });

  function render() {
    cards.forEach(function (card, i) {
      var pos = Math.max(-4, Math.min(4, i - current));
      card.setAttribute('data-pos', pos);
    });
    Array.from(dotsWrap.querySelectorAll('.proc-dot')).forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
    btnPrev.disabled = current === 0;
    btnNext.disabled = current === cards.length - 1;
  }

  function go(index) { current = Math.max(0, Math.min(cards.length - 1, index)); render(); }

  btnPrev.addEventListener('click', function () { go(current - 1); });
  btnNext.addEventListener('click', function () { go(current + 1); });

  cards.forEach(function (card, i) {
    card.addEventListener('click', function () {
      var pos = i - current;
      if (pos < 0) go(current - 1);
      else if (pos > 0) go(current + 1);
    });
  });

  render();
}());

// Count-up animation
const counters = document.querySelectorAll('.stat-num[data-target], .impact-num[data-target]');
if (counters.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '+';
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current) + suffix;
          if (current >= target) clearInterval(timer);
        }, 16);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}
