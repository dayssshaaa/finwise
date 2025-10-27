// Profile JavaScript Logic

// Logout function
function logout() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        // Clear current user
        localStorage.removeItem('finwise_currentUser');
        
        // Show message
        showMessage('Вы вышли из системы', 'info');
        
        // Redirect to login
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
}

// Accept terms
function acceptTerms() {
    const checkbox = document.getElementById('acceptTerms');
    
    if (!checkbox.checked) {
        showMessage('Пожалуйста, примите условия использования', 'error');
        return;
    }
    
    // Save acceptance
    localStorage.setItem('finwise_termsAccepted', 'true');
    
    showMessage('Условия приняты!', 'success');
    
    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 1000);
}

// Initialize profile edit form
document.addEventListener('DOMContentLoaded', function() {
    const editForm = document.getElementById('editProfileForm');
    
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleProfileUpdate();
        });
    }

    const changePasswordForm = document.getElementById('changePasswordForm');
    
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handlePasswordChange();
        });
    }
});

// Handle profile update
function handleProfileUpdate() {
    const name = document.getElementById('editName').value;
    const phone = document.getElementById('editPhone').value;
    const email = document.getElementById('editEmail').value;
    const notifications = document.getElementById('notificationsToggle').checked;
    
    // Get current user
    const user = JSON.parse(localStorage.getItem('finwise_currentUser') || '{}');
    
    if (!user.email) {
        showMessage('Ошибка авторизации', 'error');
        return;
    }
    
    // Update user data
    user.name = name;
    user.phone = phone;
    user.email = email;
    user.notifications = notifications;
    
    // Save updated user
    localStorage.setItem('finwise_currentUser', JSON.stringify(user));
    
    // Update in users list
    const users = JSON.parse(localStorage.getItem('finwise_users') || '[]');
    const userIndex = users.findIndex(u => u.email === user.email);
    
    if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem('finwise_users', JSON.stringify(users));
    }
    
    showMessage('Профиль обновлен!', 'success');
    
    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 1000);
}

// Handle password change
function handlePasswordChange() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPasswordChange').value;
    const repeatPassword = document.getElementById('repeatPasswordChange').value;
    
    // Get current user
    const user = JSON.parse(localStorage.getItem('finwise_currentUser') || '{}');
    
    if (!user.email) {
        showMessage('Ошибка авторизации', 'error');
        return;
    }
    
    // Check current password
    if (currentPassword !== user.password) {
        showMessage('Неверный текущий пароль', 'error');
        return;
    }
    
    // Check new password match
    if (newPassword !== repeatPassword) {
        showMessage('Новые пароли не совпадают', 'error');
        return;
    }
    
    // Validate password length
    if (newPassword.length < 6) {
        showMessage('Пароль должен содержать минимум 6 символов', 'error');
        return;
    }
    
    // Update password
    user.password = newPassword;
    
    // Save updated user
    localStorage.setItem('finwise_currentUser', JSON.stringify(user));
    
    // Update in users list
    const users = JSON.parse(localStorage.getItem('finwise_users') || '[]');
    const userIndex = users.findIndex(u => u.email === user.email);
    
    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('finwise_users', JSON.stringify(users));
    }
    
    showMessage('Пароль успешно изменен!', 'success');
    
    setTimeout(() => {
        window.location.href = 'security.html';
    }, 1000);
}

// Delete fingerprint
function deleteFingerprint() {
    if (confirm('Удалить отпечаток?')) {
        showMessage('Отпечаток удален', 'success');
        
        setTimeout(() => {
            window.location.href = 'fingerprint.html';
        }, 500);
    }
}

// Use fingerprint
function useFingerprint() {
    showMessage('Отпечаток добавлен!', 'success');
    
    setTimeout(() => {
        window.location.href = 'fingerprint.html';
    }, 1000);
}

// Confirm delete account with modal
function confirmDeleteAccount() {
    const password = document.getElementById('deletePassword').value;
    
    if (!password) {
        showMessage('Введите пароль для подтверждения', 'error');
        return;
    }
    
    // Get current user
    const user = JSON.parse(localStorage.getItem('finwise_currentUser') || '{}');
    
    if (password !== user.password) {
        showMessage('Неверный пароль', 'error');
        return;
    }
    
    // Show final confirmation
    if (confirm('Вы ТОЧНО уверены, что хотите удалить свой аккаунт? Это действие нельзя отменить!')) {
        // Delete user from storage
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
            window.location.href = 'index.html';
        }, 1500);
    }
}

// Export functions
window.logout = logout;
window.acceptTerms = acceptTerms;
window.deleteFingerprint = deleteFingerprint;
window.useFingerprint = useFingerprint;
window.confirmDeleteAccount = confirmDeleteAccount;

