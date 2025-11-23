// Navigation Scroll Effect
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile Navigation Toggle
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  // Animate hamburger icon
  const spans = navToggle.querySelectorAll("span");
  if (navMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    const spans = navToggle.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll(
  ".destination-card, .feature-card, .testimonial-card, .stat-card"
);
animatedElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// Contact Form Handling
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Here you would typically send the data to a server
  console.log("Form submitted:", data);

  // Show success message
  alert("¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.");

  // Reset form
  contactForm.reset();
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add hover effect to destination cards
const destinationCards = document.querySelectorAll(".destination-card");
destinationCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.zIndex = "10";
  });

  card.addEventListener("mouseleave", function () {
    this.style.zIndex = "1";
  });
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + (element.dataset.suffix || "");
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + (element.dataset.suffix || "");
    }
  }, 16);
};

// Observe stats for counter animation
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        const number = entry.target.querySelector(".stat-number");
        const text = number.textContent;
        const value = parseInt(text.replace(/\D/g, ""));
        const suffix = text.replace(/\d/g, "");
        number.dataset.suffix = suffix;
        number.textContent = "0" + suffix;
        animateCounter(number, value);
        entry.target.classList.add("counted");
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stat-card").forEach((card) => {
  statsObserver.observe(card);
});

// Add active state to navigation links based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"));
      if (navLink) navLink.classList.add("active");
    }
  });
});

// ============================================
// LANGUAGE TOGGLE FUNCTIONALITY
// ============================================

