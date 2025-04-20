// User data storage
let userData = {
    firstName: '',
    lastName: '',
    email: '',
    emergencyContact: '',
    healthConcerns: ''
};

// Visit counter
let visitCount = localStorage.getItem('visitCount') || 0;
visitCount++;
localStorage.setItem('visitCount', visitCount);
document.getElementById('activeUsers').textContent = visitCount;

// Loading Animation
window.addEventListener('load', function() {
    // Simulate loading
    setTimeout(function() {
        document.querySelector('.loading-overlay').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-overlay').style.display = 'none';
        }, 500);
    }, 1000);
});

// Show welcome page initially
document.getElementById('welcome-page').style.display = 'block';
document.getElementById('auth-page').style.display = 'none';
document.getElementById('main-content').style.display = 'none';
document.getElementById('apps-page').style.display = 'none';
document.getElementById('faq-page').style.display = 'none';
document.getElementById('privacy-page').style.display = 'none';
document.getElementById('terms-page').style.display = 'none';

// Feature details content
const featureDetails = {
    safety: {
        title: "Safety Features",
        content: `
            <h4>Emergency SOS</h4>
            <p>Our emergency SOS feature allows you to instantly alert your trusted contacts with your live location with just one tap or voice command. When activated:</p>
            <ul>
                <li>Your contacts receive an immediate alert with your exact location</li>
                <li>The app continues to share your location in real-time</li>
                <li>Works even when your phone is locked or in your pocket</li>
                <li>Optional connection to local emergency services where available</li>
            </ul>
            
            <h4 class="mt-4">Safe Route Planning</h4>
            <p>Our AI-powered route planning analyzes:</p>
            <ul>
                <li>Time of day and lighting conditions</li>
                <li>Crime statistics and incident reports</li>
                <li>User-reported safety concerns</li>
                <li>Public transportation availability</li>
            </ul>
            <p>You'll receive real-time alerts if conditions change along your route.</p>
            
            <h4 class="mt-4">Discreet Alert Mode</h4>
            <p>For situations where you feel unsafe but don't want to draw attention:</p>
            <ul>
                <li>Silent activation of emergency features</li>
                <li>Discreet recording of audio/video evidence</li>
                <li>Automatic notification if phone is taken from you</li>
            </ul>
        `
    },
    wellness: {
        title: "Wellness Features",
        content: `
            <h4>Health Tracking</h4>
            <p>Comprehensive tracking for all aspects of women's health:</p>
            <ul>
                <li>Menstrual cycle tracking with predictions</li>
                <li>Pregnancy and fertility tracking</li>
                <li>Symptom logging with pattern recognition</li>
                <li>Medication and appointment reminders</li>
            </ul>
            
            <h4 class="mt-4">Mental Wellbeing</h4>
            <p>Tools to support your emotional and mental health:</p>
            <ul>
                <li>Guided meditations for stress and anxiety</li>
                <li>Mood tracking with personalized insights</li>
                <li>Journaling prompts for self-reflection</li>
                <li>Breathing exercises for quick relaxation</li>
            </ul>
            
            <h4 class="mt-4">Community Support</h4>
            <p>Connect with other women for support and advice:</p>
            <ul>
                <li>Anonymous discussion forums</li>
                <li>Expert-led support groups</li>
                <li>Peer mentoring programs</li>
                <li>Local meetup organization</li>
            </ul>
        `
    },
    career: {
        title: "Career Growth Features",
        content: `
            <h4>Professional Development</h4>
            <p>Resources to help you advance in your career:</p>
            <ul>
                <li>Salary negotiation tools with industry benchmarks</li>
                <li>Resume and cover letter builders</li>
                <li>Interview preparation guides</li>
                <li>Career path planning tools</li>
            </ul>
            
            <h4 class="mt-4">Mentorship Network</h4>
            <p>Connect with experienced professionals:</p>
            <ul>
                <li>Matching with mentors in your field</li>
                <li>Structured mentorship programs</li>
                <li>Peer networking opportunities</li>
                <li>Leadership development courses</li>
            </ul>
            
            <h4 class="mt-4">Workplace Safety</h4>
            <p>Tools to address workplace challenges:</p>
            <ul>
                <li>Documentation tools for incidents</li>
                <li>Legal rights information</li>
                <li>Reporting guidance</li>
                <li>Harassment prevention resources</li>
            </ul>
        `
    }
};

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Welcome page buttons
document.getElementById('welcome-login-btn').addEventListener('click', function(e) {
    e.preventDefault();
    showAuthPage();
    showLoginForm();
});

