document.addEventListener('DOMContentLoaded', function() {
    const welcomeText = document.getElementById('welcome-text');
    setTimeout(() => {
        welcomeText.classList.add('fade-in');
    }, 500); // Add a slight delay for the animation to start
});

const queryForm = document.getElementById('query-form');
const queryInput = document.getElementById('query-input');
const responseDiv = document.getElementById('response');
const finishingDashboard = document.getElementById('finishing-dashboard');

queryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = queryInput.value.trim();
    if (query) {
        const response = await fetch('/api/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });
        const data = await response.json();
        responseDiv.textContent = `Bot: ${data.response}`;
        queryInput.value = ''; // Clear the input field
        if (data.showDashboard) {
            finishingDashboard.style.display = 'block';
        } else {
            finishingDashboard.style.display = 'none';
        }
    }
});
