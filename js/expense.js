// Add Expense JavaScript

// Initialize add expense page
function initAddExpensePage() {
    // Set default date to today
    const today = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const dateStr = `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    document.getElementById('expenseDate').value = dateStr;
    
    // Handle form submission
    const form = document.getElementById('addExpenseForm');
    if (form) {
        form.addEventListener('submit', handleAddExpense);
    }
}

// Handle adding expense
function handleAddExpense(e) {
    e.preventDefault();
    
    const date = document.getElementById('expenseDate').value;
    const category = document.getElementById('expenseCategory').value;
    const amount = document.getElementById('expenseAmount').value;
    const title = document.getElementById('expenseTitle').value;
    const message = document.getElementById('expenseMessage').value;
    
    // Validate
    if (!date || !category || !amount || !title) {
        showMessage('Пожалуйста, заполните все обязательные поля', 'error');
        return;
    }
    
    // Format amount
    let formattedAmount = amount;
    if (!amount.startsWith('-$') && !amount.startsWith('$')) {
        formattedAmount = '-$' + amount.replace('$', '');
    }
    
    // Get current user
    const user = JSON.parse(localStorage.getItem('finwise_currentUser') || '{}');
    
    if (!user.email) {
        showMessage('Ошибка авторизации', 'error');
        setTimeout(() => window.location.href = 'login.html', 1500);
        return;
    }
    
    // Save expense to localStorage
    const expenses = JSON.parse(localStorage.getItem('finwise_transactions') || '[]');
    
    const expense = {
        id: Date.now(),
        date: date,
        category: category,
        amount: formattedAmount,
        title: title,
        message: message,
        userId: user.email
    };
    
    expenses.push(expense);
    localStorage.setItem('finwise_transactions', JSON.stringify(expenses));
    
    showMessage('Расход успешно добавлен!', 'success');
    
    setTimeout(() => {
        // Redirect back to categories or dashboard
        window.location.href = 'categories.html';
    }, 1500);
}

// Open date picker
function openDatePicker() {
    console.log('Date picker opened');
    // In a real app, this would open a calendar date picker
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initAddExpensePage();
});

// Export functions
window.openDatePicker = openDatePicker;

