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
        candidates = [q for q in candidates if q.get("category", "").lower() == category]
    if author:
        candidates = [q for q in candidates if author in q.get("author", "").lower()]
        
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
        results = [quote for quote in results if quote.get("category", "").lower() == category]
    if author:
        results = [quote for quote in results if author in quote.get("author", "").lower()]
    if q:
        results = [
            quote for quote in results
            if q in quote.get("quote", "").lower() 
            or q in quote.get("author", "").lower() 
            or q in quote.get("category", "").lower()
        ]

    return jsonify({
        "total": len(results),
        "quotes": results
    })

@app.route("/api/categories", methods=["GET"])
def get_categories():
    cat_counts = {}
    for quote in QUOTES:
        c = quote.get("category", "General")
        cat_counts[c] = cat_counts.get(c, 0) + 1
    
    categories = [
        {"name": cat, "count": count}
        for cat, count in sorted(cat_counts.items())
    ]
    return jsonify(categories)

@app.route("/api/authors", methods=["GET"])
def get_authors():
    author_counts = {}
    for quote in QUOTES:
        a = quote.get("author", "Unknown")
        author_counts[a] = author_counts.get(a, 0) + 1
        
    authors = [
        {"name": auth, "count": count}
        for auth, count in sorted(author_counts.items())
    ]
    return jsonify(authors)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
