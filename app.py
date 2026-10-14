import json
import random
from pathlib import Path
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

DATA_FILE = Path(__file__).parent / "quotes.json"

def load_quotes():
    if not DATA_FILE.exists():
        return []
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

QUOTES = load_quotes()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/quotes", methods=["GET"])
def get_all_quotes():
    return jsonify({
        "total": len(QUOTES),
        "quotes": QUOTES
    })

@app.route("/api/quotes/random", methods=["GET"])
def get_random_quote():
    category = request.args.get("category", "").strip().lower()
    author = request.args.get("author", "").strip().lower()
    
    candidates = QUOTES
    if category:
        candidates = [
            q for q in candidates 
            if q.get("category", "").lower() == category or q.get("category_cn", "").lower() == category
        ]
    if author:
        candidates = [
            q for q in candidates 
            if author in q.get("author", "").lower() or author in q.get("author_cn", "").lower()
        ]
        
    if not candidates:
        return jsonify({"error": "No quotes match the specified criteria"}), 404
        
    return jsonify(random.choice(candidates))

@app.route("/api/quotes/search", methods=["GET"])
def search_quotes():
    q = request.args.get("q", "").strip().lower()
    category = request.args.get("category", "").strip().lower()
    author = request.args.get("author", "").strip().lower()

    results = QUOTES
    if category:
        results = [
            quote for quote in results 
            if quote.get("category", "").lower() == category or quote.get("category_cn", "").lower() == category
        ]
    if author:
        results = [
            quote for quote in results 
            if author in quote.get("author", "").lower() or author in quote.get("author_cn", "").lower()
        ]
    if q:
        results = [
            quote for quote in results
            if q in quote.get("quote", "").lower() 
            or q in quote.get("author", "").lower() 
            or q in quote.get("category", "").lower()
            or q in quote.get("quote_cn", "").lower()
            or q in quote.get("author_cn", "").lower()
            or q in quote.get("category_cn", "").lower()
        ]

    return jsonify({
        "total": len(results),
        "quotes": results
    })

@app.route("/api/categories", methods=["GET"])
def get_categories():
    cat_map = {}
    for quote in QUOTES:
        en = quote.get("category", "General")
        cn = quote.get("category_cn", en)
        if en not in cat_map:
            cat_map[en] = {"name": en, "name_cn": cn, "count": 0}
        cat_map[en]["count"] += 1
    
    categories = sorted(cat_map.values(), key=lambda x: x["name"])
    return jsonify(categories)

@app.route("/api/authors", methods=["GET"])
def get_authors():
    author_map = {}
    for quote in QUOTES:
        en = quote.get("author", "Unknown")
        cn = quote.get("author_cn", en)
        if en not in author_map:
            author_map[en] = {"name": en, "name_cn": cn, "count": 0}
        author_map[en]["count"] += 1
        
    authors = sorted(author_map.values(), key=lambda x: x["name"])
    return jsonify(authors)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
