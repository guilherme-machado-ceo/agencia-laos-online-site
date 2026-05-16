/* ============================================
   AGÊNCIA LAOS - RETRO SCRIPT
   Interações estilo anos 90-2000
   ============================================ */

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efeito de digitação no hero
const taglineElement = document.querySelector('.hero-tagline');
if (taglineElement) {
    const text = taglineElement.textContent;
    taglineElement.textContent = '';
    taglineElement.style.borderRight = '3px solid var(--bordeaux)';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            taglineElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            // Remove cursor after typing
            setTimeout(() => {
                taglineElement.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Start typing when page loads
    setTimeout(typeWriter, 500);
}

// Language selector functionality
const langButtons = document.querySelectorAll('.lang-btn');
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Here you would implement actual language switching
        console.log(`Language changed to: ${btn.textContent}`);
    });
});

// Window buttons interaction (decorative)
const windowBtns = document.querySelectorAll('.window-btn');
windowBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('close')) {
            // Simulate window close animation
            const windowBody = document.querySelector('.window-body');
            windowBody.style.opacity = '0';
            windowBody.style.transform = 'scale(0.9)';
            setTimeout(() => {
                windowBody.style.opacity = '1';
                windowBody.style.transform = 'scale(1)';
            }, 500);
        }
    });
});

// Form submission handler
const contactForm = document.querySelector('.retro-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('⚠️ Por favor, preencha todos os campos!');
            return;
        }
        
        // Simulate form submission (in production, send to backend)
        const submitBtn = document.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando... 💾';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('✅ Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Add hover sound effect simulation (visual feedback)
const interactiveElements = document.querySelectorAll('.btn-retro, .nav-link, .service-card, .team-card, .mvv-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        // Visual feedback only (sound would require user interaction first)
        el.style.transition = 'all 0.2s ease';
    });
});

// Parallax effect for floating icons
const floaters = document.querySelectorAll('.floater');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    floaters.forEach((floater, index) => {
        const speed = (index + 1) * 0.05;
        floater.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.02}deg)`;
    });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrolled >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 2s infinite';
        alert('🎮 EASTER EGG ACTIVATED! Retro mode unlocked!');
        
        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
});

// Console easter egg
console.log('%c🍎 AGÊNCIA LAOS - RETRO EDITION ', 'background: #722F37; color: #FFFFF0; font-size: 20px; padding: 10px;');
console.log('%cDesign inspirado na Apple dos anos 90-2000 ', 'color: #8B8680; font-size: 12px;');
console.log('%cPaleta: Manteiga Amarelo, Grafite, Bordeaux, Ivory ', 'color: #F4E5B3; background: #2C2C2C; font-size: 12px; padding: 5px;');

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.service-card, .team-card, .mvv-card, .about-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Stats counter animation
const statNumbers = document.querySelectorAll('.stat-number');
const animateStats = () => {
    statNumbers.forEach(stat => {
        const target = stat.textContent;
        const isNumber = /^[\d.]+$/.test(target.replace(/[+\s]/g, ''));
        
        if (isNumber) {
            const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
            const suffix = target.replace(/[\d.]/g, '');
            let current = 0;
            const increment = numericValue / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    current = numericValue;
                    clearInterval(timer);
                }
                stat.textContent = current.toFixed(0) + suffix;
            }, 30);
        }
    });
};

// Trigger stats animation when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Mobile menu toggle (if needed in future)
const createMobileMenu = () => {
    const nav = document.querySelector('.retro-nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '☰';
        menuToggle.style.cssText = `
            display: none;
            background: var(--bordeaux);
            color: var(--ivory);
            border: 2px solid var(--graphite);
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 1.5rem;
            cursor: pointer;
        `;
        
        navLinks.style.cssText = `
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--butter-yellow);
            flex-direction: column;
            padding: 20px;
            gap: 10px;
            border-bottom: 3px solid var(--graphite);
        `;
        
        menuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
        
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.style.display = 'flex';
                menuToggle.style.display = 'none';
            } else {
                navLinks.style.display = 'none';
                menuToggle.style.display = 'block';
            }
        });
        
        nav.querySelector('.nav-container').appendChild(menuToggle);
        
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
        }
    }
};

// Initialize mobile menu
createMobileMenu();

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
