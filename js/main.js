// Главный JavaScript файл для приложения FinWise

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

// Инициализация приложения
function initApp() {
    // Инициализация localStorage
    initLocalStorage();
    
    // Обработка splash screen
    if (document.querySelector('.splash-screen')) {
        setTimeout(() => {
            window.location.href = 'onboarding-1.html';
        }, 2000);
    }

    // Инициализация форм
    initForms();

    // Инициализация security code inputs
    initSecurityCodeInputs();

    // Обработка номеров телефонов
    initPhoneInputs();

    // Обработка дат
    initDateInputs();
}

// Инициализация форм
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(form.id);
        });
    });
}

// Инициализация localStorage
function initLocalStorage() {
    if (!localStorage.getItem('finwise_users')) {
        localStorage.setItem('finwise_users', JSON.stringify([]));
    }
    if (!localStorage.getItem('finwise_currentUser')) {
        localStorage.setItem('finwise_currentUser', JSON.stringify(null));
    }
}

// Сохранить пользователя
function saveUser(userData) {
    const users = JSON.parse(localStorage.getItem('finwise_users') || '[]');
    users.push(userData);
    localStorage.setItem('finwise_users', JSON.stringify(users));
}

// Найти пользователя по email
function findUserByEmail(email) {
    const users = JSON.parse(localStorage.getItem('finwise_users') || '[]');
    return users.find(user => user.email === email);
}

// Обработка отправки форм
function handleFormSubmit(formId) {
    const form = document.getElementById(formId);
    
    if (!form) return;

    // Валидация формы
    if (!validateForm(formId)) {
        showMessage('Пожалуйста, заполните все поля корректно', 'error');
        return;
    }

    // Эмуляция отправки данных
    showMessage('Обработка данных...', 'info');
    
    setTimeout(() => {
        switch(formId) {
            case 'loginForm':
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const user = findUserByEmail(email);
                
                if (user && user.password === password) {
                    localStorage.setItem('finwise_currentUser', JSON.stringify(user));
                    showMessage('Вход выполнен успешно!', 'success');
                    // Skip security code for demo, go directly to dashboard
                    setTimeout(() => window.location.href = 'dashboard.html', 1000);
                    // For full version, uncomment line below:
                    // setTimeout(() => window.location.href = 'security-code.html', 1000);
                } else {
                    showMessage('Неверный email или пароль', 'error');
                }
                break;
                
            case 'registerForm':
                const userData = {
                    name: document.getElementById('regName').value,
                    email: document.getElementById('regEmail').value,
                    phone: document.getElementById('regPhone').value,
                    birthdate: document.getElementById('regBirthdate').value,
                    password: document.getElementById('regPassword').value
                };
                
                // Проверка существующего пользователя
                if (findUserByEmail(userData.email)) {
                    showMessage('Пользователь с таким email уже существует', 'error');
                    return;
                }
                
                saveUser(userData);
                showMessage('Регистрация выполнена успешно!', 'success');
                setTimeout(() => window.location.href = 'login.html', 1500);
                break;
                
            case 'forgotPasswordForm':
                const forgotEmail = document.getElementById('forgotEmail').value;
                const forgotUser = findUserByEmail(forgotEmail);
                
                if (forgotUser) {
                    showMessage('Письмо с инструкциями отправлено!', 'success');
                    localStorage.setItem('finwise_resetEmail', forgotEmail);
                    setTimeout(() => window.location.href = 'new-password.html', 1500);
                } else {
                    showMessage('Пользователь с таким email не найден', 'error');
                }
                break;
                
            case 'newPasswordForm':
                const resetEmail = localStorage.getItem('finwise_resetEmail');
                const newPassword = document.getElementById('newPassword').value;
                
                if (resetEmail) {
                    const users = JSON.parse(localStorage.getItem('finwise_users') || '[]');
                    const userIndex = users.findIndex(user => user.email === resetEmail);
                    
                    if (userIndex !== -1) {
                        users[userIndex].password = newPassword;
                        localStorage.setItem('finwise_users', JSON.stringify(users));
                        localStorage.removeItem('finwise_resetEmail');
                        
                        showMessage('Пароль успешно изменен!', 'success');
                        setTimeout(() => window.location.href = 'login.html', 1500);
                    }
                }
                break;
        }
    }, 500);
}

