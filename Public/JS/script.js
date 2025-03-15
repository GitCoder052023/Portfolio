AOS.init({
    once: true
});

const currentHost = window.location.hostname;

const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

document.addEventListener('DOMContentLoaded', () => {
    const h1 = document.querySelector('#hero h1');
    if (h1) {
        h1.innerHTML = '';

        const text1 = document.createTextNode(''); 
        const span = document.createElement('span');
        span.className = 'gradient-text';
        const text2 = document.createTextNode(''); 
        span.appendChild(text2);

        const cursor = document.createElement('span');
        cursor.className = 'cursor';

        // Append elements to h1
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
});

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

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

document.addEventListener('dragstart', (e) => {
    e.preventDefault();
});

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('mousedown', (e) => {
        e.preventDefault();
    });
});

document.addEventListener('mouseup', () => {
    if (window.getSelection) {
        if (window.getSelection().empty) {
            window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {
            window.getSelection().removeAllRanges();
        }
    }
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

async function downloadCV(event) {
    event.preventDefault();

    try {
        const response = await fetch(`http://${currentHost}:5000/api/download-cv`, {
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

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-md');
    } else {
        navbar.classList.remove('shadow-md');
    }
});

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

const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.width = '15px';
    cursor.style.height = '15px';
});

document.addEventListener('mouseup', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
});

const links = document.querySelectorAll('a, button');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.backgroundColor = 'rgba(37, 99, 235, 0.2)';
    });

    link.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'rgba(37, 99, 235, 0.3)';
    });
});

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

observer.observe(skillsSection);

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const formDataObj = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`http://${currentHost}:5000/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObj)
        });

        const data = await response.json();

        if (response.ok) {
            contactForm.reset();
            alert('Thank you for your message! Please check your email for confirmation.');
        } else {
            throw new Error(data.message || 'Something went wrong');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Sorry, there was an error sending your message. Please try again later.');
    }
});

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