/**
 * ============================================================
 * TAALLA TEJA — PORTFOLIO JAVASCRIPT
 * Handles: Typing animation, Navbar scroll, Scroll reveal,
 *          Scroll-to-top, Contact form, Active nav links
 * ============================================================
 */

/* ---- Wait for DOM to be ready ---- */
document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. TYPING ANIMATION
     Cycles through role titles with a realistic typing effect
     ============================================================ */
  const typedOutput = document.getElementById('typedOutput');
  const typedCursor = document.getElementById('typedCursor');

  if (typedOutput) {
    const roles = [
      'Software Engineer',
      'Python Full Stack Dev',
      'Problem Solver',
      'Django Developer',
      'Web Developer',
    ];

    let roleIndex   = 0;  // which role we're on
    let charIndex   = 0;  // which character we're on
    let isDeleting  = false;
    let typingDelay = 100; // ms per character

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (!isDeleting) {
        // Typing forward
        typedOutput.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
          // Finished typing — pause before deleting
          isDeleting = true;
          typingDelay = 1800;
        } else {
          typingDelay = 100;
        }
      } else {
        // Deleting
        typedOutput.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          // Finished deleting — move to next role
          isDeleting  = false;
          roleIndex   = (roleIndex + 1) % roles.length;
          typingDelay = 400;
        } else {
          typingDelay = 55;
        }
      }

      setTimeout(typeLoop, typingDelay);
    }

    // Start after a short delay
    setTimeout(typeLoop, 800);
  }


  /* ============================================================
     2. NAVBAR — Scroll-triggered style change
     Adds .scrolled class after user scrolls down 60px
     ============================================================ */
  const navbar = document.getElementById('mainNav');

  if (navbar) {
    const handleNavScroll = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // Run on load
  }


  /* ============================================================
     3. ACTIVE NAV LINK — Highlight current section in navbar
     Updates active state as user scrolls through sections
     ============================================================ */
  const navLinks = document.querySelectorAll('.nav-pill');
  const sections = document.querySelectorAll('section[id]');

  const updateActiveNav = () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop    = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId     = section.getAttribute('id');
      const matchingLink  = document.querySelector(`.nav-pill[href="#${sectionId}"]`);

      if (matchingLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(l => l.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav(); // Run on load


  /* ============================================================
     4. SCROLL REVEAL ANIMATION
     Reveals .reveal elements as they enter the viewport
     ============================================================ */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling index
        const delay = i * 60;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root:       null,
    rootMargin: '0px 0px -60px 0px',
    threshold:  0.15,
  });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ============================================================
     5. SCROLL TO TOP BUTTON
     Shows button after 400px scroll; scrolls back to top on click
     ============================================================ */
  const scrollTopBtn = document.getElementById('scrollToTop');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ============================================================
     6. SMOOTH SCROLL for internal anchor links
     Ensures smooth scroll accounts for fixed navbar height
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 80;
        const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({ top: targetTop, behavior: 'smooth' });

        // Close mobile nav if open
        const navCollapse = document.getElementById('navbarContent');
        if (navCollapse && navCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  });


  /* ============================================================
     7. CONTACT FORM — Client-side validation & success feedback
     Shows a success message on submit (no real backend needed)
     ============================================================ */
  const contactForm   = document.getElementById('contactForm');
  const formSuccess   = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic HTML5 validation
      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }

      // Simulate sending (show spinner briefly, then success)
      const submitBtn = contactForm.querySelector('[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled    = true;
      submitBtn.innerHTML   = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled  = false;
        formSuccess.classList.remove('d-none');
        contactForm.reset();
        contactForm.classList.remove('was-validated');

        // Auto-hide success message after 5 seconds
        setTimeout(() => formSuccess.classList.add('d-none'), 5000);
      }, 1500);
    });
  }


  /* ============================================================
     8. PROFILE IMAGE — Force fresh load to bypass cache
     ============================================================ */
  const profileImg = document.querySelector('.profile-photo');
  if (profileImg) {
    profileImg.src = '/profile.png?v=' + Date.now();
  }

  /* ============================================================
     9. FOOTER YEAR — Automatically update copyright year
     ============================================================ */
  const footerYear = document.getElementById('footerYear');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }


  /* ============================================================
     9. SKILL CARD — Stagger entrance animation
     Each skill card fades in with a slight delay
     ============================================================ */
  const skillCards = document.querySelectorAll('.skill-card');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    skillObserver.observe(card);
  });

}); // end DOMContentLoaded