// Валидация формы
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    let isValid = true;
    const inputs = form.querySelectorAll('input[required]');

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }

        // Валидация email
        if (input.type === 'email' && input.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                isValid = false;
                input.classList.add('error');
            }
        }

        // Валидация паролей
        if (input.type === 'password' && input.id.includes('Repeat')) {
            const passwordId = input.id.replace('Repeat', '');
            const passwordInput = document.getElementById(passwordId);
            
            if (passwordInput && input.value !== passwordInput.value) {
                isValid = false;
                input.classList.add('error');
                showMessage('Пароли не совпадают', 'error');
            }
        }

        // Минимальная длина пароля
        if (input.type === 'password' && input.value.length < 6) {
            isValid = false;
            input.classList.add('error');
            showMessage('Пароль должен содержать минимум 6 символов', 'error');
        }
    });

    return isValid;
}

// Переключение видимости пароля
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const button = input.nextElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        button.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
        `;
    } else {
        input.type = 'password';
        button.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
            </svg>
        `;
    }
}

// Инициализация security code inputs
function initSecurityCodeInputs() {
    const codeInputs = document.querySelectorAll('.code-input');
    
    codeInputs.forEach((input, index) => {
        input.addEventListener('input', function(e) {
            // Разрешить только цифры
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Автоматический переход к следующему полю
            if (this.value && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', function(e) {
            // Переход к предыдущему полю при Backspace
            if (e.key === 'Backspace' && !this.value && index > 0) {
                codeInputs[index - 1].focus();
            }
        });

        // Ограничение ввода одной цифры
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const paste = (e.clipboardData || window.clipboardData).getData('text');
            const digits = paste.replace(/[^0-9]/g, '').slice(0, codeInputs.length);
            
            codeInputs.forEach((item, i) => {
                if (digits[i]) {
                    item.value = digits[i];
                }
            });
        });
    });
}

// Обработка security code
function handleSecurityCode() {
    const codeInputs = document.querySelectorAll('.code-input');
    let code = '';
    
    codeInputs.forEach(input => {
        code += input.value || '';
    });

    if (code.length === 6) {
        showMessage('Код подтвержден!', 'success');
        setTimeout(() => {
            // Переход на главный экран
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        showMessage('Введите полный код из 6 цифр', 'error');
    }
}

// Инициализация phone input
function initPhoneInputs() {
    const phoneInput = document.getElementById('regPhone');
    if (!phoneInput) return;

    phoneInput.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            value = '+' + value;
        }
        
        this.value = value;
    });
}

// Инициализация date input
function initDateInputs() {
    const dateInput = document.getElementById('regBirthdate');
    if (!dateInput) return;

    // Set max date to today (user must be at least 18 years old)
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
    
    // Set a reasonable min date (120 years ago)
    const minDate = new Date(today.getFullYear() - 120, 0, 1);
    dateInput.setAttribute('min', minDate.toISOString().split('T')[0]);
}

// Навигация между экранами
function goToNextOnboarding() {
    window.location.href = 'onboarding-2.html';
}

function goToLogin() {
    window.location.href = 'login.html';
}

function goToRegister() {
    window.location.href = 'register.html';
}

function goBack() {
    window.history.back();
}

// Показать сообщение
function showMessage(message, type = 'info') {
    // Создаем элемент сообщения
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.textContent = message;
    
    // Добавляем стили
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 30px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideDown 0.3s ease;
        max-width: 90%;
        text-align: center;
    `;
    
    // Цвет в зависимости от типа
    switch(type) {
        case 'success':
            messageEl.style.backgroundColor = '#28a745';
            break;
        case 'error':
            messageEl.style.backgroundColor = '#dc3545';
            break;
        case 'info':
        default:
            messageEl.style.backgroundColor = '#20C997';
            break;
    }
    
    document.body.appendChild(messageEl);
    
    // Удаляем сообщение через 3 секунды
    setTimeout(() => {
        messageEl.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => messageEl.remove(), 300);
    }, 3000);
}

// Добавляем стили для сообщений в head
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Экспорт функций для глобального использования
window.togglePassword = togglePassword;
window.handleSecurityCode = handleSecurityCode;
window.goToNextOnboarding = goToNextOnboarding;
window.goToLogin = goToLogin;
window.goToRegister = goToRegister;
window.goBack = goBack;

