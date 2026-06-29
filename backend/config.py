import os
from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    # ---- Database ----
    # For local quick-start we default to SQLite (zero setup).
    # To use MySQL, set DATABASE_URL like:
    #   mysql+pymysql://username:password@localhost:3306/finance_tracker
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL", f"sqlite:///{os.path.join(basedir, 'finance.db')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # ---- JWT ----
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "change-this-secret-in-production")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=7)

    # ---- CORS ----
    CORS_ORIGINS = os.environ.get("CORS_ORIGINS", "http://localhost:5173")
