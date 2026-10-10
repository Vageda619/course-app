const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Подключение к PostgreSQL (хост — имя сервиса в compose, т.е. 'db')
const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Проверка, что backend жив
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Кнопка 1: получить курсы из БД
app.get('/api/courses', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM registered_courses ORDER BY id DESC'
        );
        res.json(result.rows);
    } catch (err) {
        console.error('DB error:', err.message);
        res.status(500).json({ error: 'Ошибка базы данных' });
    }
});

// Кнопка 2: поиск курсов через web-service
app.get('/api/search', async (req, res) => {
    const category = req.query.category || '';
    try {
        const response = await axios.get(`${process.env.WEB_SERVICE_URL}/courses`, {
            params: { category },
            timeout: 5000,
        });
        res.json(response.data);
    } catch (err) {
        console.error('Web-service error:', err.message);
        res.status(500).json({ error: 'Ошибка web-сервиса' });
    }
});

// Дополнительно: добавление курса в БД (кнопка "Зарегистрировать")
app.post('/api/courses', async (req, res) => {
    const { title, category, provider } = req.body;
    if (!title || !category) {
        return res.status(400).json({ error: 'Нужны поля title и category' });
    }
    try {
        const result = await pool.query(
            `INSERT INTO registered_courses (title, category, provider)
       VALUES ($1, $2, $3) RETURNING *`,
            [title, category, provider || null]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('DB error:', err.message);
        res.status(500).json({ error: 'Ошибка базы данных' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
});