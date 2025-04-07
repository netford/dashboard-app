-- database/create-database.sql
-- Создание базы данных
CREATE DATABASE IF NOT EXISTS dashboard;
USE dashboard;

-- Создание таблицы для показателей
CREATE TABLE IF NOT EXISTS dashboard_indicators (
    id INT AUTO_INCREMENT PRIMARY KEY,
    indicator_name VARCHAR(255) NOT NULL,
    current_value DECIMAL(10, 2) NOT NULL,
    yesterday_value DECIMAL(10, 2) NOT NULL,
    weekday_value DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Вставка демо-данных (на основе показателей из изображения)
INSERT INTO dashboard_indicators 
    (indicator_name, current_value, yesterday_value, weekday_value) 
VALUES
    ('Выручка, руб', 500521.00, 480521.00, 4805121.00),
    ('Наличные', 300000.00, 300000.00, 300000.00),
    ('Безналичный расчет', 100000.00, 100000.00, 100000.00),
    ('Кредитные карты', 100521.00, 100521.00, 100521.00),
    ('Средний чек, руб', 1300.00, 900.00, 900.00),
    ('Средний гость, руб', 1200.00, 800.00, 800.00),
    ('Удаления из чека (после оплаты), руб', 1000.00, 1100.00, 900.00),
    ('Удаления из чека (до оплаты), руб', 1300.00, 1300.00, 900.00),
    ('Количество чеков', 34.00, 36.00, 34.00),
    ('Количество гостей', 34.00, 36.00, 32.00);