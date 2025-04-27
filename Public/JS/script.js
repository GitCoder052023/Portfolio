const currentHost = window.location.hostname;
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations and UI elements
    initScrollAnimations();
    initSkillAnimations();
    calculateAge();
    checkEidSectionVisibility();
    initTypewriterEffect();
});

function initSkillAnimations() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    const expertiseGroups = document.querySelectorAll('.expertise-group');
    expertiseGroups.forEach((group, index) => {
        group.style.animationDelay = `${index * 0.1}s`;
    });
}

function calculateAge() {
    const birthDate = new Date('2009-06-19');
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    const ageElement = document.getElementById('dynamic-age');
    if (ageElement) {
        ageElement.textContent = `${age} Years`;
    }
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const animateOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                const animationType = element.dataset.animation || 'fade-in';
                element.classList.add('animated', animationType);
            }
        });
    };
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
}

function checkEidSectionVisibility() {
    const today = new Date();
    const removalDate = new Date('2025-04-10');
    
    const eidSection = document.getElementById('eid-special');
    if (eidSection && today > removalDate) {
        eidSection.style.display = 'none';
    }
}

function initTypewriterEffect() {
    const h1 = document.querySelector('#hero h1');
    if (!h1) return;
    
    h1.innerHTML = '';

    const text1 = document.createTextNode(''); 
    const span = document.createElement('span');
    span.className = 'gradient-text';
    const text2 = document.createTextNode(''); 
    span.appendChild(text2);

    const cursor = document.createElement('span');
    cursor.className = 'cursor';

    h1.appendChild(text1);
    h1.appendChild(span);
    h1.appendChild(cursor);

    const beforeSpan = "Hi, I'm ";
    const inSpan = "Hamdan Khubaib";
    let index = 0;

    const typeWriter = () => {
        if (index < beforeSpan.length) {
            text1.textContent += beforeSpan[index];
        } else if (index < beforeSpan.length + inSpan.length) {
            text2.textContent += inSpan[index - beforeSpan.length];
        }
        index++;

        if (index < beforeSpan.length + inSpan.length) {
            setTimeout(typeWriter, 250); 
        } else {
            cursor.remove();
        }
    };

    setTimeout(typeWriter, 1000);
}

// Security measures
document.addEventListener('contextmenu', e => e.preventDefault());

document.addEventListener('keydown', (e) => {
    if (
        (e.ctrlKey && e.key === 'c') ||
        (e.ctrlKey && e.key === 'x') ||
        (e.ctrlKey && e.key === 's') ||
        (e.ctrlKey && e.key === 'p') ||
        (e.ctrlKey && e.shiftKey && e.key === 'i') ||
        (e.ctrlKey && e.shiftKey && e.key === 'c') ||
        (e.ctrlKey && e.shiftKey && e.key === 'j') ||
        e.key === 'F12'
    ) {
        e.preventDefault();
        return false;
    }
});

document.addEventListener('dragstart', e => e.preventDefault());

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('mousedown', e => e.preventDefault());
});

document.addEventListener('copy', (e) => {
    if (!e.target.matches('input, textarea')) {
        e.preventDefault();
    }
});

document.addEventListener('cut', (e) => {
    if (!e.target.matches('input, textarea')) {
        e.preventDefault();
    }
});

document.addEventListener('paste', (e) => {
    if (!e.target.matches('input, textarea')) {
        e.preventDefault();
    }
});

// CV download functionality
async function downloadCV(event) {
    event.preventDefault();

    try {
        const response = await fetch(`https://hamdankhubaib.in/api/download-cv`, {
            method: 'GET',
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Hamdan_Khubaib_CV.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } else {
            throw new Error('Failed to download CV');
        }
    } catch (error) {
        console.error('Error downloading CV:', error);
        alert('Sorry, there was an error downloading the CV. Please try again later.');
    }
}

// Mobile menu functionality
menuToggle.addEventListener('click', () => {
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenu.classList.add('active');
        }, 10);
    } else {
        mobileMenu.classList.remove('active');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    }
});

const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    });
});

// Navbar shadow on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-md');
    } else {
        navbar.classList.remove('shadow-md');
    }
});

// Back to top button
const backToTopButton = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Progress bars animation
const progressBars = document.querySelectorAll('.progress-bar');
const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.transition = 'width 1.5s ease-in-out';
        bar.style.width = targetWidth;
    });
};

const skillsSection = document.getElementById('skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

if (skillsSection) {
    observer.observe(skillsSection);
}

// Contact form submission
const contactForm = document.getElementById('contactForm');
const formLoader = document.getElementById('formLoader');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const formDataObj = Object.fromEntries(formData.entries());

        formLoader.classList.remove('hidden'); 

        try {
            const response = await fetch(`https://hamdankhubaib.in/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObj)
            });

            const data = await response.json();

            if (response.ok) {
                contactForm.reset();
                window.location.href = '/contact-request-accepted';
            } else {
                throw new Error(data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Sorry, there was an error sending your message. Please try again later.');
        } finally {
            formLoader.classList.add('hidden'); 
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === '#') return; 
        
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Fix for mobile input focus
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        input.focus(); 
    });
});