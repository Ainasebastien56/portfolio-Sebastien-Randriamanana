const form = document.querySelector('#contact-form'); 
const msg = document.getElementById('form-message');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('#nav-links');
const links = document.querySelectorAll('#nav-links a');
const aboutContent = document.querySelector('.about-content');
const sections = document.querySelectorAll('section, #about, #projects, #services, #contact');
const themeToggle = document.getElementById('theme-toggle');
const rootElement = document.documentElement;

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
}

links.forEach(link => {
    link.addEventListener('click', () => {
        links.forEach(l => l.classList.remove('active-link'));
        link.classList.add('active-link');
        navLinks.classList.remove('active');
        if (hamburger) {
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});

const aboutObserver = new IntersectionObserver((entries, observer) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
    }
}, {
    threshold: 0.3
});

if (aboutContent) {
    aboutObserver.observe(aboutContent);
}

// Active nav link on scroll
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (!id) return;
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${id}`) {
                    links.forEach(l => l.classList.remove('active-link'));
                    link.classList.add('active-link');
                }
            });
        }
    });
}, {
    threshold: 0.5
});

sections.forEach(section => {
    if (section.id) {
        sectionObserver.observe(section);
    }
});

// Theme toggle
function applyTheme(theme) {
    const isDark = theme === 'dark';
    rootElement.classList.toggle('dark', isDark);
    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-moon', !isDark);
            icon.classList.toggle('fa-sun', isDark);
        }
    }
}

const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'dark' || storedTheme === 'light') {
    applyTheme(storedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
} else {
    applyTheme('light');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = rootElement.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function sendMail(event) {
    if (event) {
        event.preventDefault();
    }

    const params = {
        name: document.querySelector('#name').value.trim(),
        email: document.querySelector('#email').value.trim(),
        subject: document.querySelector('#subject').value.trim(),
        message: document.querySelector('#message').value.trim(),
    };

    if (!params.name || !params.email || !params.subject || !params.message) {
        msg.style.display = 'block';
        msg.style.color = 'red';
        msg.textContent = '❌ Please fill in all the fields!';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(params.email)) {
        msg.style.display = 'block';
        msg.style.color = 'red';
        msg.textContent = '❌ Please enter a valid email address!';
        return;
    }

    const submitButton = form.querySelector('button[type="button"], button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
    }

    emailjs.send('service_akp5prd', 'template_glbzlqw', params)
        .then(() => {
            msg.style.display = 'block';
            msg.style.color = 'green';
            msg.textContent = '✅ Message Sent Successfully!';
            form.reset();
        })
        .catch((error) => {
            msg.style.display = 'block';
            msg.style.color = 'red';
            msg.textContent = '❌ An error occurred. Please try again.';
            console.error(error);
        })
        .finally(() => {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
            setTimeout(() => {
                msg.style.display = 'none';
            }, 5000);
        });
}

if (form) {
    form.addEventListener('submit', sendMail);
}