// script.js

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- PROTOCOL DETAIL DATA ---------- */
  const protocolData = {
    http: {
      icon: '🌐',
      title: 'HTTP — HyperText Transfer Protocol',
      text: 'HTTP is the protocol that lets browsers request web pages and servers respond with content. It operates over port 80 and sends data in plain text, meaning it has no built-in encryption. It forms the backbone of how information travels across the web.'
    },
    https: {
      icon: '🔒',
      title: 'HTTPS — HTTP Secure',
      text: 'HTTPS is HTTP wrapped in an encryption layer using SSL/TLS. It runs on port 443 and scrambles data in transit, protecting passwords, payments, and personal information from interception. Modern browsers flag non-HTTPS sites as "Not Secure".'
    },
    ftp: {
      icon: '📁',
      title: 'FTP — File Transfer Protocol',
      text: 'FTP is designed specifically for uploading and downloading files between a client and a server. It runs on port 21 and is commonly used by developers and businesses to manage website files or transfer large batches of data.'
    },
    smtp: {
      icon: '📤',
      title: 'SMTP — Simple Mail Transfer Protocol',
      text: 'SMTP is the protocol responsible for sending and relaying outgoing email from a client to a mail server, and between mail servers. It typically uses port 25 for server-to-server relay or port 587 for secure client submission.'
    },
    pop3: {
      icon: '📥',
      title: 'POP3 — Post Office Protocol v3',
      text: 'POP3 downloads emails from a mail server directly onto a single device, often removing them from the server afterward. It runs on port 110 and is best suited for users who only check email from one device.'
    },
    imap: {
      icon: '📧',
      title: 'IMAP — Internet Message Access Protocol',
      text: 'IMAP keeps emails stored on the server and synchronizes them across every device you use. It runs on port 143 and is the standard choice for anyone checking email from a phone, tablet, and computer alike.'
    },
    dns: {
      icon: '🧭',
      title: 'DNS — Domain Name System',
      text: 'DNS acts as the internet\'s phonebook, translating human-friendly domain names like example.com into the numeric IP addresses computers use to find each other. It operates over port 53 and makes browsing the web possible without memorizing IP addresses.'
    }
  };

  /* ---------- NAVBAR SCROLL EFFECT ---------- */
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  /* ---------- MOBILE HAMBURGER MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  /* ---------- CURSOR GLOW (DESKTOP ONLY) ---------- */
  const cursorGlow = document.getElementById('cursorGlow');
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  if (!isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
      cursorGlow.style.opacity = '1';
    });
    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
    });
  } else {
    cursorGlow.style.display = 'none';
  }

  /* ---------- SCROLL REVEAL ANIMATIONS ---------- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  /* ---------- ANIMATED COUNTERS ---------- */
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  const animateCounters = () => {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 1600;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(eased * target);
        counter.textContent = currentValue.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };
      requestAnimationFrame(updateCounter);
    });
  };

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    statsObserver.observe(statsSection);
  }

  /* ---------- PROTOCOL CARD TILT EFFECT ---------- */
  const tiltCards = document.querySelectorAll('[data-tilt]');

  if (!isTouchDevice) {
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

        const glow = card.querySelector('.card-glow');
        if (glow) {
          glow.style.left = `${x - rect.width / 2}px`;
          glow.style.top = `${y - rect.height / 2}px`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  /* ---------- PROTOCOL DETAIL MODAL ---------- */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalBox = document.getElementById('modalBox');
  const modalClose = document.getElementById('modalClose');
  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');

  const openModal = (key) => {
    const data = protocolData[key];
    if (!data) return;
    modalIcon.textContent = data.icon;
    modalTitle.textContent = data.title;
    modalText.textContent = data.text;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.protocol-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const key = card.getAttribute('data-modal');
      openModal(key);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ---------- FAQ ACCORDION ---------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach((otherItem) => otherItem.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  /* ---------- NEWSLETTER FORM ---------- */
  const newsletterForm = document.getElementById('newsletterForm');
  const formMessage = document.getElementById('formMessage');

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (email) {
      formMessage.textContent = `Thanks! We'll send updates to ${email}`;
      emailInput.value = '';
      setTimeout(() => { formMessage.textContent = ''; }, 4000);
    }
  });

  /* ---------- BACK TO TOP BUTTON ---------- */
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- BUTTON SCROLL SHORTCUTS ---------- */
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  document.getElementById('exploreBtn').addEventListener('click', () => scrollToId('protocols'));
  document.getElementById('scrollToProtocols').addEventListener('click', () => scrollToId('protocols'));
  document.getElementById('scrollToCompare').addEventListener('click', () => scrollToId('compare'));
  document.getElementById('ctaScrollBtn').addEventListener('click', () => scrollToId('protocols'));

  /* ---------- SMOOTH SCROLL FOR ALL ANCHOR LINKS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});
