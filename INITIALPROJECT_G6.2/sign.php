<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = mysqli_connect("localhost", "root", "", "sign_up");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if (isset($_POST['register'])) {
    // Get all fields from the form
    $firstName = $_POST['first_name'];
    $middleName = $_POST['middle_name'];
    $lastName = $_POST['last_name'];
    $contactNumber = $_POST['contact_number'];
    $country = $_POST['country'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirm-password'];

    // Check if passwords match
    if ($password !== $confirmPassword) {
        echo "Passwords do not match.";
    } else {
        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        // Prepare SQL query to insert data
        $stmt = $conn->prepare("INSERT INTO users (first_name, middle_name, last_name, contact_number, country, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssss", $firstName, $middleName, $lastName, $contactNumber, $country, $email, $hashedPassword);

        // Execute the statement
        if ($stmt->execute()) {
            echo "Registration Successful";
        } else {
            echo "Registration Failed: " . $stmt->error;
        }

        $stmt->close();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="sign.css">
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            document.getElementById('signup-form').addEventListener('submit', function(e) {
                const password = document.querySelector('input[name="password"]').value;
                const confirmPassword = document.querySelector('input[name="confirm-password"]').value;
                
                if (password !== confirmPassword) {
                    e.preventDefault(); // Prevent form submission
                    document.getElementById('password-match').style.display = 'block'; // Show error message
                } else {
                    document.getElementById('password-match').style.display = 'none'; // Hide error message
                }
            });
        });
    </script>
</head>
<body>

<header class="header hidden">
    <div class="container d-flex justify-content-between align-items-center">
        <div class="logo bounce-logo">
            <h1>GotSchedule</h1>
        </div>
        <nav>
            <a href="main.php" class="custom-link me-3">Home</a>
            <a href="about.html" class="custom-link me-3">About</a>
        </nav>
    </div>
</header>

<div class="overlay">
    <div class="signup-message">SIGN UP</div>
</div>
<div class="signup-section">
    <div class="left-effect"></div>
    <div class="right-effect"></div>
    <div class="signup-box">
        <h2>Sign Up</h2>
        <form id="signup-form" method="POST" action="sign.php">
            <div class="mb-3">
                <label for="first_name" class="form-label">First Name</label>
                <input type="text" class="form-control" name="first_name" placeholder="Enter your first name" required>
            </div>
            <div class="mb-3">
                <label for="middle_name" class="form-label">Middle Name</label>
                <input type="text" class="form-control" name="middle_name" placeholder="Enter your middle name" required>
            </div>
            <div class="mb-3">
                <label for="last_name" class="form-label">Last Name</label>
                <input type="text" class="form-control" name="last_name" placeholder="Enter your last name" required>
            </div>
            <div class="mb-3">
                <label for="contact_number" class="form-label">Contact Number (11 digits)</label>
                <input type="text" class="form-control" name="contact_number" placeholder="Enter your contact number" required pattern="\d{11}" maxlength="11">
                <small class="form-text text-muted">Please enter an 11-digit phone number.</small>
            </div>
            <div class="mb-3">
                <label for="country" class="form-label">Country</label>
                <select class="form-select" name="country" required>
                    <option value="" selected disabled>Select your country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="PH">Philippines</option>
                    <option value="GB">United Kingdom</option>
                    <option value="KR">South Korea</option>
                    <option value="JP">Japan</option>
                    <option value="CN">China</option>
                    <option value="TH">Thailand</option>
                    <option value="ID">Indonesia</option>
                    <option value="RU">Russia</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" class="form-control" name="email" placeholder="Enter your email address" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" name="password" placeholder="Enter your password" required>
            </div>
            <div class="mb-3">
                <label for="confirm-password" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" name="confirm-password" placeholder="Confirm your password" required>
                <small id="password-match" class="form-text text-danger" style="display: none;">Passwords do not match.</small>
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="terms" required>
                <label class="form-check-label" for="terms">I agree to the <a href="#">terms and conditions</a></label>
            </div>
            <button type="submit" name="register" class="btn btn-primary">Sign Up</button>
        </form>
    </div>
</div>


  <!-- Button to return to the main page -->
  <a href="main.php" class="btn return-btn">Go Back to Main Page</a>
</div>


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="sign.js"></script>
</body>
</html>