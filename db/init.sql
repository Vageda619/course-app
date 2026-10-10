CREATE TABLE IF NOT EXISTS registered_courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(120) NOT NULL,
    provider VARCHAR(255),
    registered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO registered_courses (title, category, provider) VALUES
('Python для начинающих', 'Программирование', 'Stepik'),
('SQL для анализа данных', 'Базы данных', 'Stepik'),
('Английский для IT', 'Языки', 'Skyeng');