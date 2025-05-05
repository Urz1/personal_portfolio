const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('header');
const themeIcon = document.querySelector('#theme-icon');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const typingTextElement = document.querySelector('.typing-text');
const skillBars = document.querySelectorAll('.bar span');
const contactForm = document.querySelector('#contact-form');

const texts = ['ML Student', 'Data Scientist', 'Web Developer', 'Python Developer'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;
let erasingDelay = 100;
let newTextDelay = 2000;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = erasingDelay;
    } else {
        // Add a character
        typingTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 200;
    }
    
    // If word is complete
    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end of word
        typingDelay = newTextDelay;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Move to next word
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingDelay = 500;
    }
    
    setTimeout(typeText, typingDelay);
}

setTimeout(typeText, 1000);

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

themeIcon.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        themeIcon.classList.replace('bx-moon', 'bx-sun');
    } else {
        themeIcon.classList.replace('bx-sun', 'bx-moon');
    }
});

window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 100);
    
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
            
            if (id === 'resume') {
                animateSkillBars();
            }
        }
    });
});

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.parentElement.previousElementSibling.querySelector('span').textContent;
        bar.style.width = width;
    });
}

const scrollReveal = () => {
    const revealElements = document.querySelectorAll('.services-box, .resume-content, .portfolio-box, .contact-card');
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('show');
        } else {
            element.classList.remove('show');
        }
    });
};

document.head.insertAdjacentHTML('beforeend', `
    <style>
        .services-box, .resume-content, .portfolio-box, .contact-card {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .services-box.show, .resume-content.show, .portfolio-box.show, .contact-card.show {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
`);

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const subject = document.querySelector('#subject').value;
    const message = document.querySelector('#message').value;
    
    alert(`Thank you ${name} for your message! I'll get back to you soon.`);
    
    contactForm.reset();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('load', () => {
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Run scroll reveal once initially
    scrollReveal();
});

// Adding scroll event for reveal animations
window.addEventListener('scroll', scrollReveal);