document.getElementById('welcome-register-btn').addEventListener('click', function(e) {
    e.preventDefault();
    showAuthPage();
    showRegisterForm();
});

document.getElementById('welcome-get-started').addEventListener('click', function(e) {
    e.preventDefault();
    showAuthPage();
    showRegisterForm();
});

document.getElementById('welcome-join-now').addEventListener('click', function(e) {
    e.preventDefault();
    showAuthPage();
    showRegisterForm();
});

// Toggle between login and register forms
document.getElementById('show-register').addEventListener('click', function(e) {
    e.preventDefault();
    showRegisterForm();
});

document.getElementById('show-login').addEventListener('click', function(e) {
    e.preventDefault();
    showLoginForm();
});

// Forgot password functionality
document.getElementById('forgotPassword').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('forgot-password-form').style.display = 'block';
    document.getElementById('auth-form-title').textContent = 'Reset Password';
    document.getElementById('auth-form-subtitle').textContent = 'Enter your email to receive a password reset link';
});

document.getElementById('show-login-from-forgot').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('forgot-password-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('auth-form-title').textContent = 'Welcome to Herverse';
    document.getElementById('auth-form-subtitle').textContent = 'Your complete women\'s wellness and safety platform';
});

// Login button click
document.getElementById('login-btn').addEventListener('click', function(e) {
    e.preventDefault();
    // Simple validation
    const email = document.querySelector('#login-form input[type="email"]').value;
    const password = document.querySelector('#login-form input[type="password"]').value;
    
    if (email && password) {
        // Show loading
        document.querySelector('.loading-overlay').style.display = 'flex';
        document.querySelector('.loading-overlay').style.opacity = '1';
        
        // Create form data
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        
        // Send login request
        fetch('login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Store user data
                userData.firstName = data.user.first_name;
                userData.lastName = data.user.last_name;
                userData.email = data.user.email;
                
                // Set logged in state
                localStorage.setItem('isLoggedIn', 'true');
                
                // Hide auth page and show main content
                document.getElementById('auth-page').style.display = 'none';
                document.getElementById('welcome-page').style.display = 'none';
                document.getElementById('main-content').style.display = 'block';
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                
                // Show welcome toast
                showToast(data.message, 'success');
            } else {
                showToast(data.message, 'error');
            }
        })
        .catch(error => {
            showToast('Login failed: ' + error.message, 'error');
        })
        .finally(() => {
            // Hide loading
            document.querySelector('.loading-overlay').style.opacity = '0';
            setTimeout(function() {
                document.querySelector('.loading-overlay').style.display = 'none';
            }, 500);
        });
    } else {
        showToast('Please enter both email and password', 'error');
    }
});

// Register button click
document.getElementById('register-btn').addEventListener('click', function(e) {
    e.preventDefault();
    // Simple validation
    const firstName = document.querySelector('#register-form input[placeholder="First Name"]').value;
    const lastName = document.querySelector('#register-form input[placeholder="Last Name"]').value;
    const email = document.querySelector('#register-form input[type="email"]').value;
    const password = document.querySelector('#register-form input[placeholder="Create Password"]').value;
    const confirmPassword = document.querySelector('#register-form input[placeholder="Confirm Password"]').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    if (!agreeTerms) {
        showToast('Please agree to the Terms & Conditions', 'error');
        return;
    }
    
    // Show loading
    document.querySelector('.loading-overlay').style.display = 'flex';
    document.querySelector('.loading-overlay').style.opacity = '1';
    
    // Create form data
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    
    // Send registration request
    fetch('register.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Store user data
            userData.firstName = firstName;
            userData.lastName = lastName;
            userData.email = email;
            
            // Set logged in state
            localStorage.setItem('isLoggedIn', 'true');
            
            // Hide auth page and show main content
            document.getElementById('auth-page').style.display = 'none';
            document.getElementById('welcome-page').style.display = 'none';
            document.getElementById('main-content').style.display = 'none';
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            
            // Show success message
            showToast(data.message, 'success');
            
            // Show questionnaire modal
            const questionnaireModal = new bootstrap.Modal(document.getElementById('questionnaireModal'));
            questionnaireModal.show();
        } else {
            showToast(data.message, 'error');
        }
    })
    .catch(error => {
        showToast('Registration failed: ' + error.message, 'error');
    })
    .finally(() => {
        // Hide loading
        document.querySelector('.loading-overlay').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-overlay').style.display = 'none';
        }, 500);
    });
});

