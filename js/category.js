// Category Detail JavaScript

// Category data
const categories = {
    food: {
        title: 'Food',
        icon: '🍽️',
        expenses: [
            { month: 'April', items: [
                { name: 'Dinner', time: '18:27 - 30', cost: '-$26,00' },
                { name: 'Delivery Pizza', time: '15:00 - 24', cost: '-$18,35' },
                { name: 'Lunch', time: '12:30 - 15', cost: '-$15,40' },
                { name: 'Brunch', time: '9:30 - 08', cost: '-$12,13' }
            ]},
            { month: 'March', items: [
                { name: 'Dinner', time: '20:50 - 31', cost: '-$27,20' }
            ]}
        ]
    },
    transport: {
        title: 'Transport',
        icon: '🚌',
        expenses: [
            { month: 'March', items: [
                { name: 'Fuel', time: '18:27 - 30', cost: '-$3.53' },
                { name: 'Car Parts', time: '15:00 - 30', cost: '-$26.75' }
            ]},
            { month: 'February', items: [
                { name: 'New Tires', time: '12:47 - 10', cost: '-$373.99' },
                { name: 'Car Wash', time: '9:30 - 09', cost: '-$9.74' },
                { name: 'Public Transport', time: '7:50 - 01', cost: '-$1.24' }
            ]}
        ]
    },
    groceries: {
        title: 'Groceries',
        icon: '🛒',
        expenses: [
            { month: 'March', items: [
                { name: 'Pantry', time: '18:27 - 10', cost: '-$53.59' },
                { name: 'Snacks', time: '15:00 - 01', cost: '-$35.03' }
            ]},
            { month: 'February', items: [
                { name: 'Canned Food', time: '10:47 - 30', cost: '-$11.82' },
                { name: 'Veggies', time: '7:30 - 20', cost: '-$14.79' },
                { name: 'Groceries', time: '18:50 - 01', cost: '-$175,35' }
            ]}
        ]
    },
    rent: {
        title: 'Rent',
        icon: '🔑',
        expenses: [
            { month: 'April', items: [
                { name: 'Rent', time: '18:27 - 15', cost: '-$674,40' }
            ]},
            { month: 'March', items: [
                { name: 'Rent', time: '18:27 - 15', cost: '-$674,40' }
            ]},
            { month: 'February', items: [
                { name: 'Rent', time: '18:27 - 15', cost: '-$674,40' }
            ]},
            { month: 'January', items: [
                { name: 'Rent', time: '18:27 - 15', cost: '-$674,40' }
            ]}
        ]
    },
    entertainment: {
        title: 'Entertainment',
        icon: '🎬',
        expenses: [
            { month: 'April', items: [
                { name: 'Cinema', time: '20:15 - 29', cost: '-$30,00' },
                { name: 'Netflix', time: '16:15 - 12', cost: '-$12,27' },
                { name: 'Karaoke', time: '18:00 - 05', cost: '-$10,00' }
            ]},
            { month: 'March', items: [
                { name: 'Video Game', time: '20:50 - 24', cost: '-$60,20' },
                { name: 'Netflix', time: '16:15 - 12', cost: '-$12,27' }
            ]}
        ]
    },
    medicine: {
        title: 'Medicine',
        icon: '💊',
        expenses: [
            { month: 'April', items: [
                { name: 'Acetaminophen', time: '12:11 - 30', cost: '-$2.00' },
                { name: 'Vitamin C', time: '10:30 - 20', cost: '-$8.20' },
                { name: 'Muscle Pain Cream', time: '14:15 - 15', cost: '-$10.13' },
                { name: 'Aspirin', time: '9:45 - 08', cost: '-$2.20' }
            ]}
        ]
    },
    gifts: {
        title: 'Gifts',
        icon: '🎁',
        expenses: [
            { month: 'April', items: [
                { name: 'Perfume', time: '10:27 - 28', cost: '-$30,00' },
                { name: 'Make-Up', time: '16:28 - 15', cost: '-$60,35' }
            ]},
            { month: 'March', items: [
                { name: 'Teddy Bear', time: '8:30 - 10', cost: '-$20,00' },
                { name: 'Cooking Lessons', time: '14:24 - 02', cost: '-$128,00' }
            ]},
            { month: 'February', items: [
                { name: 'Toys For Dani', time: '11:15 - 18', cost: '-$50,20' }
            ]}
        ]
    },
    savings: {
        title: 'Savings',
        icon: '💰',
        expenses: []
    }
};

// Initialize category page
function initCategoryPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    
    if (!category || !categories[category]) {
        window.location.href = 'categories.html';
        return;
    }
    
    const categoryData = categories[category];
    
    // Update title
    document.getElementById('categoryTitle').textContent = categoryData.title;
    
    // Update current month
    const currentDate = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMonth = months[currentDate.getMonth()];
    document.getElementById('currentMonth').textContent = currentMonth;
    
    // Load expenses
    loadExpenses(categoryData);
}

// Load expenses for category
function loadExpenses(categoryData) {
    const container = document.getElementById('expensesList');
    if (!container) return;
    
    let html = '';
    
    categoryData.expenses.forEach(monthData => {
        html += `<h2 class="month-header">${monthData.month}</h2>`;
        
        monthData.items.forEach(item => {
            html += `
                <div class="expense-item">
                    <div class="expense-icon-small">${categoryData.icon}</div>
                    <div class="expense-details">
                        <p class="expense-name">${item.name}</p>
                        <p class="expense-time">${item.time}</p>
                    </div>
                    <div class="expense-cost">${item.cost}</div>
                </div>
            `;
        });
    });
    
    container.innerHTML = html;
}

// Show calendar
function showCalendar() {
    console.log('Calendar opened');
    // In a real app, this would open a calendar picker
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initCategoryPage();
});

// Export functions
window.showCalendar = showCalendar;

