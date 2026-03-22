/* ==========================================
   MAIN.JS — Portfolio Interactions
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // CUSTOM CURSOR
  // ==========================================
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');

  if (cursor && cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Scale cursor on hover
    const hoverTargets = document.querySelectorAll('a, button, .expertise-card, .skill-pill, .timeline-card');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.borderColor = 'rgba(99, 179, 237, 0.7)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.borderColor = 'rgba(99, 179, 237, 0.4)';
      });
    });
  }

  // ==========================================
  // NAVIGATION SCROLL BEHAVIOR
  // ==========================================
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // HAMBURGER MENU
  // ==========================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle('open', menuOpen);
      document.body.style.overflow = menuOpen ? 'hidden' : '';

      const spans = hamburger.querySelectorAll('span');
      if (menuOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(s => s.style.transform = s.style.opacity = '');
      });
    });
  }

  // ==========================================
  // SCROLL REVEAL ANIMATION
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // COUNTER ANIMATION
  // ==========================================
  const counters = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, 0, target, 1800);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(el, start, end, duration) {
    const startTime = performance.now();
    const suffix = end > 10 ? '+' : '+';

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      const current = Math.floor(start + (end - start) * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ==========================================
  // HERO STAGGER ANIMATION
  // ==========================================
  const heroItems = document.querySelectorAll('.hero-content .reveal, .hero-visual.reveal');
  heroItems.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + i * 150);
  });

  // ==========================================
  // EXPERTISE CARD TILT EFFECT
  // ==========================================
  const expertiseCards = document.querySelectorAll('.expertise-card');

  expertiseCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateX = (e.clientY - centerY) / rect.height * -8;
      const rotateY = (e.clientX - centerX) / rect.width * 8;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ==========================================
  // SKILL PILL STAGGER ANIMATION
  // ==========================================
  const skillGroups = document.querySelectorAll('.skills-group');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const pills = entry.target.querySelectorAll('.skill-pill');
        pills.forEach((pill, i) => {
          setTimeout(() => {
            pill.style.opacity = '1';
            pill.style.transform = 'translateY(0)';
          }, i * 80);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  skillGroups.forEach(group => {
    const pills = group.querySelectorAll('.skill-pill');
    pills.forEach(pill => {
      pill.style.opacity = '0';
      pill.style.transform = 'translateY(12px)';
      pill.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    skillObserver.observe(group);
  });

  // ==========================================
  // ACTIVE NAV LINK HIGHLIGHTING
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.style.color = '');
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink && !activeLink.classList.contains('nav-cta')) {
          activeLink.style.color = 'var(--accent)';
        }
      }
    });
  }, {
    threshold: 0.4,
    rootMargin: '-80px 0px 0px 0px'
  });

  sections.forEach(section => sectionObserver.observe(section));

  // ==========================================
  // TYPING EFFECT FOR CODE BLOCK
  // ==========================================
  const codeBlock = document.querySelector('.code-block code');
  if (codeBlock) {
    const originalHTML = codeBlock.innerHTML;
    codeBlock.innerHTML = '';

    const codeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let i = 0;
          const fullText = originalHTML;
          function typeChar() {
            if (i < fullText.length) {
              codeBlock.innerHTML = fullText.substring(0, i + 1);
              i++;
              // Skip over HTML tags instantly
              if (fullText[i] === '<') {
                while (fullText[i] !== '>' && i < fullText.length) i++;
                i++;
              }
              setTimeout(typeChar, 12);
            }
          }
          setTimeout(typeChar, 400);
          codeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    if (codeBlock.closest('.about-card')) {
      codeObserver.observe(codeBlock.closest('.about-card'));
    }
  }

  // ==========================================
  // MOUSE PARALLAX ON HERO ORBS
  // ==========================================
  const orb1 = document.querySelector('.hero-orb-1');
  const orb2 = document.querySelector('.hero-orb-2');

  document.addEventListener('mousemove', (e) => {
    const mx = (e.clientX / window.innerWidth - 0.5) * 30;
    const my = (e.clientY / window.innerHeight - 0.5) * 30;
    if (orb1) orb1.style.transform = `translate(${mx * 0.5}px, ${my * 0.5}px)`;
    if (orb2) orb2.style.transform = `translate(${-mx * 0.3}px, ${-my * 0.3}px)`;
  });

  // ==========================================
  // SCROLL PROGRESS INDICATOR
  // ==========================================
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    background: linear-gradient(to right, var(--accent), var(--accent-2));
    z-index: 200;
    width: 0%;
    transition: width 0.1s;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  });

});
