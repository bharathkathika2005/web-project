CREATE TABLE IF NOT EXISTS emergency_alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'processed', 'resolved') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id)
);