// Submit questionnaire
document.getElementById('submitQuestionnaire').addEventListener('click', function() {
    const questionnaireModal = bootstrap.Modal.getInstance(document.getElementById('questionnaireModal'));
    questionnaireModal.hide();
    showToast('Thank you for answering our questions! We\'ll personalize your experience accordingly.', 'success');
    
    // Show main content after registration
    setTimeout(function() {
        showMainContent();
    }, 1000);
});

// Logout buttons
document.getElementById('logout-btn').addEventListener('click', function(e) {
    e.preventDefault();
    logoutUser();
});

document.getElementById('apps-logout-btn').addEventListener('click', function(e) {
    e.preventDefault();
    logoutUser();
});

document.getElementById('faq-logout-btn').addEventListener('click', function(e) {
    e.preventDefault();
    logoutUser();
});

document.getElementById('privacy-logout-btn').addEventListener('click', function(e) {
    e.preventDefault();
    logoutUser();
});

document.getElementById('terms-logout-btn').addEventListener('click', function(e) {
    e.preventDefault();
    logoutUser();
});

// Terms link in register form
document.getElementById('terms-link').addEventListener('click', function(e) {
    e.preventDefault();
    showTermsPage();
});

// Account links - show modal instead of section
document.getElementById('account-link').addEventListener('click', function(e) {
    e.preventDefault();
    showAccountModal();
});

document.getElementById('apps-account-link').addEventListener('click', function(e) {
    e.preventDefault();
    showAccountModal();
});

document.getElementById('faq-account-link').addEventListener('click', function(e) {
    e.preventDefault();
    showAccountModal();
});

document.getElementById('privacy-account-link').addEventListener('click', function(e) {
    e.preventDefault();
    showAccountModal();
});

document.getElementById('terms-account-link').addEventListener('click', function(e) {
    e.preventDefault();
    showAccountModal();
});

// Settings links - show modal instead of section
document.getElementById('settings-link').addEventListener('click', function(e) {
    e.preventDefault();
    showSettingsModal();
});

document.getElementById('apps-settings-link').addEventListener('click', function(e) {
    e.preventDefault();
    showSettingsModal();
});

document.getElementById('faq-settings-link').addEventListener('click', function(e) {
    e.preventDefault();
    showSettingsModal();
});

document.getElementById('privacy-settings-link').addEventListener('click', function(e) {
    e.preventDefault();
    showSettingsModal();
});

document.getElementById('terms-settings-link').addEventListener('click', function(e) {
    e.preventDefault();
    showSettingsModal();
});

// Edit account button in modal
document.getElementById('modal-edit-account-btn').addEventListener('click', function(e) {
    e.preventDefault();
    enableAccountModalEditing();
});

// Save account button in modal
document.getElementById('modal-save-account-btn').addEventListener('click', function(e) {
    e.preventDefault();
    saveAccountModalChanges();
});

// Change password button in modal
document.getElementById('modal-change-password-btn').addEventListener('click', function(e) {
    e.preventDefault();
    showToast('Password change link sent to your email', 'success');
});

