// Chart rendering for Analysis page

// Simple bar chart implementation without external libraries
function drawBarChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    ctx.setLineDash([]);

    // Draw Y-axis labels
    ctx.fillStyle = '#80B39F';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'right';
    const yLabels = ['15k', '10k', '5k', '1k', '0'];
    
    for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight / 4) * i;
        ctx.fillText(yLabels[i], padding - 10, y + 4);
    }

    // Draw bars
    const barWidth = chartWidth / (data.length * 3);
    const maxValue = 15;
    
    data.forEach((item, index) => {
        const x = padding + (chartWidth / data.length) * (index + 0.5);
        
        // Income bar (teal)
        const incomeHeight = (item.income / maxValue) * chartHeight;
        ctx.fillStyle = '#20C997';
        ctx.fillRect(x - barWidth, height - padding - incomeHeight, barWidth, incomeHeight);
        
        // Expense bar (blue)
        const expenseHeight = (item.expenses / maxValue) * chartHeight;
        ctx.fillStyle = '#4A90E2';
        ctx.fillRect(x, height - padding - expenseHeight, barWidth, expenseHeight);
    });

    // Draw X-axis labels
    ctx.fillStyle = '#333';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    
    data.forEach((item, index) => {
        const x = padding + (chartWidth / data.length) * (index + 0.5);
        ctx.fillText(item.label, x, height - padding + 20);
    });
}

// Demo data for weeks chart
const weeksData = [
    { label: '1st Week', income: 5, expenses: 10 },
    { label: '2nd Week', income: 2, expenses: 4 },
    { label: '3rd Week', income: 4, expenses: 8 },
    { label: '4th Week', income: 3, expenses: 7 }
];

// Demo data for days chart
const daysData = [
    { label: 'Mon', income: 4, expenses: 7 },
    { label: 'Tue', income: 6, expenses: 5 },
    { label: 'Wed', income: 5, expenses: 8 },
    { label: 'Thu', income: 7, expenses: 6 },
    { label: 'Fri', income: 9, expenses: 8 },
    { label: 'Sat', income: 4, expenses: 5 },
    { label: 'Sun', income: 3, expenses: 4 }
];

// Initialize chart when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check which chart to draw based on active button
    const activeButton = document.querySelector('.time-btn.active');
    
    if (activeButton) {
        const period = activeButton.textContent;
        
        // Draw appropriate chart
        if (period === 'Недели' || period === 'Weeks') {
            drawBarChart('analysisChart', weeksData);
        } else if (period === 'Дни' || period === 'Days') {
            drawBarChart('analysisChart', daysData);
        } else {
            drawBarChart('analysisChart', weeksData);
        }
    } else {
        // Default to weeks
        drawBarChart('analysisChart', weeksData);
    }

    // Listen for time period changes
    const timeButtons = document.querySelectorAll('.time-btn');
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const period = this.textContent;
            
            // Wait for active class to be applied
            setTimeout(() => {
                if (period === 'Недели' || period === 'Weeks') {
                    drawBarChart('analysisChart', weeksData);
                } else if (period === 'Дни' || period === 'Days') {
                    drawBarChart('analysisChart', daysData);
                }
            }, 100);
        });
    });

    // Redraw chart on window resize
    window.addEventListener('resize', function() {
        const activeButton = document.querySelector('.time-btn.active');
        if (activeButton) {
            const period = activeButton.textContent;
            
            if (period === 'Недели' || period === 'Weeks') {
                drawBarChart('analysisChart', weeksData);
            } else if (period === 'Дни' || period === 'Days') {
                drawBarChart('analysisChart', daysData);
            } else {
                drawBarChart('analysisChart', weeksData);
            }
        }
    });
});

