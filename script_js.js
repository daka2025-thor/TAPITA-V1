// Initialisation AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        delay: 0
    });
});

// Navigation responsive
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');

// Toggle menu mobile
hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Effet de scroll sur la navbar
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animation des éléments flottants dans le hero
function animateFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    
    elements.forEach((element, index) => {
        // Animation aléatoire pour chaque élément
        const randomDelay = Math.random() * 2000;
        const randomDuration = 3000 + Math.random() * 2000;
        
        setTimeout(() => {
            element.style.animation = `float ${randomDuration}ms ease-in-out infinite`;
        }, randomDelay);
    });
}

// Lancer l'animation des éléments flottants
animateFloatingElements();

// Effet parallaxe subtil
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Animation des cartes de culture au survol
document.querySelectorAll('.culture-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.card-icon');
        icon.style.transform = 'scale(1.2) rotate(10deg)';
        icon.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.card-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Animation des éléments de ressources
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animation spéciale pour les icônes de ressources
            if (entry.target.classList.contains('resource-item')) {
                const icon = entry.target.querySelector('.resource-icon');
                setTimeout(() => {
                    icon.style.animation = 'bounce 1s ease-in-out';
                }, 500);
            }
        }
    });
}, observerOptions);

// Observer tous les éléments animables
document.querySelectorAll('.resource-item, .tourism-card, .contact-item').forEach(el => {
    observer.observe(el);
});

// Animation de frappe pour le texte du hero
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Effet de compteur animé
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Gestion du formulaire de contact
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Animation de soumission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        submitBtn.style.background = '#ccc';
        
        // Simulation d'envoi (remplacer par votre logique d'envoi)
        setTimeout(() => {
            submitBtn.textContent = 'Message envoyé !';
            submitBtn.style.background = '#4CAF50';
            
            // Réinitialiser après 3 secondes
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                this.reset();
            }, 3000);
        }, 2000);
        
        // Animation de succès
        this.style.animation = 'pulse 0.5s ease-in-out';
    });
    
    // Validation en temps réel
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Supprimer les anciens messages d'erreur
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    field.classList.remove('error');
    
    // Validation selon le type de champ
    switch (field.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
            if (!isValid) {
                showError(field, 'Veuillez entrer une adresse email valide');
            }
            break;
        case 'text':
            isValid = value.length >= 2;
            if (!isValid) {
                showError(field, 'Ce champ doit contenir au moins 2 caractères');
            }
            break;
        default:
            isValid = value.length > 0;
            if (!isValid) {
                showError(field, 'Ce champ est obligatoire');
            }
    }
    
    return isValid;
}

function showError(field, message) {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '5px';
    field.parentNode.appendChild(errorDiv);
}

// Effet de particules pour le background du hero
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.position = 'absolute';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '1';
    
    hero.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = 'rgba(218, 165, 32, 0.6)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Animation aléatoire
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    
    particle.style.animation = `particleFloat ${duration}s ${delay}s infinite linear`;
    
    container.appendChild(particle);
}

// Ajouter l'animation CSS pour les particules
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
    }
    
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
        }
        40%, 43% {
            transform: translate3d(0, -15px, 0);
        }
        70% {
            transform: translate3d(0, -7px, 0);
        }
        90% {
            transform: translate3d(0, -2px, 0);
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialiser les particules
createParticles();

// Animation des liens sociaux
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1) rotate(10deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
});

// Effet de révélation au scroll pour les sections
const sections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    revealObserver.observe(section);
});

// Ajouter les styles pour l'effet de révélation
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    section {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease-out;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero {
        opacity: 1 !important;
        transform: none !important;
    }
`;
document.head.appendChild(revealStyle);

// Effet de machine à écrire pour les titres
function initTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        const speed = parseInt(element.dataset.speed) || 50;
        
        element.textContent = '';
        element.style.borderRight = '2px solid var(--primary-color)';
        element.style.animation = 'blink 1s infinite';
        
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.style.borderRight = 'none';
                element.style.animation = 'none';
            }
        }
        
        // Démarrer l'effet quand l'élément est visible
        const typeObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(type, 500);
                    typeObserver.unobserve(entry.target);
                }
            });
        });
        
        typeObserver.observe(element);
    });
}

// Ajouter l'animation de clignotement pour le curseur
const blinkStyle = document.createElement('style');
blinkStyle.textContent = `
    @keyframes blink {
        0%, 50% { border-color: var(--primary-color); }
        51%, 100% { border-color: transparent; }
    }
`;
document.head.appendChild(blinkStyle);

// Initialiser l'effet de machine à écrire
initTypewriterEffect();

// Effet de zoom sur les images au scroll
function initScrollZoom() {
    const zoomElements = document.querySelectorAll('.scroll-zoom');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        zoomElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + scrollTop;
            const elementHeight = element.offsetHeight;
            const windowHeight = window.innerHeight;
            
            const scrollPercent = (scrollTop - elementTop + windowHeight) / (windowHeight + elementHeight);
            const scale = 1 + (scrollPercent * 0.1);
            
            if (scrollPercent >= 0 && scrollPercent <= 1) {
                element.style.transform = `scale(${Math.max(1, Math.min(1.1, scale))})`;
            }
        });
    });
}

initScrollZoom();

// Gestion du thème et des préférences utilisateur
function initThemeToggle() {
    // Détecter la préférence système
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Appliquer le thème approprié si nécessaire
    if (prefersDark) {
        document.body.classList.add('dark-theme');
    }
}

initThemeToggle();

// Performance : Lazy loading pour les animations coûteuses
function initLazyAnimations() {
    const expensiveAnimations = document.querySelectorAll('.expensive-animation');
    
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-now');
                animationObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '50px' });
    
    expensiveAnimations.forEach(element => {
        animationObserver.observe(element);
    });
}

initLazyAnimations();

// Gestion des erreurs et fallbacks
window.addEventListener('error', function(e) {
    console.warn('Erreur détectée:', e.error);
    // Fallback gracieux pour les animations
    document.body.classList.add('reduce-motion');
});

// Console log pour le développement
console.log('🌍 Site Village Heritage initialisé avec succès!');
console.log('✨ Animations AOS activées');
console.log('🎨 Thème africain moderne appliqué');
console.log('📱 Design responsive actif');