// Save settings button in modal
document.getElementById('modal-save-settings-btn').addEventListener('click', function(e) {
    e.preventDefault();
    const theme = document.getElementById('modal-theme-select').value;
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else if (theme === 'light') {
        document.body.classList.remove('dark-mode');
    } else {
        // System default - you could implement prefers-color-scheme detection here
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
    
    showToast('Settings saved successfully', 'success');
    const settingsModal = bootstrap.Modal.getInstance(document.getElementById('settingsModal'));
    settingsModal.hide();
});

// Emergency button
document.getElementById('confirmEmergency').addEventListener('click', function() {
    if (!navigator.geolocation) {
        showToast('Geolocation is not supported by your browser', 'error');
        return;
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        // Check if user is logged in
        if (!isLoggedIn()) {
            showToast('Please log in to use this feature', 'error');
            return;
        }
        
        const formData = new FormData();
        formData.append('latitude', position.coords.latitude);
        formData.append('longitude', position.coords.longitude);

        fetch('emergency_alert.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showToast('Emergency alert sent successfully', 'success');
                const modal = bootstrap.Modal.getInstance(document.getElementById('emergencyModal'));
                modal.hide();
            } else {
                showToast(data.message, 'error');
            }
        })
        .catch(error => {
            showToast('Failed to send emergency alert', 'error');
        });
    }, function() {
        showToast('Unable to get your location', 'error');
    })
});

// Support message button
document.getElementById('sendSupportMessage').addEventListener('click', function() {
    const email = document.querySelector('#supportModal input[type="email"]').value;
    const subject = document.querySelector('#supportModal select').value;
    const message = document.querySelector('#supportModal textarea').value;

    // Show loading
    document.querySelector('.loading-overlay').style.display = 'flex';
    document.querySelector('.loading-overlay').style.opacity = '1';

    // Create form data
    const formData = new FormData();
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);

    // Send support ticket request
    fetch('submit_support.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showToast(data.message, 'success');
            const modal = bootstrap.Modal.getInstance(document.getElementById('supportModal'));
            modal.hide();
            // Clear form
            document.querySelector('#supportModal input[type="email"]').value = '';
            document.querySelector('#supportModal textarea').value = '';
        } else {
            showToast(data.message, 'error');
        }
    })
    .catch(error => {
        showToast('Failed to submit support ticket. Please try again later.', 'error');
    })
    .finally(() => {
        // Hide loading
        document.querySelector('.loading-overlay').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-overlay').style.display = 'none';
        }, 500);
    });
});

// Feature learn more buttons
document.querySelectorAll('.feature-learn-more').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const feature = this.getAttribute('data-feature');
        const details = featureDetails[feature];
        
        if (details) {
            document.getElementById('featureModalTitle').textContent = details.title;
            document.getElementById('featureModalBody').innerHTML = details.content;
            const featureModal = new bootstrap.Modal(document.getElementById('featureModal'));
            featureModal.show();
        }
    });
});

// Navigation links - Fixed Home button
document.querySelectorAll('[href="#home"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        if (isLoggedIn()) {
            showMainContent();
        } else {
            showAuthPage();
            showToast('Please log in to access the main content', 'warning');
        }
    });
});

// View Apps button in main content
document.getElementById('main-apps-link').addEventListener('click', function(e) {
    e.preventDefault();
    if (isLoggedIn()) {
        showAppsPage();
    } else {
        showAuthPage();
        showToast('Please log in to access the apps', 'warning');
    }
});

// Apps navigation in main nav - FIXED
document.getElementById('nav-apps-link').addEventListener('click', function(e) {
    e.preventDefault();
    if (isLoggedIn()) {
        showAppsPage();
    } else {
        showAuthPage();
        showToast('Please log in to access the apps', 'warning');
    }
});

// Footer Apps link in main content - FIXED
document.getElementById('footer-apps-link').addEventListener('click', function(e) {
    e.preventDefault();
    if (isLoggedIn()) {
        showAppsPage();
    } else {
        showAuthPage();
        showToast('Please log in to access the apps', 'warning');
    }
});

// FAQ links
document.querySelectorAll('[id*="faq-link"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        if (isLoggedIn()) {
            showFaqPage();
        } else {
            showAuthPage();
            showToast('Please log in to access the FAQs', 'warning');
        }
    });
});

