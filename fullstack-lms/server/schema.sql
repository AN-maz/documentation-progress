-- 1. Buat Database
CREATE DATABASE IF NOT EXISTS `lms_gamified` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `lms_gamified`;

-- 2. Tabel Users
CREATE TABLE IF NOT EXISTS `users` (
  `id` CHAR(36) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('learner', 'admin') NOT NULL DEFAULT 'learner',
  `total_exp` INT NOT NULL DEFAULT 0,
  `level` INT NOT NULL DEFAULT 1,
  `total_points` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_users_email` (`email`),
  INDEX `idx_users_total_exp` (`total_exp` DESC)
) ENGINE=InnoDB;

-- 3. Tabel Categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `slug` VARCHAR(50) NOT NULL,
  `description` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_categories_name` (`name`),
  UNIQUE KEY `uk_categories_slug` (`slug`)
) ENGINE=InnoDB;

-- 4. Tabel Materials
CREATE TABLE IF NOT EXISTS `materials` (
  `id` CHAR(36) NOT NULL,
  `author_id` CHAR(36) NOT NULL,
  `category_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `cover_image_url` VARCHAR(500) NULL,
  `content` LONGTEXT NOT NULL COMMENT 'Markdown raw string',
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `rejection_reason` TEXT NULL,
  `average_rating` DECIMAL(3,2) NOT NULL DEFAULT 0.00,
  `ratings_count` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_materials_slug` (`slug`),
  INDEX `idx_materials_status` (`status`),
  CONSTRAINT `fk_materials_author` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_materials_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 5. Tabel Reading Progress
CREATE TABLE IF NOT EXISTS `reading_progress` (
  `id` CHAR(36) NOT NULL,
  `user_id` CHAR(36) NOT NULL,
  `material_id` CHAR(36) NOT NULL,
  `is_completed` TINYINT(1) NOT NULL DEFAULT 0,
  `exp_rewarded` TINYINT(1) NOT NULL DEFAULT 0,
  `completed_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_material_progress` (`user_id`, `material_id`),
  CONSTRAINT `fk_progress_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_progress_material` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. Tabel Ratings
CREATE TABLE IF NOT EXISTS `ratings` (
  `id` CHAR(36) NOT NULL,
  `user_id` CHAR(36) NOT NULL,
  `material_id` CHAR(36) NOT NULL,
  `rating_value` INT NOT NULL CHECK (`rating_value` BETWEEN 1 AND 5),
  `point_rewarded` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_material_rating` (`user_id`, `material_id`),
  CONSTRAINT `fk_ratings_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ratings_material` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7. Tabel Comments
CREATE TABLE IF NOT EXISTS `comments` (
  `id` CHAR(36) NOT NULL,
  `user_id` CHAR(36) NOT NULL,
  `material_id` CHAR(36) NOT NULL,
  `comment_text` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_comments_material` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Insert Seed Kategori Awal
INSERT INTO `categories` (`name`, `slug`, `description`) VALUES
('Teknologi & Pemrograman', 'teknologi-dan-pemrograman', 'Modul pengembangan perangkat lunak dan IT'),
('Bahasa', 'bahasa', 'Modul pembelajaran berbagai bahasa internasional'),
('Pengembangan Diri', 'pengembangan-diri', 'Materi soft skills, produktivitas, dan kepemimpinan');