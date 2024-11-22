// Show the login form
function showLogin() {
  var body = document.body;

  // Toggle between show-login and hide-login classes
  if (!body.classList.contains('show-login')) {
    body.classList.add('show-login');
    body.classList.remove('hide-login');
  } else {
    body.classList.remove('show-login');
    body.classList.add('hide-login');
  }

  // Prevent navigation changes or reloads
  event.preventDefault();
}

// Login handler
function handleLogin(event) {
  event.preventDefault();  // Prevent form submission

  // Get the email and password values from the form
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Retrieve users from localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Check if a user with the entered email and password exists
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    alert('Login successful! Welcome, ' + user.firstName + ' ' + user.lastName);
    
    // Redirect to task.html after successful login
    window.location.href = 'task.html'; 
  } else {
    alert('Invalid email or password. Please try again.');
  }
}

window.onload = function() {
  const animationContainer = document.getElementById('animation-container');
  const gotscheduleText = document.getElementById('gotschedule-text');
  const loginSection = document.querySelector('.login-section');

  // Show GIF for 5 seconds
  setTimeout(() => {
      // Show the GOTSCHEDULE text
      gotscheduleText.style.opacity = '1';
      gotscheduleText.style.transform = 'scale(1)';

      // After 2 seconds, transition to the login page
      setTimeout(() => {
          // Start closing effect with bounce
          gotscheduleText.style.transform = 'scale(0)';

          // Wait for the transition to finish
          setTimeout(() => {
              animationContainer.classList.add('hidden'); // Hide animation container
              loginSection.classList.remove('hidden'); // Show login section
              
              // Add delay before changing background colors
              setTimeout(() => {
                  // Add combining effect for both sections
                  document.querySelector('.login-box').classList.add('slide-in-left'); // Move the login box left
                  document.querySelector('.color-effect').classList.add('slide-in'); // Move the color effect right
              }, 1000); // 1 second delay for merging effect
          }, 1000); // Match with the CSS transition duration
      }, 2000); // Time to show the text
  }, 5000); // Time to show the GIF
};

// After both sections have combined
setTimeout(() => {
  document.querySelector('.header').classList.remove('hidden'); // Show header
}, 9000); // Adjust the timing as needed