// Terms links
document.querySelectorAll('[id*="terms-link"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        showTermsPage();
    });
});

// Privacy links
document.querySelectorAll('[id*="privacy-link"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        showPrivacyPage();
    });
});

// Apps page navigation links
document.getElementById('apps-home-link').addEventListener('click', function(e) {
    e.preventDefault();
    showMainContent();
});

document.getElementById('apps-features-link').addEventListener('click', function(e) {
    e.preventDefault();
    showMainContent();
    setTimeout(function() {
        document.querySelector('a[href="#features"]').click();
    }, 100);
});

document.getElementById('apps-faq-link').addEventListener('click', function(e) {
    e.preventDefault();
    showFaqPage();
});

// FAQ page navigation links
document.getElementById('faq-home-link').addEventListener('click', function(e) {
    e.preventDefault();
    showMainContent();
});

document.getElementById('faq-features-link').addEventListener('click', function(e) {
    e.preventDefault();
    showMainContent();
    setTimeout(function() {
        document.querySelector('a[href="#features"]').click();
    }, 100);
});

document.getElementById('faq-apps-link').addEventListener('click', function(e) {
    e.preventDefault();
    showAppsPage();
});

// Privacy page navigation links
document.getElementById('privacy-home-link').addEventListener('click', function(e) {
    e.preventDefault();
    showMainContent();
});

document.getElementById('privacy-features-link').addEventListener('click', function(e) {
    e.preventDefault();
    showMainContent();
    setTimeout(function() {
        document.querySelector('a[href="#features"]').click();
    }, 100);
});

document.getElementById('privacy-apps-link').addEventListener('click', function(e) {
    e.preventDefault();
    showAppsPage();
});

document.getElementById('privacy-faq-link').addEventListener('click', function(e) {
    e.preventDefault();
    showFaqPage();
});

// Terms page navigation links
document.getElementById('terms-home-link').addEventListener('click', function(e) {
    e.preventDefault();
    showMainContent();
});

document.getElementById('terms-features-link').addEventListener('click', function(e) {
    e.preventDefault();
    showMainContent();
    setTimeout(function() {
        document.querySelector('a[href="#features"]').click();
    }, 100);
});

document.getElementById('terms-apps-link').addEventListener('click', function(e) {
    e.preventDefault();
    showAppsPage();
});

document.getElementById('terms-faq-link').addEventListener('click', function(e) {
    e.preventDefault();
    showFaqPage();
});

// Footer links
document.getElementById('footer-faq-link').addEventListener('click', function(e) {
    e.preventDefault();
    if (!isLoggedIn()) {
        showToast('Please login to access this page', 'error');
        showAuthPage();
    } else {
        showFaqPage();
    }
});

document.getElementById('footer-privacy-link').addEventListener('click', function(e) {
    e.preventDefault();
    showPrivacyPage();
});

document.getElementById('footer-terms-link').addEventListener('click', function(e) {
    e.preventDefault();
    showTermsPage();
});

// Main content footer links
document.getElementById('footer-faq-link-main').addEventListener('click', function(e) {
    e.preventDefault();
    showFaqPage();
});

document.getElementById('footer-privacy-link-main').addEventListener('click', function(e) {
    e.preventDefault();
    showPrivacyPage();
});

document.getElementById('footer-terms-link-main').addEventListener('click', function(e) {
    e.preventDefault();
    showTermsPage();
});

// Apps page footer links
document.getElementById('apps-footer-faq-link').addEventListener('click', function(e) {
    e.preventDefault();
    showFaqPage();
});

document.getElementById('apps-footer-privacy-link').addEventListener('click', function(e) {
    e.preventDefault();
    showPrivacyPage();
});

document.getElementById('apps-footer-terms-link').addEventListener('click', function(e) {
    e.preventDefault();
    showTermsPage();
});

// FAQ page footer links
document.getElementById('faq-footer-privacy-link').addEventListener('click', function(e) {
    e.preventDefault();
    showPrivacyPage();
});

