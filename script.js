// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth Scroll for Navigation Links
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

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 46, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Animated Counter for Stats
const statNumbers = document.querySelectorAll('.stat-number');
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
};

// Intersection Observer for Stats Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// Testimonial Slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

const showTestimonial = (index) => {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        dots[i].classList.remove('active');
        if (i === index) {
            card.classList.add('active');
            dots[i].classList.add('active');
        }
    });
};

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-advance testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Scroll Animation for Elements
const fadeElements = document.querySelectorAll('.service-card, .pricing-card, .stat-card, .about-content');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in', 'visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    element.classList.add('fade-in');
    fadeObserver.observe(element);
});

// 3D Card Tilt Effect
const cards = document.querySelectorAll('.service-card, .pricing-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        // Check if hovering over a button inside the card
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            return; // Don't apply tilt effect when hovering over buttons
        }
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && phone && message) {
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Newsletter Form Handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        if (email) {
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        }
    });
}

// Button Click Effects
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .join-btn, .learn-more-btn, .submit-btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax Effect for Hero Section
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroContent = document.querySelector('.hero-content');
            const hero3D = document.querySelector('.hero-3d-element');
            
            if (heroContent && hero3D) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                hero3D.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Interactive 3D Cube Mouse Movement
const cube = document.querySelector('.cube');
if (cube) {
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        cube.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
}

// Service Card Click Handler - Opens Service Detail Modal
const serviceBtns = document.querySelectorAll('.service-btn');
const serviceModal = document.getElementById('serviceModal');
const serviceModalBody = document.getElementById('serviceModalBody');
const closeServiceModal = document.querySelector('.close-service-modal');

// Service data
const serviceData = {
    strength: {
        icon: '💪',
        title: 'Strength Training',
        description: 'Build muscle and increase strength with our premium weight training equipment and expert guidance. Our strength training area features Olympic weights, squat racks, bench presses, and a full range of dumbbells and machines.',
        features: [
            'Olympic weightlifting platforms',
            'Squat racks and power cages',
            'Bench press stations',
            'Dumbbells up to 150lbs',
            'Cable machines and functional trainers',
            'Expert personal trainers available'
        ],
        schedule: [
            { day: 'Monday', time: '6AM - 10PM' },
            { day: 'Wednesday', time: '6AM - 10PM' },
            { day: 'Friday', time: '6AM - 10PM' }
        ]
    },
    yoga: {
        icon: '🧘',
        title: 'Yoga & Pilates',
        description: 'Improve flexibility, balance, and mindfulness through our diverse yoga and pilates classes. From beginner to advanced levels, our certified instructors guide you through poses and movements that enhance both body and mind.',
        features: [
            'Hatha and Vinyasa yoga',
            'Pilates mat and reformer classes',
            'Meditation sessions',
            'Aerial yoga available',
            'Hot yoga studio',
            'Yoga props and equipment provided'
        ],
        schedule: [
            { day: 'Tuesday', time: '7AM - 8PM' },
            { day: 'Thursday', time: '7AM - 8PM' },
            { day: 'Saturday', time: '9AM - 12PM' }
        ]
    },
    cardio: {
        icon: '🏃',
        title: 'Cardio & HIIT',
        description: 'Burn calories and boost endurance with high-intensity interval training and cardio sessions. Our cardio zone features the latest treadmills, ellipticals, rowing machines, and stationary bikes with interactive screens.',
        features: [
            'State-of-the-art treadmills',
            'Elliptical machines',
            'Rowing machines',
            'Spin bikes with resistance control',
            'HIIT group classes',
            'Heart rate monitoring technology'
        ],
        schedule: [
            { day: 'Daily', time: '6AM - 10PM' },
            { day: 'HIIT Classes', time: 'Mon/Wed/Fri 6PM' },
            { day: 'Spin Classes', time: 'Tue/Thu 7AM' }
        ]
    },
    boxing: {
        icon: '🥊',
        title: 'Boxing & MMA',
        description: 'Learn self-defense while getting an incredible full-body workout with our boxing programs. Our boxing area features heavy bags, speed bags, a ring, and experienced instructors who teach proper technique.',
        features: [
            'Professional boxing ring',
            'Heavy and speed bags',
            'MMA training area',
            'Self-defense classes',
            'Sparring sessions',
            'Professional boxing instructors'
        ],
        schedule: [
            { day: 'Monday', time: '5PM - 9PM' },
            { day: 'Wednesday', time: '5PM - 9PM' },
            { day: 'Saturday', time: '10AM - 2PM' }
        ]
    },
    swimming: {
        icon: '🏊',
        title: 'Swimming Pool',
        description: 'Enjoy our heated swimming pool for low-impact exercise and relaxation after workouts. Our Olympic-sized pool is maintained at the perfect temperature and offers lap swimming, water aerobics, and free swim times.',
        features: [
            'Olympic-sized heated pool',
            'Lap swimming lanes',
            'Water aerobics classes',
            'Swim lessons available',
            'Poolside relaxation area',
            'Locker rooms with showers'
        ],
        schedule: [
            { day: 'Lap Swim', time: '6AM - 8PM' },
            { day: 'Water Aerobics', time: 'Mon/Wed/Fri 10AM' },
            { day: 'Open Swim', time: 'Weekends 12PM - 6PM' }
        ]
    },
    personal: {
        icon: '👨‍👩‍👧',
        title: 'Personal Training',
        description: 'Get one-on-one attention with customized workout plans tailored to your specific goals. Our certified personal trainers create personalized programs, provide nutritional guidance, and keep you motivated throughout your fitness journey.',
        features: [
            'Customized workout plans',
            'One-on-one training sessions',
            'Nutritional guidance',
            'Progress tracking',
            'Flexible scheduling',
            'Certified and experienced trainers'
        ],
        schedule: [
            { day: 'By Appointment', time: '6AM - 10PM' },
            { day: 'Package Sessions', time: '30/60/90 mins' },
            { day: 'Small Groups', time: 'Available upon request' }
        ]
    }
};

