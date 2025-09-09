-- Create database and students table
CREATE DATABASE IF NOT EXISTS tallylite CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tallylite;

CREATE TABLE IF NOT EXISTS students (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  course VARCHAR(255) NOT NULL,
  duration VARCHAR(100),
  admission_date DATE,
  total_fees DECIMAL(12,2) DEFAULT 0,
  paid_fees DECIMAL(12,2) DEFAULT 0,
  remaining_fees DECIMAL(12,2) DEFAULT 0,
  contact VARCHAR(100),
  remarks TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
