// Update the current date in the status bar
function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    const now = new Date();
    dateElement.textContent = now.toISOString();
}

// Initialize the page
function init() {
    updateCurrentDate();
    // Update the date every second
    setInterval(updateCurrentDate, 1000);
}

// Start when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 