// Function to populate service modal
function showServiceDetails(serviceKey) {
    const service = serviceData[serviceKey];
    if (!service) return;

    let featuresHTML = service.features.map(feature => `<li>${feature}</li>`).join('');
    let scheduleHTML = service.schedule.map(item => `
        <div class="schedule-item">
            <h4>${item.day}</h4>
            <p>${item.time}</p>
        </div>
    `).join('');

    serviceModalBody.innerHTML = `
        <div class="service-detail-header">
            <div class="service-detail-icon">${service.icon}</div>
            <h2 class="service-detail-title">${service.title}</h2>
            <p class="service-detail-description">${service.description}</p>
        </div>
        <div class="service-detail-features">
            <h3>What's Included</h3>
            <ul class="feature-list-detail">
                ${featuresHTML}
            </ul>
        </div>
        <div class="service-detail-schedule">
            <h3>Class Schedule</h3>
            <div class="schedule-grid">
                ${scheduleHTML}
            </div>
        </div>
        <div class="service-detail-cta">
            <button class="book-session-btn">Book a Session</button>
        </div>
    `;

    serviceModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Add click handlers to service buttons
serviceBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const serviceKey = e.target.getAttribute('data-service');
        showServiceDetails(serviceKey);
    });
});

// Close service modal handlers
if (closeServiceModal && serviceModal) {
    closeServiceModal.addEventListener('click', () => {
        serviceModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (serviceModal) {
    serviceModal.addEventListener('click', (e) => {
        if (e.target === serviceModal) {
            serviceModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close service modal if open
        if (serviceModal && serviceModal.classList.contains('active')) {
            serviceModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        // Close payment modal if open
        if (paymentModal && paymentModal.classList.contains('active')) {
            paymentModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        // Close equipment modal if open
        if (equipmentModal && equipmentModal.classList.contains('active')) {
            equipmentModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// Add event handler for book session button (delegated event)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('book-session-btn')) {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        if (serviceModal) {
            serviceModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// Pricing Card Click Handler - Opens Payment Form
const pricingBtns = document.querySelectorAll('.pricing-btn');
const paymentModal = document.getElementById('paymentModal');
const closePaymentModal = document.querySelector('.close-payment-modal');
const paymentForm = document.getElementById('paymentForm');

// Function to open payment modal with selected plan
function openPaymentModal(planName, planPrice) {
    // Update modal with selected plan details
    document.getElementById('selectedPlanName').textContent = planName.charAt(0).toUpperCase() + planName.slice(1);
    document.getElementById('selectedPlanPrice').textContent = `$${planPrice}/month`;
    document.getElementById('summaryPrice').textContent = `$${planPrice}.00`;
    document.getElementById('totalDue').textContent = `$${planPrice}.00`;
    
    // Show modal
    paymentModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Add click handlers to pricing buttons
pricingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const planName = e.target.getAttribute('data-plan');
        const planPrice = e.target.getAttribute('data-price');
        openPaymentModal(planName, planPrice);
    });
});

// Close payment modal handlers
if (closePaymentModal && paymentModal) {
    closePaymentModal.addEventListener('click', () => {
        paymentModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (paymentModal) {
    paymentModal.addEventListener('click', (e) => {
        if (e.target === paymentModal) {
            paymentModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Payment form submission
if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = paymentForm.querySelector('.submit-payment-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';
        
        // Simulate payment processing
        setTimeout(() => {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            
            // Show success message
            alert('Payment successful! Welcome to FitZone Pro. Check your email for membership details.');
            
            // Close modal and reset form
            paymentModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            paymentForm.reset();
        }, 2000);
    });
}

// Card number formatting
const cardNumberInput = document.getElementById('cardNumber');
if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });
}

// Expiry date formatting
const expiryDateInput = document.getElementById('expiryDate');
if (expiryDateInput) {
    expiryDateInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        e.target.value = value;
    });
}

// Join Button Handler
const joinBtn = document.querySelector('.join-btn');
if (joinBtn) {
    joinBtn.addEventListener('click', () => {
        document.querySelector('#pricing').scrollIntoView({ behavior: 'smooth' });
    });
}

// Virtual Tour Button Handler
const virtualTourBtn = document.querySelector('.btn-secondary');
if (virtualTourBtn) {
    virtualTourBtn.addEventListener('click', () => {
        alert('Virtual tour coming soon! Contact us to schedule an in-person visit.');
    });
}

// Learn More Button Handler - Opens Equipment Modal
const learnMoreBtn = document.querySelector('.learn-more-btn');
const equipmentModal = document.getElementById('equipmentModal');
const closeModal = document.querySelector('.close-modal');

if (learnMoreBtn && equipmentModal) {
    learnMoreBtn.addEventListener('click', () => {
        equipmentModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
}

// Close Modal Handler
if (closeModal && equipmentModal) {
    closeModal.addEventListener('click', () => {
        equipmentModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
}

// Close modal when clicking outside content
if (equipmentModal) {
    equipmentModal.addEventListener('click', (e) => {
        if (e.target === equipmentModal) {
            equipmentModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && equipmentModal && equipmentModal.classList.contains('active')) {
        equipmentModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Throttle scroll events (already implemented in parallax effect)

// Console welcome message
console.log('%c Welcome to FitZone Pro! ', 'background: #ff6b35; color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Built with ❤️ using HTML, CSS, and JavaScript ', 'color: #004e89; font-size: 14px;');
