from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Transaction, Category

transactions_bp = Blueprint("transactions", __name__, url_prefix="/api/transactions")


def parse_date(value, default=None):
    if not value:
        return default
    try:
        return datetime.strptime(value, "%Y-%m-%d").date()
    except ValueError:
        return default


@transactions_bp.route("", methods=["GET"])
@jwt_required()
def get_transactions():
    user_id = get_jwt_identity()
    query = Transaction.query.filter_by(user_id=user_id)

    # Optional filters
    month = request.args.get("month", type=int)
    year = request.args.get("year", type=int)
    category_id = request.args.get("category_id", type=int)
    ttype = request.args.get("type")

    if year and month:
        query = query.filter(
            db.extract("year", Transaction.date) == year,
            db.extract("month", Transaction.date) == month,
        )
    if category_id:
        query = query.filter_by(category_id=category_id)
    if ttype:
        query = query.filter_by(type=ttype)

    transactions = query.order_by(Transaction.date.desc(), Transaction.id.desc()).all()
    return jsonify([t.to_dict() for t in transactions]), 200


@transactions_bp.route("", methods=["POST"])
@jwt_required()
def create_transaction():
    user_id = get_jwt_identity()
    data = request.get_json() or {}

    amount = data.get("amount")
    ttype = data.get("type")
    category_id = data.get("category_id")
    note = data.get("note", "")
    tdate = parse_date(data.get("date"), default=datetime.utcnow().date())

    if amount is None or ttype not in ("income", "expense") or not category_id:
        return jsonify({"error": "amount, type and category_id are required"}), 400

    category = Category.query.filter_by(id=category_id, user_id=user_id).first()
    if not category:
        return jsonify({"error": "Invalid category_id"}), 400

    try:
        amount = float(amount)
        if amount <= 0:
            raise ValueError
    except (ValueError, TypeError):
        return jsonify({"error": "amount must be a positive number"}), 400

    transaction = Transaction(
        user_id=user_id,
        category_id=category_id,
        amount=amount,
        type=ttype,
        note=note,
        date=tdate,
    )
    db.session.add(transaction)
    db.session.commit()
    return jsonify(transaction.to_dict()), 201


@transactions_bp.route("/<int:transaction_id>", methods=["PUT"])
@jwt_required()
def update_transaction(transaction_id):
    user_id = get_jwt_identity()
    transaction = Transaction.query.filter_by(id=transaction_id, user_id=user_id).first()
    if not transaction:
        return jsonify({"error": "Transaction not found"}), 404

    data = request.get_json() or {}

    if "amount" in data:
        try:
            amount = float(data["amount"])
            if amount <= 0:
                raise ValueError
            transaction.amount = amount
        except (ValueError, TypeError):
            return jsonify({"error": "amount must be a positive number"}), 400

    if "type" in data:
        if data["type"] not in ("income", "expense"):
            return jsonify({"error": "type must be 'income' or 'expense'"}), 400
        transaction.type = data["type"]

    if "category_id" in data:
        category = Category.query.filter_by(id=data["category_id"], user_id=user_id).first()
        if not category:
            return jsonify({"error": "Invalid category_id"}), 400
        transaction.category_id = data["category_id"]

    if "note" in data:
        transaction.note = data["note"]

    if "date" in data:
        transaction.date = parse_date(data["date"], default=transaction.date)

    db.session.commit()
    return jsonify(transaction.to_dict()), 200


@transactions_bp.route("/<int:transaction_id>", methods=["DELETE"])
@jwt_required()
def delete_transaction(transaction_id):
    user_id = get_jwt_identity()
    transaction = Transaction.query.filter_by(id=transaction_id, user_id=user_id).first()
    if not transaction:
        return jsonify({"error": "Transaction not found"}), 404

    db.session.delete(transaction)
    db.session.commit()
    return jsonify({"message": "Transaction deleted"}), 200
