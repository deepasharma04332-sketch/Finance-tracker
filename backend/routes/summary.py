from datetime import date
from dateutil.relativedelta import relativedelta
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import extract, func
from models import db, Transaction, Category

summary_bp = Blueprint("summary", __name__, url_prefix="/api/summary")


@summary_bp.route("/monthly", methods=["GET"])
@jwt_required()
def monthly_summary():
    user_id = get_jwt_identity()
    today = date.today()
    year = request.args.get("year", default=today.year, type=int)
    month = request.args.get("month", default=today.month, type=int)

    base_query = Transaction.query.filter(
        Transaction.user_id == user_id,
        extract("year", Transaction.date) == year,
        extract("month", Transaction.date) == month,
    )

    total_income = (
        base_query.filter(Transaction.type == "income")
        .with_entities(func.coalesce(func.sum(Transaction.amount), 0))
        .scalar()
    )
    total_expense = (
        base_query.filter(Transaction.type == "expense")
        .with_entities(func.coalesce(func.sum(Transaction.amount), 0))
        .scalar()
    )

    # Category-wise breakdown (expenses only — most useful for the pie chart)
    breakdown_rows = (
        db.session.query(Category.name, func.sum(Transaction.amount))
        .join(Transaction, Transaction.category_id == Category.id)
        .filter(
            Transaction.user_id == user_id,
            Transaction.type == "expense",
            extract("year", Transaction.date) == year,
            extract("month", Transaction.date) == month,
        )
        .group_by(Category.name)
        .all()
    )

    category_breakdown = [
        {"category": name, "amount": float(amount)} for name, amount in breakdown_rows
    ]

    return jsonify(
        {
            "year": year,
            "month": month,
            "total_income": float(total_income),
            "total_expense": float(total_expense),
            "savings": float(total_income) - float(total_expense),
            "category_breakdown": category_breakdown,
        }
    ), 200


@summary_bp.route("/trend", methods=["GET"])
@jwt_required()
def trend_summary():
    """Returns income vs expense totals for the last N months (default 6)."""
    user_id = get_jwt_identity()
    months = request.args.get("months", default=6, type=int)
    today = date.today()

    results = []
    for i in range(months - 1, -1, -1):
        target = today - relativedelta(months=i)
        y, m = target.year, target.month

        base_query = Transaction.query.filter(
            Transaction.user_id == user_id,
            extract("year", Transaction.date) == y,
            extract("month", Transaction.date) == m,
        )
        income = (
            base_query.filter(Transaction.type == "income")
            .with_entities(func.coalesce(func.sum(Transaction.amount), 0))
            .scalar()
        )
        expense = (
            base_query.filter(Transaction.type == "expense")
            .with_entities(func.coalesce(func.sum(Transaction.amount), 0))
            .scalar()
        )

        results.append(
            {
                "label": target.strftime("%b %Y"),
                "year": y,
                "month": m,
                "income": float(income),
                "expense": float(expense),
            }
        )

    return jsonify(results), 200
