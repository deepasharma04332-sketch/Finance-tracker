from datetime import datetime, date
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

DEFAULT_CATEGORIES = [
    ("Salary", "income"),
    ("Freelance", "income"),
    ("Other Income", "income"),
    ("Food", "expense"),
    ("Rent", "expense"),
    ("Travel", "expense"),
    ("Shopping", "expense"),
    ("Bills & Utilities", "expense"),
    ("Entertainment", "expense"),
    ("Health", "expense"),
    ("Other Expense", "expense"),
]


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    categories = db.relationship("Category", backref="user", cascade="all, delete-orphan")
    transactions = db.relationship("Transaction", backref="user", cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "email": self.email}

    def seed_default_categories(self):
        for name, ctype in DEFAULT_CATEGORIES:
            db.session.add(Category(name=name, type=ctype, user_id=self.id))


class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    type = db.Column(db.String(10), nullable=False)  # 'income' or 'expense'

    transactions = db.relationship("Transaction", backref="category")

    def to_dict(self):
        return {"id": self.id, "name": self.name, "type": self.type}


class Transaction(db.Model):
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=False)
    amount = db.Column(db.Numeric(12, 2), nullable=False)
    type = db.Column(db.String(10), nullable=False)  # 'income' or 'expense'
    note = db.Column(db.String(255))
    date = db.Column(db.Date, nullable=False, default=date.today)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "amount": float(self.amount),
            "type": self.type,
            "note": self.note,
            "date": self.date.isoformat(),
            "category_id": self.category_id,
            "category_name": self.category.name if self.category else None,
        }
