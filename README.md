Personal Finance Tracker-------!

A simple web app I built to track my own income and expenses — mainly to actually use for my monthly budgeting, and also to get hands-on practice connecting a React frontend to a Flask backend with a real database instead of just dumping everything in localStorage.

What it does-------!

Sign up / log in (JWT auth, passwords hashed)
Add income or expense entries — category, amount, date, and a note
Edit or delete any entry
Dashboard showing total income, total expense, and savings for whichever month you pick
Pie chart for expense breakdown by category
Line chart comparing income vs expense over the last 6 months
Default categories (Salary, Food, Rent, etc.) get created automatically when you sign up, so you're not starting from a blank slate.

Tech stack-------!

React (Vite) + Tailwind CSS + Recharts on the frontend
Flask + SQLAlchemy + Flask-JWT-Extended on the backend
MySQL for the database (SQLite also works and is the default for local testing, so there's nothing extra to install).

Folder structure-------!
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
        
Running it locally

Backend-------!
cd backend
pip install -r requirements.txt
cp .env.example .env
python app.py
Runs on http://localhost:5000. Uses SQLite by default, so you can just run it as-is.
Want MySQL instead? Create a database and update DATABASE_URL in .env:
DATABASE_URL=mysql+pymysql://root:yourpassword@localhost:3306/finance_tracker

Frontend-------!
cd frontend
npm install
cp .env.example .env
npm run dev
Runs on http://localhost:5173.

API routes-------!

POST /api/auth/signup — register
POST /api/auth/login — login
GET/POST /api/categories — list / add categories
GET/POST/PUT/DELETE /api/transactions — manage transactions
GET /api/summary/monthly — totals + category breakdown for a month
GET /api/summary/trend — income vs expense over last N months.
