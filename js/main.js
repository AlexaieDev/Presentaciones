/* =============================================
   LegalFlow AI - JavaScript Principal
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initAnimations();
    initKeyboardNav();
});

// Variables globales
let currentSlide = 0;
const totalSlides = 11;

// Navegacion entre slides
function initNavigation() {
    const navDots = document.querySelectorAll('.slide-nav-dot');
    const slides = document.querySelectorAll('.slide');

    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Detectar scroll para cambiar slide activo
    if (slides.length > 1) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const slideIndex = Array.from(slides).indexOf(entry.target);
                    updateActiveNav(slideIndex);
                }
            });
        }, { threshold: 0.5 });

        slides.forEach(slide => observer.observe(slide));
    }
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (slides[index]) {
        slides[index].scrollIntoView({ behavior: 'smooth' });
        currentSlide = index;
        updateActiveNav(index);
    }
}

function updateActiveNav(index) {
    const navDots = document.querySelectorAll('.slide-nav-dot');
    navDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
}

// Navegacion con teclado
function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                prevSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides - 1);
                break;
        }
    });
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
}

// Animaciones al entrar en viewport
function initAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));
}

// Contador animado para estadisticas
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = formatNumber(Math.floor(current));
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = formatNumber(target);
        }
    };

    updateCounter();
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
}

// Filtro de tabla
function filterTable(tier) {
    const rows = document.querySelectorAll('.flujos-table tbody tr');
    rows.forEach(row => {
        if (tier === 'all' || row.dataset.tier === tier) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });

    // Actualizar botones de filtro
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === tier);
    });
}

// Modo presentacion fullscreen
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Exportar funciones globales
window.goToSlide = goToSlide;
window.filterTable = filterTable;
window.toggleFullscreen = toggleFullscreen;
window.animateCounter = animateCounter;