document.getElementById('faq-footer-terms-link').addEventListener('click', function(e) {
    e.preventDefault();
    showTermsPage();
});

// Privacy page footer links
document.getElementById('privacy-footer-terms-link').addEventListener('click', function(e) {
    e.preventDefault();
    showTermsPage();
});

// Terms page footer links
document.getElementById('terms-footer-privacy-link').addEventListener('click', function(e) {
    e.preventDefault();
    showPrivacyPage();
});

// Apps page footer home/features links
document.getElementById('apps-footer-home-link').addEventListener('click', function(e) {
    e.preventDefault();
    showMainContent();
});

document.getElementById('apps-footer-features-link').addEventListener('click', function(e) {
    e.preventDefault();
    showMainContent();
    setTimeout(function() {
        document.querySelector('a[href="#features"]').click();
    }, 100);
});

// FAQ page footer home/features links
document.getElementById('faq-footer-home-link').addEventListener('click', function(e) {
    e.preventDefault();
    showMainContent();
});

document.getElementById('faq-footer-features-link').addEventListener('click', function(e) {
    e.preventDefault();
    showMainContent();
    setTimeout(function() {
        document.querySelector('a[href="#features"]').click();
    }, 100);
});

document.getElementById('faq-footer-apps-link').addEventListener('click', function(e) {
    e.preventDefault();
    showAppsPage();
});

// Privacy page footer home/features links
document.getElementById('privacy-footer-home-link').addEventListener('click', function(e) {
    e.preventDefault();
    showMainContent();
});

document.getElementById('privacy-footer-features-link').addEventListener('click', function(e) {
    e.preventDefault();
    showMainContent();
    setTimeout(function() {
        document.querySelector('a[href="#features"]').click();
    }, 100);
});

document.getElementById('privacy-footer-apps-link').addEventListener('click', function(e) {
    e.preventDefault();
    showAppsPage();
});

document.getElementById('privacy-footer-faq-link').addEventListener('click', function(e) {
    e.preventDefault();
    showFaqPage();
});

// Terms page footer home/features links
document.getElementById('terms-footer-home-link').addEventListener('click', function(e) {
    e.preventDefault();
    showMainContent();
});

document.getElementById('terms-footer-features-link').addEventListener('click', function(e) {
    e.preventDefault();
    showMainContent();
    setTimeout(function() {
        document.querySelector('a[href="#features"]').click();
    }, 100);
});

document.getElementById('terms-footer-apps-link').addEventListener('click', function(e) {
    e.preventDefault();
    showAppsPage();
});

document.getElementById('terms-footer-faq-link').addEventListener('click', function(e) {
    e.preventDefault();
    showFaqPage();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Skip if it's a dropdown toggle
        if (this.classList.contains('dropdown-toggle')) return;
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbars = document.querySelectorAll('.navbar, .welcome-nav');
    navbars.forEach(navbar => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize navbar to scrolled if page is not at top
if (window.pageYOffset > 50) {
    document.querySelectorAll('.navbar, .welcome-nav').forEach(navbar => {
        navbar.classList.add('scrolled');
    });
}

// Initialize feedback form functionality
// Feedback form functionality
const ratingStars = document.querySelectorAll('.rating-stars .fa-star');
const selectedRating = document.getElementById('selected-rating');
const feedbackComment = document.getElementById('feedback-comment');
const submitFeedbackBtn = document.getElementById('submitFeedback');

// Handle star rating selection
ratingStars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = parseInt(star.getAttribute('data-rating'));
        selectedRating.value = rating;
        
        ratingStars.forEach(s => {
            if (parseInt(s.getAttribute('data-rating')) <= rating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });
    
    star.addEventListener('mouseover', () => {
        const rating = parseInt(star.getAttribute('data-rating'));
        ratingStars.forEach(s => {
            if (parseInt(s.getAttribute('data-rating')) <= rating) {
                s.classList.add('hover');
            } else {
                s.classList.remove('hover');
            }
        });
    });
    
    star.addEventListener('mouseout', () => {
        ratingStars.forEach(s => s.classList.remove('hover'));
    });
});

// Handle feedback submission
submitFeedbackBtn.addEventListener('click', async () => {
    const rating = parseInt(selectedRating.value);
    const comment = feedbackComment.value.trim();
    
    if (rating === 0) {
        showToast('Please select a rating', 'error');
        return;
    }
    
    if (!comment) {
        showToast('Please provide your feedback', 'error');
        return;
    }
    
    // Show loading
    document.querySelector('.loading-overlay').style.display = 'flex';
    document.querySelector('.loading-overlay').style.opacity = '1';
    
    try {
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('comment', comment);
        
        const response = await fetch('submit_feedback.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            showToast(data.message, 'success');
            // Reset form
            selectedRating.value = '0';
            feedbackComment.value = '';
            ratingStars.forEach(s => s.classList.remove('active'));
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('feedbackModal'));
            modal.hide();
        } else {
            showToast(data.message || 'Failed to submit feedback', 'error');
        }
    } catch (error) {
        showToast('An error occurred while submitting feedback', 'error');
    } finally {
        // Hide loading
        document.querySelector('.loading-overlay').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-overlay').style.display = 'none';
        }, 500);
    }
});

