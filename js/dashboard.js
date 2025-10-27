// Dashboard JavaScript Logic

// Navigation functions
function goToDashboard() {
    window.location.href = 'dashboard.html';
}

function goToAnalysis() {
    window.location.href = 'analysis.html';
}

function goToTransactions() {
    window.location.href = 'transactions.html';
}

function goToCards() {
    window.location.href = 'cards.html';
}

function goToProfile() {
    window.location.href = 'profile.html';
}

// Get current user from localStorage
function getCurrentUser() {
    const userStr = localStorage.getItem('finwise_currentUser');
    if (userStr && userStr !== 'null') {
        return JSON.parse(userStr);
    }
    return null;
}

// Check if user is logged in
function checkAuth() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Load dashboard data
function loadDashboardData() {
    const user = getCurrentUser();
    if (user) {
        // Load saved transactions if any
        const transactions = JSON.parse(localStorage.getItem('finwise_transactions') || '[]');
        
        if (transactions.length > 0) {
            // Display transactions
            displayTransactions(transactions);
        } else {
            // Use default demo data
            displayDemoTransactions();
        }
    }
}

// Display transactions
function displayTransactions(transactions) {
    const container = document.querySelector('.transactions-list');
    if (!container) return;

    container.innerHTML = transactions.map(transaction => `
        <div class="transaction-item">
            <div class="transaction-icon ${transaction.type}">${transaction.icon}</div>
            <div class="transaction-details">
                <p class="transaction-title">${transaction.title}</p>
                <p class="transaction-date">${transaction.date}</p>
            </div>
            <div class="transaction-category">${transaction.category}</div>
            <div class="transaction-separator"></div>
            <div class="transaction-amount ${transaction.type}">${transaction.amount}</div>
        </div>
    `).join('');
}

// Display demo transactions
function displayDemoTransactions() {
    // Demo transactions are already in HTML
    console.log('Displaying demo transactions');
}

// Handle time period change
document.addEventListener('DOMContentLoaded', function() {
    const timeButtons = document.querySelectorAll('.time-btn');
    
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            timeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Handle time period change
            const period = this.textContent;
            changeTimePeriod(period);
        });
    });

    // Load dashboard data
    loadDashboardData();
});

// Change time period
function changeTimePeriod(period) {
    console.log(`Time period changed to: ${period}`);
    // Here you would typically reload data based on the selected period
    // For demo purposes, we just log it
}

// Initialize notification button
document.addEventListener('DOMContentLoaded', function() {
    const notificationBtn = document.querySelector('.notification-btn');
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            window.location.href = 'notifications.html';
        });
    }
});

// Load balance data
function loadBalance() {
    const balanceData = localStorage.getItem('finwise_balance');
    
    if (balanceData) {
        const balance = JSON.parse(balanceData);
        updateBalanceDisplay(balance);
    } else {
        // Use demo balance
        const demoBalance = {
            total: 7783.00,
            losses: 1187.40,
            progress: 30,
            target: 20000.00
        };
        localStorage.setItem('finwise_balance', JSON.stringify(demoBalance));
        updateBalanceDisplay(demoBalance);
    }
}

// Update balance display
function updateBalanceDisplay(balance) {
    const totalElements = document.querySelectorAll('.balance-amount');
    totalElements.forEach(el => {
        if (el.textContent.includes('$')) {
            el.textContent = `$${balance.total.toFixed(2)}`;
        }
    });

    const lossElements = document.querySelectorAll('.loss-amount');
    lossElements.forEach(el => {
        el.textContent = `-$${balance.losses.toFixed(2)}`;
    });

    const progressBars = document.querySelectorAll('.progress-bar-filled');
    progressBars.forEach(bar => {
        bar.style.width = `${balance.progress}%`;
        const text = bar.querySelector('.progress-text');
        if (text) {
            text.textContent = `${balance.progress}%`;
        }
    });
}

// Call loadBalance when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadBalance();
    
    // Check authentication
    if (!document.querySelector('.splash-screen')) {
        checkAuth();
    }
});

// Export functions for global use
window.goToDashboard = goToDashboard;
window.goToAnalysis = goToAnalysis;
window.goToTransactions = goToTransactions;
window.goToCards = goToCards;
window.goToProfile = goToProfile;
window.loadDashboardData = loadDashboardData;

