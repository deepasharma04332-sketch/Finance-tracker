#  Personal Finance Tracker

A full-stack personal finance management web application built to help users track their **income, expenses, savings, and monthly spending patterns** in one place.

The project was built not only as a budgeting tool, but also as a hands-on full-stack development project to understand how a **React frontend communicates with a Flask backend and a real relational database** instead of relying only on browser storage.

---

## 📌 Project Overview

Managing personal finances manually can make it difficult to understand where money is being spent and how much is being saved.

**Personal Finance Tracker** provides a simple dashboard where users can securely manage their financial transactions and analyze their spending habits.

Users can:

* Create an account and log in securely.
* Add income and expense transactions.
* Categorize transactions.
* Edit or delete transactions.
* Select a particular month and view its financial summary.
* View total income, total expenses, and savings.
* Analyze expenses using category-based charts.
* Compare income and expenses over the last several months.

---

## ✨ Features

### 🔐 Authentication

* User registration and login.
* JWT-based authentication.
* Password hashing for secure password storage.
* Protected API routes.
* User-specific financial data.

### 💵 Income & Expense Management

Users can create financial transactions with:

* Transaction type — Income / Expense
* Amount
* Category
* Date
* Note

Users can also:

* Add transactions
* View transactions
* Edit transactions
* Delete transactions

---

### 📊 Financial Dashboard

The dashboard provides an overview of the user's finances for a selected month.

It displays:

* Total Income
* Total Expenses
* Total Savings
* Expense breakdown
* Income vs Expense trends

### 🥧 Expense Breakdown

A pie chart visualizes expenses based on categories such as:

* Food
* Rent
* Shopping
* Transportation
* Bills
* Entertainment
* Other expenses

This helps users understand where most of their money is being spent.

### 📈 Income vs Expense Trend

A line chart compares **income and expenses over the last 6 months**.

This makes it easier to identify:

* Spending trends
* Income changes
* Months with higher expenses
* Savings patterns

---

## 🗂️ Automatic Categories

When a new user signs up, commonly used categories are automatically created.

Example default categories:

```text
Salary
Food
Rent
Shopping
Transportation
Bills
Entertainment
Other
```

This means users can start tracking their finances immediately without manually creating categories first.

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* Recharts
* JavaScript

## Backend

* Python
* Flask
* Flask-JWT-Extended
* SQLAlchemy

## Database

* MySQL
* SQLite

SQLite is supported for local development and testing, so users can run the project without installing a separate database server.

---

# 🏗️ System Architecture

The application follows a basic full-stack architecture:

```text
              ┌──────────────────────┐
              │      React UI        │
              │  Vite + Tailwind     │
              └──────────┬───────────┘
                         │
                         │ HTTP / REST API
                         ▼
              ┌──────────────────────┐
              │    Flask Backend     │
              │    REST API + JWT    │
              └──────────┬───────────┘
                         │
                         │ SQLAlchemy
                         ▼
              ┌──────────────────────┐
              │      Database        │
              │   MySQL / SQLite     │
              └──────────────────────┘
```

---

# 📁 Project Structure

```text
finance-tracker/
│
├── backend/
│   │
│   ├── app.py
│   ├── config.py
│   ├── models.py
│   │
│   └── routes/
│       ├── auth.py
│       ├── categories.py
│       ├── transactions.py
│       └── summary.py
│
└── frontend/
    │
    └── src/
        │
        ├── api/
        ├── context/
        ├── components/
        ├── charts/
        └── pages/
```

---

# 🔄 Application Workflow

The overall application workflow is:

```text
User Registration
       ↓
Default Categories Created
       ↓
User Login
       ↓
JWT Authentication
       ↓
Dashboard
       ↓
Add Income / Expense
       ↓
Transaction Stored in Database
       ↓
Monthly Summary Generated
       ↓
Charts & Financial Insights
```

---

# 🔌 API Endpoints

The Flask backend exposes REST APIs for authentication, categories, transactions, and financial summaries.

## Authentication

### Register

```http
POST /api/auth/signup
```

Creates a new user account.

### Login

```http
POST /api/auth/login
```

Authenticates the user and returns a JWT token.

---

## Categories

### Get Categories

```http
GET /api/categories
```

Returns the user's available categories.

### Add Category

```http
POST /api/categories
```

Creates a new custom category.

---

## Transactions

### Get Transactions

```http
GET /api/transactions
```

Returns the user's transactions.

### Add Transaction