// Feedback button functionality
const feedbackButton = document.querySelector('.feedback-button');
const feedbackModal = document.querySelector('.feedback-modal');

feedbackButton.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent the click from bubbling up
    feedbackModal.classList.toggle('show');
});

// Close feedback modal when clicking outside
document.addEventListener('click', function(e) {
    if (!feedbackModal.contains(e.target) && e.target !== feedbackButton) {
        feedbackModal.classList.remove('show');
    }
});

// Prevent clicks inside the modal from closing it
feedbackModal.addEventListener('click', function(e) {
    e.stopPropagation();
});

// Submit feedback
feedbackModal.querySelector('button').addEventListener('click', function() {
    const feedbackText = feedbackModal.querySelector('textarea').value;
    const wantsContact = feedbackModal.querySelector('#feedbackContact').checked;
    
    if (feedbackText.trim() !== '') {
        // Here you would normally send the feedback to your server
        console.log('Feedback submitted:', {
            text: feedbackText,
            contact: wantsContact
        });
        
        showToast('Thank you for your feedback!', 'success');
        feedbackModal.querySelector('textarea').value = '';
        feedbackModal.querySelector('#feedbackContact').checked = false;
        feedbackModal.classList.remove('show');
    } else {
        showToast('Please enter your feedback', 'error');
    }
});

// Helper functions
function showAuthPage() {
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('auth-page').style.display = 'block';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('apps-page').style.display = 'none';
    document.getElementById('faq-page').style.display = 'none';
    document.getElementById('privacy-page').style.display = 'none';
    document.getElementById('terms-page').style.display = 'none';
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('forgot-password-form').style.display = 'none';
    document.getElementById('auth-form-title').textContent = 'Welcome to Herverse';
    document.getElementById('auth-form-subtitle').textContent = 'Your complete women\'s wellness and safety platform';
}

function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('forgot-password-form').style.display = 'none';
    document.getElementById('auth-form-title').textContent = 'Create Account';
    document.getElementById('auth-form-subtitle').textContent = 'Join our community today';
}

