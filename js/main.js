/**
 * GreenLeaf - Organic Plant Store
 * Interactive Frontend JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation on Scroll
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.classList.toggle('active', !isOpen);
      navMenu.classList.toggle('open', !isOpen);
      mobileToggle.setAttribute('aria-expanded', !isOpen);
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Active Nav Link on Scroll (Intersection Observer)
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => navObserver.observe(section));

  // 4. Plant Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const plantCards = document.querySelectorAll('.plant-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      plantCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Plant Quick View Modal Data & Interaction
  const modalData = {
    monstera: {
      tag: 'Tropical Statement Plant',
      title: 'Monstera Deliciosa (Swiss Cheese)',
      price: 'Rs.3000',
      category: 'Indoor Foliage',
      desc: 'Known for its iconic split leaves, the Monstera Deliciosa brings an exotic, calming green atmosphere to any room. Grown organically without artificial shine sprays or hormone boosters.',
      image: 'assets/images/cat-indoor.jpg',
      light: 'Bright, indirect light',
      water: 'Every 7-10 days',
      difficulty: 'Easy / Low Maintenance',
      target: 'Living Rooms & Creative Studios',
      soil: 'Organic peat-free perlite blend',
      petSafe: 'Keep out of reach of curious pets'
    },
    snake: {
      tag: 'Air Purifying Champion',
      title: 'Sansevieria Laurentii (Snake Plant)',
      price: 'Rs.2500',
      category: 'Air Purifying',
      desc: 'Recognized by NASA studies for its exceptional capability to remove indoor toxins and release pure oxygen throughout the night. Virtually indestructible and thriving on neglect.',
      image: 'assets/images/cat-air-purifying.jpg',
      light: 'Tolerates low light to bright sun',
      water: 'Every 2-3 weeks (allow to dry completely)',
      difficulty: 'Beginner friendly',
      target: 'Dorm rooms, Bedrooms & Study Desks',
      soil: 'Free-draining organic succulent mix',
      petSafe: 'Mildly toxic if ingested'
    },
    succulents: {
      tag: 'Dorm & Desk Favorite',
      title: 'Artisanal Succulent Trio & ZZ Green',
      price: 'Rs.1500',
      category: 'Low Maintenance',
      desc: 'Hand-curated collection of hardy succulent varieties potted in breathable earthenware. Requires minimal watering, making it ideal for busy college students and frequent travelers.',
      image: 'assets/images/cat-low-maintenance.jpg',
      light: 'Direct or bright indirect sunshine',
      water: 'Once every 2-4 weeks',
      difficulty: 'Ultra Easy',
      target: 'University Students & Dorm Windowsills',
      soil: 'Organic mineral-rich desert grit',
      petSafe: 'Selected non-toxic succulent varieties'
    },
    bonsai: {
      tag: 'Productivity & Focus Booster',
      title: 'Zen Office Dwarf Juniper & Pilea',
      price: 'Rs.3000',
      category: 'Desk & Office',
      desc: 'Specially cultivated compact greens tailored to reduce digital eyestrain and elevate workspace productivity. Potted in sustainable recycled stoneware.',
      image: 'assets/images/cat-office-desk.jpg',
      light: 'Medium to bright ambient light',
      water: 'Light misting, water when topsoil feels dry',
      difficulty: 'Moderate',
      target: 'Corporate Offices & Workstations',
      soil: 'Bio-enriched organic bonsai mix',
      petSafe: '100% Non-toxic'
    }
  };

  const modalOverlay = document.getElementById('plantModal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const viewDetailBtns = document.querySelectorAll('.view-detail-btn');

  const openModal = (plantKey) => {
    const data = modalData[plantKey];
    if (!data || !modalOverlay) return;

    document.getElementById('modalImage').src = data.image;
    document.getElementById('modalImage').alt = data.title;
    document.getElementById('modalTag').textContent = data.tag;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDesc').textContent = data.desc;
    document.getElementById('modalLight').textContent = data.light;
    document.getElementById('modalWater').textContent = data.water;
    document.getElementById('modalDifficulty').textContent = data.difficulty;
    const modalPriceElem = document.getElementById('modalPrice');
    if (modalPriceElem && data.price) {
      modalPriceElem.textContent = data.price;
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const plantKey = btn.getAttribute('data-plant');
      openModal(plantKey);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // 6. Interactive Contact Form with Validation
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const audienceInput = document.getElementById('contactAudience');
      const messageInput = document.getElementById('contactMessage');

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const messageVal = messageInput ? messageInput.value.trim() : '';

      // Simple email regex validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!nameVal) {
        alert('Please enter your full name.');
        nameInput.focus();
        return;
      }

      if (!emailVal || !emailPattern.test(emailVal)) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        return;
      }

      if (!messageVal || messageVal.length < 10) {
        alert('Please share a brief message (at least 10 characters).');
        messageInput.focus();
        return;
      }

      // Success feedback
      alert(`Thank you, ${nameVal}! Your inquiry has been sent. Our botanist team will get back to you within 24 hours.`);
      contactForm.reset();
    });
  }

  // 7. Newsletter Subscription Form
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterFeedback = document.getElementById('newsletterFeedback');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim()) {
        if (newsletterFeedback) {
          newsletterFeedback.style.display = 'block';
          newsletterFeedback.textContent = '🌿 Welcome to the GreenLeaf community! Check your inbox for your 15% welcome voucher.';
          newsletterForm.reset();
          setTimeout(() => {
            newsletterFeedback.style.display = 'none';
          }, 6000);
        }
      }
    });
  }
});
