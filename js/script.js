// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Change hamburger icon
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Show More Projects Functionality
const toggleButton = document.getElementById('toggle-projects');
const projectCards = document.querySelectorAll('.project-card');
const viewToggleSection = document.getElementById('view-toggle');

if (toggleButton && projectCards.length > 0) {
    let showingAll = false;
    
    toggleButton.addEventListener('click', () => {
        // Get all hidden projects (projects 4+)
        const hiddenProjects = Array.from(projectCards).slice(3);
        
        if (!showingAll) {
            // Show hidden projects
            hiddenProjects.forEach(project => {
                project.classList.add('show');
            });
            
            // Change button text and icon
            toggleButton.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less Projects';
            showingAll = true;
            
            // Scroll to show new projects if needed
            setTimeout(() => {
                hiddenProjects[0].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 300);
        } else {
            // Hide extra projects
            hiddenProjects.forEach(project => {
                project.classList.remove('show');
            });
            
            // Change button text and icon
            toggleButton.innerHTML = '<i class="fas fa-chevron-down"></i> Show More Projects';
            showingAll = false;
            
            // Scroll back to toggle button
            viewToggleSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinksList.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active class to CSS for nav links
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--primary-color) !important;
        font-weight: 600;
    }
    
    .fade-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
`;
document.head.appendChild(style);

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.loading = 'lazy';
    });
}

// Add loading animation for buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-resume').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Only add loading if it's not a download link
        if (!this.hasAttribute('download') && !this.hasAttribute('target')) {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.style.pointerEvents = 'none';
            
            // Reset after 2 seconds (in case navigation fails)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
            }, 2000);
        }
    });
});

// Smooth page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loaded class to CSS
const loadedStyle = document.createElement('style');
loadedStyle.textContent = `
    body.loaded * {
        animation: none !important;
    }
    
    .loading {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    body.loaded .loading {
        opacity: 1;
    }
`;
document.head.appendChild(loadedStyle);

// Project card hover enhancements
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
        card.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
    });
});