<?php
header('Content-Type: application/json');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = array();
    
    // Get form data
    $firstName = filter_input(INPUT_POST, 'firstName', FILTER_SANITIZE_STRING);
    $lastName = filter_input(INPUT_POST, 'lastName', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];
    
    // Validate input
    if (empty($firstName) || empty($lastName) || empty($email) || empty($password)) {
        $response['success'] = false;
        $response['message'] = 'All fields are required';
        echo json_encode($response);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['success'] = false;
        $response['message'] = 'Invalid email format';
        echo json_encode($response);
        exit;
    }
    
    try {
        // Check if email already exists
        $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
        $stmt->execute([$email]);
        
        if ($stmt->rowCount() > 0) {
            $response['success'] = false;
            $response['message'] = 'Email already registered';
            echo json_encode($response);
            exit;
        }
        
        // Hash password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        
        // Insert user
        $stmt = $pdo->prepare('INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)');
        $stmt->execute([$firstName, $lastName, $email, $hashedPassword]);
        
        $response['success'] = true;
        $response['message'] = 'Registration successful';
    } catch(PDOException $e) {
        $response['success'] = false;
        $response['message'] = 'Registration failed: ' . $e->getMessage();
    }
    
    echo json_encode($response);
}
?>