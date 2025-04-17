
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
        document.getElementById('auth-form-title').textContent = 'Welcome to SafeGuard';
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
            
            // Simulate login process
            setTimeout(function() {
                // Set logged in state
                localStorage.setItem('isLoggedIn', 'true');
                
                // Hide auth page and show main content
                document.getElementById('auth-page').style.display = 'none';
                document.getElementById('welcome-page').style.display = 'none';
                document.getElementById('main-content').style.display = 'block';
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                
                // Hide loading
                document.querySelector('.loading-overlay').style.opacity = '0';
                setTimeout(function() {
                    document.querySelector('.loading-overlay').style.display = 'none';
                }, 500);
                
                // Show welcome toast
                showToast('Welcome back to SafeGuard!', 'success');
            }, 1500);
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
        
        // Store user data
        userData.firstName = firstName;
        userData.lastName = lastName;
        userData.email = email;
        
        // Simulate registration process
        setTimeout(function() {
            // Set logged in state
            localStorage.setItem('isLoggedIn', 'true');
            
            // Hide auth page and show main content
            document.getElementById('auth-page').style.display = 'none';
            document.getElementById('welcome-page').style.display = 'none';
            document.getElementById('main-content').style.display = 'none';
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            
            // Hide loading
            document.querySelector('.loading-overlay').style.opacity = '0';
            setTimeout(function() {
                document.querySelector('.loading-overlay').style.display = 'none';
            }, 500);
            
            // Show questionnaire modal
            const questionnaireModal = new bootstrap.Modal(document.getElementById('questionnaireModal'));
            questionnaireModal.show();
        }, 1500);
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
        if (userData.emergencyContact) {
            showToast(`Emergency alert sent to ${userData.emergencyContact}`, 'success');
            const modal = bootstrap.Modal.getInstance(document.getElementById('emergencyModal'));
            modal.hide();
        } else {
            showToast('Please set up emergency contact in your account settings', 'error');
        }
    });
    
    // Support message button
    document.getElementById('sendSupportMessage').addEventListener('click', function() {
        showToast('Your message has been sent to our support team', 'success');
        const modal = bootstrap.Modal.getInstance(document.getElementById('supportModal'));
        modal.hide();
    });
    
    
    // Feature learn more buttons
    document.querySelectorAll('.feature-learn-more').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const feature = this.getAttribute('data-feature');
            showFeatureModal(feature);
        });
    });
    
    // Navigation links
    document.getElementById('nav-apps-link').addEventListener('click', function(e) {
        e.preventDefault();
        showAppsPage();
    });
    
    document.getElementById('nav-faq-link').addEventListener('click', function(e) {
        e.preventDefault();
        showFaqPage();
    });
    
    document.getElementById('main-apps-link').addEventListener('click', function(e) {
        e.preventDefault();
        showAppsPage();
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
        if (!isLoggedIn()) {
            showToast('Please login to access this page', 'error');
            showAuthPage();
        } else {
            showPrivacyPage();
        }
    });
    
    document.getElementById('footer-terms-link').addEventListener('click', function(e) {
        e.preventDefault();
        if (!isLoggedIn()) {
            showToast('Please login to access this page', 'error');
            showAuthPage();
        } else {
            showTermsPage();
        }
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
        document.getElementById('auth-form-title').textContent = 'Welcome to SafeGuard';
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
    
    function showFeatureModal(feature) {
        const featureModal = new bootstrap.Modal(document.getElementById('featureModal'));
        document.getElementById('featureModalTitle').textContent = featureDetails[feature].title;
        document.getElementById('featureModalBody').innerHTML = featureDetails[feature].content;
        featureModal.show();
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
                <strong class="me-auto">SafeGuard</strong>
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
    
    document.getElementById("confirmEmergency")?.addEventListener("click", function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            fetch("send_alert.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            }).then(response => response.text())
              .then(data => {
                  alert("Alert sent successfully: " + data);
                  var emergencyModal = bootstrap.Modal.getInstance(document.getElementById("emergencyModal"));
                  emergencyModal.hide();
              }).catch(err => alert("Failed to send alert: " + err));
        }, function () {
            alert("Location access denied.");
        });
    });
    
    document.getElementById("show-register")?.addEventListener("click", () => {
        document.getElementById("login-form").style.display = "none";
        document.getElementById("register-form").style.display = "block";
    });
    
    document.getElementById("show-login")?.addEventListener("click", () => {
        document.getElementById("register-form").style.display = "none";
        document.getElementById("login-form").style.display = "block";
    });
    