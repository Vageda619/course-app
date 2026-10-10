# Лабораторная работа: Docker Compose (вариант 10)

Тема: «Курсы и обучение». Приложение из 4 контейнеров: frontend, backend, db, web-service.

## Запуск

```bash
docker compose up --build -d
```

Открыть: http://localhost:8080

## Остановка

```bash
docker compose down
```

Полный сброс (удалить данные БД):

```bash
docker compose down -v
```

## Функциональность

1. Кнопка «Показать мои курсы (из БД)» — backend читает курсы из PostgreSQL.
2. Кнопка «Найти курсы» — backend обращается к web-service, который фильтрует курсы по категории.
3. Кнопка «Зарегистрировать» — сохраняет найденный курс в БД.