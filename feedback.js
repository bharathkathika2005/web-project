// feedback.js - Updated version
document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('feedbackName').value;
            const email = document.getElementById('feedbackEmail').value;
            const rating = document.querySelector('input[name="rating"]:checked')?.value || 'Not rated';
            const category = document.getElementById('feedbackCategory').value;
            const message = document.getElementById('feedbackMessage').value;
            const contactMe = document.getElementById('contactMe').checked;
            
            // Simple validation
            if (!name || !email || !category || !message) {
                showToast('Please fill in all required fields', 'error');
                return;
            }
            
            // Show loading animation
            const submitBtn = feedbackForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(function() {
                // Here you would normally send the data to your server
                console.log('Feedback submitted:', {
                    name,
                    email,
                    rating,
                    category,
                    message,
                    contactMe
                });
                
                // Show success animation
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
                submitBtn.classList.add('btn-success');
                
                // Create a success message element
                const successDiv = document.createElement('div');
                successDiv.className = 'feedback-success text-center mt-4';
                successDiv.innerHTML = `
                    <div class="success-animation">
                        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                        <h4 class="mt-3">Thank You for Your Feedback!</h4>
                        <p class="mb-3">We appreciate you taking the time to help us improve.</p>
                        <a href="index.html" class="btn btn-primary">
                            <i class="fas fa-arrow-left me-2"></i> Back to Main Page
                        </a>
                    </div>
                `;
                
                // Replace form with success message
                feedbackForm.style.display = 'none';
                feedbackForm.parentNode.insertBefore(successDiv, feedbackForm.nextSibling);
                
                // Reset form (hidden now)
                feedbackForm.reset();
                
            }, 1500);
        });
    }
    
    // Helper function to show toast notifications
    function showToast(message, type = 'info') {
        const toastContainer = document.querySelector('.toast-container') || document.createElement('div');
        if (!document.querySelector('.toast-container')) {
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        
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
                <strong class="me-auto">HerVerse</strong>
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
});