function showMainContent() {
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('auth-page').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('apps-page').style.display = 'none';
    document.getElementById('faq-page').style.display = 'none';
    document.getElementById('privacy-page').style.display = 'none';
    document.getElementById('terms-page').style.display = 'none';
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function showAppsPage() {
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('auth-page').style.display = 'none';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('apps-page').style.display = 'block';
    document.getElementById('faq-page').style.display = 'none';
    document.getElementById('privacy-page').style.display = 'none';
    document.getElementById('terms-page').style.display = 'none';
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function showFaqPage() {
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('auth-page').style.display = 'none';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('apps-page').style.display = 'none';
    document.getElementById('faq-page').style.display = 'block';
    document.getElementById('privacy-page').style.display = 'none';
    document.getElementById('terms-page').style.display = 'none';
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function showPrivacyPage() {
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('auth-page').style.display = 'none';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('apps-page').style.display = 'none';
    document.getElementById('faq-page').style.display = 'none';
    document.getElementById('privacy-page').style.display = 'block';
    document.getElementById('terms-page').style.display = 'none';
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function showTermsPage() {
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('auth-page').style.display = 'none';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('apps-page').style.display = 'none';
    document.getElementById('faq-page').style.display = 'none';
    document.getElementById('privacy-page').style.display = 'none';
    document.getElementById('terms-page').style.display = 'block';
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function showAccountModal() {
    // Update modal with current user data
    document.getElementById('modal-account-fullname').textContent = `${userData.firstName} ${userData.lastName}`;
    document.getElementById('modal-account-email').textContent = userData.email;
    document.getElementById('modal-account-emergency').textContent = userData.emergencyContact || 'Not set';
    document.getElementById('modal-account-health').textContent = userData.healthConcerns || 'Not specified';
    
    // Reset edit state
    document.getElementById('modal-edit-account-btn').style.display = 'block';
    document.getElementById('modal-save-account-btn').style.display = 'none';
    
    const accountModal = new bootstrap.Modal(document.getElementById('accountModal'));
    accountModal.show();
}

function enableAccountModalEditing() {
    document.getElementById('modal-edit-account-btn').style.display = 'none';
    document.getElementById('modal-save-account-btn').style.display = 'block';
    
    // Convert info to editable fields
    document.getElementById('modal-account-emergency').innerHTML = `<input type="text" class="form-control" value="${userData.emergencyContact || ''}" placeholder="Emergency contact number">`;
    document.getElementById('modal-account-health').innerHTML = `<textarea class="form-control" placeholder="Any health concerns?">${userData.healthConcerns || ''}</textarea>`;
}

function saveAccountModalChanges() {
    userData.emergencyContact = document.querySelector('#modal-account-emergency input').value;
    userData.healthConcerns = document.querySelector('#modal-account-health textarea').value;
    
    // Convert back to display
    document.getElementById('modal-account-emergency').textContent = userData.emergencyContact || 'Not set';
    document.getElementById('modal-account-health').textContent = userData.healthConcerns || 'Not specified';
    
    document.getElementById('modal-edit-account-btn').style.display = 'block';
    document.getElementById('modal-save-account-btn').style.display = 'none';
    
    showToast('Account information updated', 'success');
}

function showSettingsModal() {
    const settingsModal = new bootstrap.Modal(document.getElementById('settingsModal'));
    settingsModal.show();
}

function logoutUser() {
    localStorage.setItem('isLoggedIn', 'false');
    document.getElementById('welcome-page').style.display = 'block';
    document.getElementById('auth-page').style.display = 'none';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('apps-page').style.display = 'none';
    document.getElementById('faq-page').style.display = 'none';
    document.getElementById('privacy-page').style.display = 'none';
    document.getElementById('terms-page').style.display = 'none';
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    showToast('You have been logged out', 'info');
}

function showToast(message, type = 'info') {
    const toastContainer = document.querySelector('.toast-container');
    const toastEl = document.createElement('div');
    toastEl.className = 'toast show';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    
    let headerClass = '';
    let icon = '';
    switch(type) {
        case 'success':
            headerClass = 'text-success';
            icon = 'check-circle';
            break;
        case 'error':
            headerClass = 'text-danger';
            icon = 'exclamation-circle';
            break;
        case 'warning':
            headerClass = 'text-warning';
            icon = 'exclamation-triangle';
            break;
        default:
            headerClass = 'text-primary';
            icon = 'info-circle';
    }
    
    toastEl.innerHTML = `
        <div class="toast-header">
            <i class="fas fa-${icon} me-2 ${headerClass}"></i>
            <strong class="me-auto">Herverse</strong>
            <small>Just now</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    toastContainer.appendChild(toastEl);
    
    // Auto remove after 5 seconds
    setTimeout(function() {
        toastEl.classList.remove('show');
        setTimeout(function() {
            toastEl.remove();
        }, 300);
    }, 5000);
}