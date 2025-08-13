// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Simple validation
        const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
        const missingFields = requiredFields.filter(field => !formObject[field]);
        
        if (missingFields.length > 0) {
            alert('Please fill in all required fields: ' + missingFields.join(', '));
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formObject.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(formObject.phone)) {
            alert('Please enter a valid phone number.');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('.submit-btn');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            alert('Thank you for your inquiry! We\'ll be in touch soon to schedule your venue tour.');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
        
        // In a real application, you would send the data to your server here
        console.log('Form submission:', formObject);
    });
}

// Gallery lightbox functionality (simple modal)
const galleryItems = document.querySelectorAll('.gallery-item');
let currentImageIndex = 0;

// Create lightbox modal
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
    <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-image" src="" alt="">
        <div class="lightbox-caption">
            <h3></h3>
            <p></p>
        </div>
        <div class="lightbox-nav">
            <button class="lightbox-prev">&#8249;</button>
            <button class="lightbox-next">&#8250;</button>
        </div>
    </div>
`;
document.body.appendChild(lightbox);

// Add lightbox styles
const lightboxStyles = `
.lightbox {
    display: none;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    animation: fadeIn 0.3s ease;
}

.lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    margin: 2% auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 96%;
}

.lightbox-image {
    max-width: 100%;
    max-height: 80%;
    object-fit: contain;
    border-radius: 10px;
}

.lightbox-close {
    position: absolute;
    top: 20px;
    right: 30px;
    color: white;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    z-index: 10001;
}

.lightbox-close:hover {
    color: #d4af37;
}

.lightbox-caption {
    color: white;
    text-align: center;
    margin-top: 20px;
    max-width: 600px;
}

.lightbox-caption h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #d4af37;
}

.lightbox-caption p {
    font-size: 1rem;
    opacity: 0.9;
}

.lightbox-nav {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    transform: translateY(-50%);
}

.lightbox-prev,
.lightbox-next {
    background: rgba(212, 175, 55, 0.8);
    color: #333;
    border: none;
    padding: 15px 20px;
    font-size: 24px;
    cursor: pointer;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.lightbox-prev:hover,
.lightbox-next:hover {
    background: rgba(212, 175, 55, 1);
    transform: scale(1.1);
}

@media (max-width: 768px) {
    .lightbox-content {
        margin: 5% auto;
        height: 90%;
    }
    
    .lightbox-image {
        max-height: 70%;
    }
    
    .lightbox-close {
        top: 10px;
        right: 20px;
        font-size: 30px;
    }
    
    .lightbox-nav {
        padding: 0 10px;
    }
    
    .lightbox-prev,
    .lightbox-next {
        width: 50px;
        height: 50px;
        font-size: 20px;
    }
}
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = lightboxStyles;
document.head.appendChild(styleSheet);

// Gallery item click handlers
const galleryImages = Array.from(galleryItems).map(item => {
    const img = item.querySelector('img');
    const overlay = item.querySelector('.gallery-overlay');
    return {
        src: img.src,
        alt: img.alt,
        title: overlay ? overlay.querySelector('h3').textContent : '',
        caption: overlay ? overlay.querySelector('p').textContent : ''
    };
});

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        showLightbox();
    });
});

// Lightbox functions
function showLightbox() {
    const image = lightbox.querySelector('.lightbox-image');
    const caption = lightbox.querySelector('.lightbox-caption');
    const currentImage = galleryImages[currentImageIndex];
    
    image.src = currentImage.src;
    image.alt = currentImage.alt;
    caption.querySelector('h3').textContent = currentImage.title;
    caption.querySelector('p').textContent = currentImage.caption;
    
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function hideLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    showLightbox();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    showLightbox();
}

// Lightbox event listeners
lightbox.querySelector('.lightbox-close').addEventListener('click', hideLightbox);
lightbox.querySelector('.lightbox-next').addEventListener('click', nextImage);
lightbox.querySelector('.lightbox-prev').addEventListener('click', prevImage);

// Close lightbox on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        hideLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
        switch(e.key) {
            case 'Escape':
                hideLightbox();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
        }
    }
});

// Animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.package-card, .testimonial-card, .landmark, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Phone number click tracking (for analytics)
document.querySelectorAll('a[href^="tel:"]').forEach(tel => {
    tel.addEventListener('click', () => {
        console.log('Phone click tracked:', tel.href);
        // Add your analytics code here
    });
});

// Auto-hide navbar on mobile when scrolling down
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (window.innerWidth <= 768) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Loading screen (optional - uncomment if you want a loading screen)
/*
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">
                <h2>Harmony Hall</h2>
                <span>Loading...</span>
            </div>
            <div class="loader-spinner"></div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);
});
*/

// Console welcome message
console.log(`
🎉 Welcome to Harmony Hall Wedding Venue!
📍 Serving Nashville, Franklin, Brentwood & Surrounding Areas
📞 Call us at (615) 234-7890
💌 Email: info@harmonyhallnashville.com

This is a sample wedding venue website created as a test project.
All images are from Unsplash and contact information is fictional.
`);

// Service Worker registration (for PWA capabilities - optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to register service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(registrationError => console.log('SW registration failed'));
    });
}
