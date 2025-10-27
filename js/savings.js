// Savings JavaScript Logic

// Savings goals data
const savingsGoals = {
    travel: {
        title: 'Travel',
        icon: '✈️',
        goal: 1962.93,
        saved: 653.31,
        progress: 33,
        transactions: [
            { month: 'April', name: 'Travel Deposit', time: '19:56 - 30', amount: '$217.77' },
            { month: 'April', name: 'Travel Deposit', time: '15:00 - 15', amount: '$200.00' },
            { month: 'March', name: 'Travel Deposit', time: '12:00 - 10', amount: '$235.54' }
        ]
    },
    home: {
        title: 'New House',
        icon: '🏠',
        goal: 569200,
        saved: 625.48,
        progress: 1,
        transactions: [
            { month: 'April', name: 'House Deposit', time: '19:56 - 5', amount: '$477.77' },
            { month: 'January', name: 'House Deposit', time: '20:25 - 16', amount: '$102.67' },
            { month: 'January', name: 'House Deposit', time: '15:56 - 2', amount: '$45.04' }
        ]
    },
    car: {
        title: 'Car',
        icon: '🚗',
        goal: 14390,
        saved: 596.25,
        progress: 4,
        transactions: [
            { month: 'July', name: 'Car Deposit', time: '14:16 - 5', amount: '$387.32' },
            { month: 'May', name: 'Car Deposit', time: '21:45 - 30', amount: '$122.99' },
            { month: 'May', name: 'House Deposit', time: '14:25 - 5', amount: '$85.94' }
        ]
    },
    wedding: {
        title: 'Wedding',
        icon: '💍',
        goal: 34700,
        saved: 296.25,
        progress: 1,
        transactions: [
            { month: 'November', name: 'Wedding Deposit', time: '18:46 - 15', amount: '$87.32' },
            { month: 'September', name: 'Wedding Deposit', time: '21:45 - 30', amount: '$22.99' },
            { month: 'September', name: 'Wedding Deposit', time: '12:25 - 15', amount: '$185.94' }
        ]
    }
};

// Initialize savings detail page
function initSavingsDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const goalType = urlParams.get('goal');
    
    if (!goalType || !savingsGoals[goalType]) {
        window.location.href = 'savings.html';
        return;
    }
    
    const goalData = savingsGoals[goalType];
    
    // Update page elements
    document.getElementById('savingsTitle').textContent = goalData.title;
    document.getElementById('goalAmount').textContent = `$${goalData.goal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('amountSaved').textContent = `$${goalData.saved.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('savingsIcon').textContent = goalData.icon;
    document.getElementById('savingsGoalName').textContent = goalData.title;
    
    // Update progress bar
    document.getElementById('progressFill').style.width = `${goalData.progress}%`;
    document.getElementById('progressTextLeft').textContent = `${goalData.progress}%`;
    document.getElementById('progressTarget').textContent = `$${goalData.goal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    
    // Update progress status
    const percentage = (goalData.saved / goalData.goal * 100).toFixed(2);
    document.getElementById('progressStatus').textContent = `${percentage}% Of Your Goal, Keep Going!`;
    
    // Load transactions
    loadSavingsTransactions(goalData);
}

// Load savings transactions
function loadSavingsTransactions(goalData) {
    const container = document.getElementById('savingsList');
    if (!container) return;
    
    let html = '';
    let lastMonth = '';
    
    goalData.transactions.forEach(transaction => {
        if (transaction.month !== lastMonth) {
            if (lastMonth !== '') {
                html += '</div>'; // Close previous month
            }
            html += `<h2 class="month-header-savings">${transaction.month}</h2>`;
            html += '<div class="expenses-list" style="margin-bottom: 20px;">';
            lastMonth = transaction.month;
        }
        
        html += `
            <div class="expense-item">
                <div class="expense-icon-small">${goalData.icon}</div>
                <div class="expense-details">
                    <p class="expense-name">${transaction.name}</p>
                    <p class="expense-time">${transaction.time}</p>
                </div>
                <div class="expense-cost">${transaction.amount}</div>
            </div>
        `;
    });
    
    if (lastMonth !== '') {
        html += '</div>';
    }
    
    container.innerHTML = html;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('savingsTitle')) {
        initSavingsDetail();
    }
});

// Initialize savings main page
document.addEventListener('DOMContentLoaded', function() {
    // Handle "Add More" button
    const addMoreBtn = document.querySelector('.btn-primary.btn-full');
    if (addMoreBtn && addMoreBtn.textContent.includes('Add More')) {
        addMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'add-savings.html';
        });
    }
});

// Handle add savings form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addSavingsForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const date = document.getElementById('savingsDate').value;
            const category = document.getElementById('savingsCategory').value;
            const amount = document.getElementById('savingsAmount').value;
            const title = document.getElementById('savingsTitle').value;
            const message = document.getElementById('savingsMessage').value;
            
            if (!date || !category || !amount || !title) {
                showMessage('Пожалуйста, заполните все обязательные поля', 'error');
                return;
            }
            
            // Format amount
            let formattedAmount = amount;
            if (!amount.startsWith('$')) {
                formattedAmount = '$' + amount.replace('$', '');
            }
            
            // Get current user
            const user = JSON.parse(localStorage.getItem('finwise_currentUser') || '{}');
            
            if (!user.email) {
                showMessage('Ошибка авторизации', 'error');
                setTimeout(() => window.location.href = 'login.html', 1500);
                return;
            }
            
            // Save to localStorage
            const savings = JSON.parse(localStorage.getItem('finwise_savings') || '[]');
            
            const savingsEntry = {
                id: Date.now(),
                date: date,
                category: category,
                amount: formattedAmount,
                title: title,
                message: message,
                userId: user.email
            };
            
            savings.push(savingsEntry);
            localStorage.setItem('finwise_savings', JSON.stringify(savings));
            
            showMessage('Сбережение успешно добавлено!', 'success');
            
            setTimeout(() => {
                window.location.href = 'savings.html';
            }, 1500);
        });
    }
});

// Initialize date picker
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('savingsDate');
    
    if (dateInput) {
        // Set default date to today
        const today = new Date();
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        const dateStr = `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
        dateInput.value = dateStr;
    }
});

// Show calendar
function showCalendar() {
    console.log('Calendar opened');
}

// Export functions
window.showCalendar = showCalendar;
window.openDatePicker = function() {
    console.log('Date picker opened');
};