```http
POST /api/transactions
```

Creates a new income or expense transaction.

### Update Transaction

```http
PUT /api/transactions/<id>
```

Updates an existing transaction.

### Delete Transaction

```http
DELETE /api/transactions/<id>
```

Deletes a transaction.

---

## Financial Summary

### Monthly Summary

```http
GET /api/summary/monthly
```

Returns:

* Total income
* Total expenses
* Savings
* Category-wise expense breakdown

---

### Monthly Trend

```http
GET /api/summary/trend
```

Returns income and expense trends for the requested number of months.

Example:

```text
Last 6 Months
```

---

# 🧮 Financial Calculations

The application calculates savings using:

```text
Savings = Total Income - Total Expenses
```

For example:

```text
Income     = ₹50,000
Expenses   = ₹32,000
--------------------
Savings    = ₹18,000
```

The dashboard automatically updates these values based on the user's transactions.

---

# 🖥️ Getting Started

## Prerequisites

Make sure the following are installed:

* Python 3.x
* Node.js
* npm

For MySQL usage:

* MySQL Server
* MySQL client or MySQL Workbench

SQLite can be used for local testing without installing MySQL.

---

# ⚙️ Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

Run the Flask backend:

```bash
python app.py
```

The backend will start on the configured local Flask server.

---

# 🎨 Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at the local development URL provided by Vite.

---

# 🗄️ Database Configuration

The application supports both:

### SQLite

Recommended for quick local development and testing.

No separate database server is required.

### MySQL

MySQL can be configured for a more production-like database setup.

Database configuration can be managed through:

```text
backend/config.py
```

---

# 🔐 Security

The application includes basic security mechanisms such as:

* JWT-based authentication
* Password hashing
* Protected API endpoints
* User-specific transaction access
* Backend validation

Passwords are not stored as plain text.

---

# 📊 Dashboard Components

The dashboard is designed around the following key components:

| Component               | Purpose                                   |
| ----------------------- | ----------------------------------------- |
| Total Income            | Shows total income for the selected month |
| Total Expense           | Shows total expenses                      |
| Savings                 | Shows income minus expenses               |
| Expense Pie Chart       | Shows spending by category                |
| Income vs Expense Chart | Shows financial trends                    |
| Transaction List        | Displays individual transactions          |
| Category Management     | Allows users to manage categories         |

---

# 🎯 Project Goals

This project was developed with two main goals:

### 1. Practical Finance Management

To build a simple application that can actually be used to track monthly personal finances.

### 2. Full-Stack Development Practice

To gain practical experience with:

* React frontend development
* REST API development
* Flask backend development
* JWT authentication
* Database integration
* SQLAlchemy ORM
* API communication
* Data visualization
* Full-stack application architecture

---

# 🚀 Future Improvements

Possible future improvements include:

* Budget limits for individual categories
* Monthly budget alerts
* Recurring transactions
* Export transactions to CSV/PDF
* Advanced filtering and search
* Dark mode
* Mobile-responsive improvements
* Financial goal tracking
* Savings goals
* Yearly financial reports
* Spending predictions
* AI-powered financial insights
* Email notifications
* Cloud database integration
* Deployment using Docker
* Production deployment

---

# 💡 Future AI Features

An advanced version of the project could include AI-based features such as:

* Automatic spending pattern analysis
* Personalized saving suggestions
* Expense prediction
* Unusual spending detection
* Monthly financial summaries
* AI-generated budgeting recommendations

Example:

```text
"You spent 18% more on food this month compared
to the previous month."
```

---

# 📸 Screenshots

Add screenshots of the application here after completing the UI.

Example:

```text
screenshots/
├── login.png
├── signup.png
├── dashboard.png
├── transactions.png
└── charts.png
```

Then they can be displayed in the README using Markdown:

```markdown
![Dashboard](screenshots/dashboard.png)
```

---

# 📚 Learning Outcomes

Through this project, the following concepts were practiced:

* Frontend development with React
* Component-based UI development
* REST API integration
* Flask backend development
* JWT authentication
* Password hashing
* Database design
* SQLAlchemy ORM
* MySQL integration
* SQLite development
* CRUD operations
* Data visualization
* API-based communication
* Full-stack project structure

---

# 🤝 Contributing

Contributions and suggestions are welcome.

If you want to improve the project:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Push the branch.
6. Create a Pull Request.

---

# 📄 License

This project is developed for educational and personal learning purpose.


----------!
