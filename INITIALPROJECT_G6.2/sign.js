// Validate phone number to be numeric and limit it to 11 digits
function validatePhoneNumber(input) {
    input.value = input.value.replace(/\D/g, '');  // Remove non-numeric characters
    if (input.value.length > 11) {
        input.value = input.value.slice(0, 11);  // Limit to 11 digits
    }
}

// Handle the form submission and save the data
function handleSignUp(event) {
    event.preventDefault();  // Prevent form submission

    const firstName = document.getElementById('fn').value;
    const middleName = document.getElementById('mn').value;
    const lastName = document.getElementById('ln').value;
    const contactNumber = document.getElementById('cp').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        document.getElementById('password-match').style.display = 'block';
        return;
    } else {
        document.getElementById('password-match').style.display = 'none';
    }

    // Save user data in LocalStorage (for demo purposes)
    const userData = {
        firstName,
        middleName,
        lastName,
        contactNumber,
        email,
        password
    };

    // Check if there are existing users in LocalStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    // Confirmation alert
    alert('Sign-up successful! You can now log in with your new account.');

    // Optionally, clear the form
    document.getElementById('signup-form').reset();
}

// Add this at the end of your existing script
window.onload = function() {
    setTimeout(() => {
        document.querySelector('.overlay').style.opacity = '0'; // Start fading out
        document.querySelector('.signup-section').classList.add('show-signup'); // Slide in
        setTimeout(() => {
            document.querySelector('.overlay').style.display = 'none'; // Remove overlay after fading
        }, 500); // Match with transition duration
    }, 2000); // Show for 2 seconds
};

// sign.js

// Function to show signup section after the overlay
function showSignUp() {
    const overlay = document.querySelector('.overlay');
    const signupSection = document.querySelector('.signup-section');
    
    // Hide overlay after 2 seconds
    setTimeout(() => {
        document.querySelector('.overlay').style.opacity = '0'; // Start fading out
        document.querySelector('.signup-section').classList.add('show-signup'); // Slide in
    }, 2000); // Show for 2 seconds
}

// Call this function on page load to show the sign-up section
document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.querySelector('.overlay');
    const signupSection = document.querySelector('.signup-section');

    // Show overlay for 2 seconds then slide in signup section
    setTimeout(() => {
        overlay.style.opacity = '0'; // Start fading out the overlay
        setTimeout(() => {
            overlay.style.display = 'none'; // Remove overlay from DOM
            signupSection.classList.add('show-signup'); // Slide in signup section
        }, 500); // Delay to allow the fade out to complete
    }, 2000); // Show overlay for 2 seconds
});

// After both sections have combined
setTimeout(() => {
    document.querySelector('.header').classList.remove('hidden'); // Show header
  }, 1000); // Adjust the timing as needed