const translations = {
  es: {
    // Navigation
    "nav-home": "Inicio",
    "nav-destinations": "Destinos",
    "nav-about": "Nosotros",
    "nav-testimonials": "Testimonios",
    "nav-contact": "Contacto",
    
    // Hero Section
    "hero-title": "Nicaragua te sorprenderá",
    "hero-subtitle": "Los tours de aventura más increíbles, pueblos coloniales vibrantes y playas hermosas...",
    "hero-cta": "Explorar Destinos",
    
    // Welcome Section
    "welcome-title": "Bienvenido a Volcano Lovers",
    "welcome-text": "Somos apasionados por la aventura y queremos compartir contigo las maravillas de Nicaragua. Desde volcanes activos hasta playas paradisíacas, cada tour es una experiencia única diseñada para crear recuerdos inolvidables.",
    "stat-tours": "Tours Realizados",
    "stat-satisfaction": "Satisfacción",
    "stat-destinations": "Destinos",
    
    // Destinations Section
    "destinations-title": "Descubre Nuestros Destinos",
    "destinations-subtitle": "Aventuras únicas que te dejarán sin aliento",
    
    // Why Choose Us
    "why-title": "¿Por qué elegirnos?",
    "feature-1-title": "Tours Personalizados",
    "feature-1-desc": "Diseñamos cada experiencia según tus preferencias y necesidades específicas.",
    "feature-2-title": "Guías Expertos",
    "feature-2-desc": "Nuestros guías locales conocen cada rincón y te brindarán la mejor experiencia.",
    "feature-3-title": "Mejores Precios",
    "feature-3-desc": "Calidad premium a precios justos. Sin costos ocultos ni sorpresas.",
    "feature-4-title": "Seguridad Garantizada",
    "feature-4-desc": "Tu seguridad es nuestra prioridad. Equipos certificados y protocolos estrictos.",
    "feature-5-title": "Soporte 24/7",
    "feature-5-desc": "Estamos disponibles para ti en cualquier momento durante tu aventura.",
    "feature-6-title": "Turismo Sostenible",
    "feature-6-desc": "Comprometidos con el medio ambiente y las comunidades locales.",
    
    // Testimonials
    "testimonials-title": "¿Qué dicen nuestros clientes?",
    
    // Contact
    "contact-title": "Contáctanos",
    "contact-desc": "¿Listo para tu próxima aventura? Escríbenos y diseñaremos el tour perfecto para ti.",
    "contact-email": "Email",
    "contact-whatsapp": "WhatsApp",
    "contact-location": "Ubicación",
    "form-name": "Nombre",
    "form-email": "Email",
    "form-tour": "Tour de Interés",
    "form-message": "Mensaje",
    "form-submit": "Enviar Mensaje",
    "form-success": "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.",
    
    // Footer
    "footer-tagline": "Aventuras que te dejarán sin aliento",
    "footer-rights": "© 2025 Volcano Lovers. Todos los derechos reservados."
  },
  en: {
    // Navigation
    "nav-home": "Home",
    "nav-destinations": "Destinations",
    "nav-about": "About Us",
    "nav-testimonials": "Testimonials",
    "nav-contact": "Contact",
    
    // Hero Section
    "hero-title": "Nicaragua will amaze you",
    "hero-subtitle": "The most incredible adventure tours, vibrant colonial towns and beautiful beaches...",
    "hero-cta": "Explore Destinations",
    
    // Welcome Section
    "welcome-title": "Welcome to Volcano Lovers",
    "welcome-text": "We are passionate about adventure and want to share with you the wonders of Nicaragua. From active volcanoes to paradisiacal beaches, each tour is a unique experience designed to create unforgettable memories.",
    "stat-tours": "Tours Completed",
    "stat-satisfaction": "Satisfaction",
    "stat-destinations": "Destinations",
    
    // Destinations Section
    "destinations-title": "Discover Our Destinations",
    "destinations-subtitle": "Unique adventures that will take your breath away",
    
    // Why Choose Us
    "why-title": "Why choose us?",
    "feature-1-title": "Personalized Tours",
    "feature-1-desc": "We design each experience according to your specific preferences and needs.",
    "feature-2-title": "Expert Guides",
    "feature-2-desc": "Our local guides know every corner and will provide you with the best experience.",
    "feature-3-title": "Best Prices",
    "feature-3-desc": "Premium quality at fair prices. No hidden costs or surprises.",
    "feature-4-title": "Guaranteed Safety",
    "feature-4-desc": "Your safety is our priority. Certified equipment and strict protocols.",
    "feature-5-title": "24/7 Support",
    "feature-5-desc": "We are available for you at any time during your adventure.",
    "feature-6-title": "Sustainable Tourism",
    "feature-6-desc": "Committed to the environment and local communities.",
    
    // Testimonials
    "testimonials-title": "What do our clients say?",
    
    // Contact
    "contact-title": "Contact Us",
    "contact-desc": "Ready for your next adventure? Write to us and we'll design the perfect tour for you.",
    "contact-email": "Email",
    "contact-whatsapp": "WhatsApp",
    "contact-location": "Location",
    "form-name": "Name",
    "form-email": "Email",
    "form-tour": "Tour of Interest",
    "form-message": "Message",
    "form-submit": "Send Message",
    "form-success": "Thank you for your message! We will contact you soon.",
    
    // Footer
    "footer-tagline": "Adventures that will take your breath away",
    "footer-rights": "© 2025 Volcano Lovers. All rights reserved."
  }
};

let currentLang = localStorage.getItem('language') || 'es';

// Function to switch language
function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);
  
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  
  // Update language toggle button
  const langToggle = document.getElementById('langToggle');
  langToggle.textContent = lang.toUpperCase();
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Update form success message
  contactForm.dataset.successMessage = translations[lang]['form-success'];
}

// Language toggle button
const langToggle = document.getElementById('langToggle');
langToggle.addEventListener('click', () => {
  const newLang = currentLang === 'es' ? 'en' : 'es';
  switchLanguage(newLang);
});

// Initialize language on page load
switchLanguage(currentLang);

// Update form submit to use translated message
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  console.log('Form submitted:', data);
  
  const successMessage = translations[currentLang]['form-success'];
  alert(successMessage);
  contactForm.reset();
});

// ============================================
// DARK MODE FUNCTIONALITY
// ============================================

let darkMode = localStorage.getItem('darkMode') === 'true';

// Function to toggle dark mode
function toggleDarkMode() {
  darkMode = !darkMode;
  localStorage.setItem('darkMode', darkMode);
  
  if (darkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-mode');
    darkModeToggle.textContent = '🌙';
  }
}

// Dark mode toggle button
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', toggleDarkMode);

// Initialize dark mode on page load
if (darkMode) {
  document.body.classList.add('dark-mode');
  darkModeToggle.textContent = '☀️';
} else {
  darkModeToggle.textContent = '🌙';
}
