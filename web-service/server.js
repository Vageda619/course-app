const express = require('express');
const app = express();

const PORT = 4000;

// «База» курсов, которую якобы отдаёт внешний сервис
const courses = [
    { id: 1, title: 'Python для начинающих', category: 'Программирование', provider: 'Stepik' },
    { id: 2, title: 'Веб-разработка', category: 'Программирование', provider: 'HTML Academy' },
    { id: 3, title: 'Data Science: введение', category: 'Data Science', provider: 'Coursera' },
    { id: 4, title: 'Машинное обучение', category: 'Data Science', provider: 'Coursera' },
    { id: 5, title: 'Английский для IT', category: 'Языки', provider: 'Skyeng' },
    { id: 6, title: 'Основы дизайна', category: 'Дизайн', provider: 'Skillbox' },
    { id: 7, title: 'SQL для анализа данных', category: 'Базы данных', provider: 'Stepik' },
    { id: 8, title: 'DevOps: CI/CD', category: 'DevOps', provider: 'OTUS' },
];

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Поиск курсов по категории (регистр не важен)
app.get('/courses', (req, res) => {
    const category = (req.query.category || '').toLowerCase().trim();
    const result = category
        ? courses.filter(c => c.category.toLowerCase().includes(category))
        : courses;
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Web-service listening on port ${PORT}`);
});