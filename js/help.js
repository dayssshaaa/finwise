// Help JavaScript Logic

// Switch tabs
function switchTab(tab) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabContents.forEach(content => content.classList.remove('active'));
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tab + '-tab').classList.add('active');
    event.target.classList.add('active');
}

// Confirm delete account
function confirmDelete() {
    const password = document.getElementById('deletePassword').value;
    
    if (!password) {
        showMessage('Введите пароль', 'error');
        return;
    }
    
    // Get current user
    const user = JSON.parse(localStorage.getItem('finwise_currentUser') || '{}');
    
    if (password !== user.password) {
        showMessage('Неверный пароль', 'error');
        return;
    }
    
    // Show confirmation modal
    if (confirm('Вы действительно хотите удалить свой аккаунт? Это действие нельзя отменить!')) {
        // Delete user
        const users = JSON.parse(localStorage.getItem('finwise_users') || '[]');
        const filteredUsers = users.filter(u => u.email !== user.email);
        localStorage.setItem('finwise_users', JSON.stringify(filteredUsers));
        
        // Clear current user
        localStorage.removeItem('finwise_currentUser');
        
        // Clear all related data
        localStorage.removeItem('finwise_expenses');
        localStorage.removeItem('finwise_savings');
        
        showMessage('Аккаунт удален', 'info');
        
        // Redirect to login
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    }
}

// Export functions
window.switchTab = switchTab;
window.confirmDelete = confirmDelete;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Handle tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const tabContents = document.querySelectorAll('.tab-content');
                tabContents.forEach(content => content.classList.remove('active'));
                
                const tabId = this.textContent.toLowerCase();
                if (tabId.includes('вопросы') || tabId.includes('questions')) {
                    document.getElementById('questions-tab').classList.add('active');
                } else if (tabId.includes('контакты') || tabId.includes('contacts')) {
                    document.getElementById('contacts-tab').classList.add('active');
                }
            });
        });
    }

    // Handle FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('FAQ item clicked:', this.textContent);
            // Add expand/collapse functionality if needed
        });
    });
});

