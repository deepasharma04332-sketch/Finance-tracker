from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Category

categories_bp = Blueprint("categories", __name__, url_prefix="/api/categories")


@categories_bp.route("", methods=["GET"])
@jwt_required()
def get_categories():
    user_id = get_jwt_identity()
    ctype = request.args.get("type")  # optional filter: income/expense

    query = Category.query.filter_by(user_id=user_id)
    if ctype:
        query = query.filter_by(type=ctype)

    categories = query.order_by(Category.name).all()
    return jsonify([c.to_dict() for c in categories]), 200


@categories_bp.route("", methods=["POST"])
@jwt_required()
def create_category():
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    ctype = data.get("type", "").strip()

    if not name or ctype not in ("income", "expense"):
        return jsonify({"error": "name and valid type ('income'/'expense') required"}), 400

    category = Category(name=name, type=ctype, user_id=user_id)
    db.session.add(category)
    db.session.commit()
    return jsonify(category.to_dict()), 201


@categories_bp.route("/<int:category_id>", methods=["DELETE"])
@jwt_required()
def delete_category(category_id):
    user_id = get_jwt_identity()
    category = Category.query.filter_by(id=category_id, user_id=user_id).first()
    if not category:
        return jsonify({"error": "Category not found"}), 404

    db.session.delete(category)
    db.session.commit()
    return jsonify({"message": "Category deleted"}), 200
