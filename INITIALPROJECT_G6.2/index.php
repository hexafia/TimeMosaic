<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$conn = mysqli_connect("localhost", "root", "", "sign_up");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Handle login
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['login'])) {
    $email = $_POST['login-email'];
    $password = $_POST['login-password'];

    // Prepare SQL query to select user
    $stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashedPassword);
        $stmt->fetch();
        
        // Verify password
        if (password_verify($password, $hashedPassword)) {
            // Successful login, redirect to home page or set session
            header("Location: task.html"); // Better practice for redirection
            exit();
        } else {
            $loginError = "Invalid password.";
        }
    } else {
        $loginError = "No user found with that email address.";
    }
    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - GS</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="main.css">
</head>
<body>

    <!-- Animation Container -->
    <div id="animation-container">
      <img id="background-gif" src="multi.gif" alt="Loading...">
      <div id="gotschedule-text">GOTSCHEDULE</div>
    </div>
  
    <!-- The login section -->
    <div class="login-section show-login hidden">
      <div class="login-box slide-in-left">
        <h2>Log In</h2>
        <form id="login-form" method="POST">
          <div class="mb-3">
            <label for="login-email" class="form-label">Email address</label>
            <input type="email" class="form-control" name="login-email" id="login-email" placeholder="Enter your email here" required>
          </div>
          <div class="mb-3">
            <label for="login-password" class="form-label">Password</label>
            <input type="password" class="form-control" name="login-password" id="login-password" placeholder="Enter your password here" required>
          </div>
          <button type="submit" name="login" class="btn btn-primary">Log In</button>
        </form>
        <?php if (isset($loginError)): ?>
            <div class='alert alert-danger mt-3'><?= $loginError; ?></div>
        <?php endif; ?>
        <p>Don't have an account? <a href="sign.php">Sign Up</a></p>
      </div>
  
      <div class="color-effect slide-in"></div>
    </div>

    <header class="header hidden">
        <div class="container d-flex justify-content-between align-items-center">
          <div class="logo bounce-logo">
            <h1>GotSchedule</h1>
          </div>
          <nav>
            <a href="#" class="custom-link me-3">Home</a>
            <a href="about.html" class="custom-link me-3">About</a>
            <a href="main.php" class="custom-link">Login</a>
          </nav>
        </div>
    </header>
  
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="main.js"></script>
</body>
</html>
