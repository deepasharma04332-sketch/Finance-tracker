# Personal Finance Tracker

A simple web app to track my income and expenses, see where my money is going each month, and check spending trends over time.

Built this to actually use for my own monthly budgeting, and to practice connecting a React frontend to a Flask backend with a proper database instead of just localStorage.

## What it does

- Sign up / log in (JWT based auth, passwords hashed)
- Add income or expense entries with category, amount, date and a note
- Edit or delete any entry
- Dashboard showing total income, total expense and savings for a selected month
- Pie chart for expense breakdown by category
- Line chart comparing income vs expense for the last 6 months
- Default categories (Salary, Food, Rent, etc.) get created automatically when you sign up

## Tech stack

- React (Vite) + Tailwind CSS + Recharts for the frontend
- Flask + SQLAlchemy + Flask-JWT-Extended for the backend
- MySQL for the database (SQLite works too, that's the default for local testing)

## Folder structure

```
finance-tracker/
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── models.py
│   └── routes/
│       ├── auth.py
│       ├── categories.py
│       ├── transactions.py
│       └── summary.py
└── frontend/
    └── src/
        ├── api/
        ├── context/
        ├── components/
        ├── charts/
        └── pages/
```

## Running it locally

### Backend

```
cd backend
pip install -r requirements.txt
cp .env.example .env
python app.py
```

Runs on `http://localhost:5000`. Uses SQLite by default so there's nothing extra to set up.

If you want to switch to MySQL, create a database and update `DATABASE_URL` in `.env`:
```
DATABASE_URL=mysql+pymysql://root:yourpassword@localhost:3306/finance_tracker
```

### Frontend

```
cd frontend
npm install
cp .env.example .env
npm run dev
```

Runs on `http://localhost:5173`.

## API routes

- `POST /api/auth/signup` — register
- `POST /api/auth/login` — login
- `GET/POST /api/categories` — list / add categories
- `GET/POST/PUT/DELETE /api/transactions` — manage transactions
- `GET /api/summary/monthly` — totals + category breakdown for a month
- `GET /api/summary/trend` — income vs expense over last N months

## Things I'd still like to add

- Export transactions as CSV
- Budget limits per category
- Deploy it properly (backend on Render, frontend on Vercel)
