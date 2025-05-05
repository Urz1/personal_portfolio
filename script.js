// DOM Elements
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('header');
const themeIcon = document.querySelector('#theme-icon');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const typingTextElement = document.querySelector('.typing-text');
const skillBars = document.querySelectorAll('.bar span');
const contactForm = document.querySelector('#contact-form');

// Typing text animation
const texts = ['ML Engineer', 'Data Scientist', 'AI Researcher', 'Python Developer'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;
let erasingDelay = 100;
let newTextDelay = 2000;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        // Remove a character
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

// Initialize typing animation after a brief delay
setTimeout(typeText, 1000);

// Toggle menu icon for mobile view
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// Toggle theme (dark/light mode)
themeIcon.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        themeIcon.classList.replace('bx-moon', 'bx-sun');
    } else {
        themeIcon.classList.replace('bx-sun', 'bx-moon');
    }
});

// Sticky header and active navigation links
window.addEventListener('scroll', () => {
    // Add sticky class to header when scrolling
    header.classList.toggle('sticky', window.scrollY > 100);
    
    // Remove toggle icon and navbar when clicking navbar links on mobile view
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
    
    // Activate corresponding nav link based on scroll position
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
            
            // Animate skill bars when in resume section
            if (id === 'resume') {
                animateSkillBars();
            }
        }
    });
});

// Animate skill bars
function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.parentElement.previousElementSibling.querySelector('span').textContent;
        bar.style.width = width;
    });
}

// Scroll reveal animation
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

// Add CSS class for scroll reveal animations
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

// Contact form submission with EmailJS
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const templateParams = {
        from_name: document.querySelector('#name').value,
        from_email: document.querySelector('#email').value,
        subject: document.querySelector('#subject').value,
        message: document.querySelector('#message').value,
        to_name: 'Sadam Husen'
    };

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    emailjs.send('service_ivc90r4', 'template_038elzt', templateParams)
        .then(() => {
            alert('Message sent successfully!');
            contactForm.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to send message. Please try again.');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});

// Smooth scrolling for navigation links
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

// Initialize scroll reveal and skill bar animations on load
window.addEventListener('load', () => {
    // Initial check for active section
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

// Add scroll event for reveal animations
window.addEventListener('scroll', scrollReveal);