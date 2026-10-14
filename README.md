# QuoteVault 📜

A clean, modern web application built with **Python Flask**, **Vanilla JavaScript**, **HTML5**, and **CSS** to display and search 100 well-known quotes from history's most notable thinkers, scientists, writers, and leaders.

---

## Features

- **Spotlight Random Quote**:
  - Displays a random quote on launch.
  - "Next Random Quote" button with smooth fade animations.
  - "Copy" button to instantly copy the quote and author to your clipboard.
  - "Listen" button using the Web Speech API (Text-to-Speech).
  - Can fetch random quotes within a selected category.
- **Search & Filter Explorer**:
  - **Keyword Search**: Live search across quote text, author, and category.
  - **Author Filter**: Dropdown menu showing all unique authors and their quote counts.
  - **Category Pills & Dropdown**: Filter quotes by Philosophy, Science & Tech, Literature, Leadership, Wisdom, and Art & Creativity.
  - **Quote Grid**: Responsive grid displaying all matching results with a "⭐ Feature" button to promote any card to the spotlight view.
- **Pure Vanilla Stack**:
  - Zero heavy frontend dependencies (no React, Vue, jQuery, or Tailwind).
  - Responsive CSS with glassmorphic cards, custom scrollbars, and color-coded category badges.
  - Python Flask REST API backend.

---

## Project Structure

```
agy-cli-projects/
├── .venv/                   # Python virtual environment
├── app.py                   # Flask backend and REST API routes
├── quotes.json              # 100 curated quotes dataset
├── generate_quotes.py       # Quote dataset generator and validator
├── requirements.txt         # Dependencies (Flask)
├── static/
│   ├── css/
│   │   └── style.css        # Responsive dark theme styling
│   └── js/
│       └── app.js           # Vanilla JS client logic
├── templates/
│   └── index.html           # Main HTML5 template
└── tests/
    └── test_api.py          # Automated unit tests for API and data
```

---

## Quickstart

### 1. Set Up Environment & Install Dependencies
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 2. Run the Application
```bash
python3 app.py
```
Open your browser and navigate to:
```
http://127.0.0.1:5000
```

### 3. Run Automated Tests
```bash
python3 -m unittest discover tests
```

---

## API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/` | `GET` | Serves the HTML frontend interface |
| `/api/quotes` | `GET` | Returns all 100 quotes |
| `/api/quotes/random` | `GET` | Returns a random quote (`?category=...` or `?author=...` optional) |
| `/api/quotes/search` | `GET` | Search quotes (`?q=...`, `?author=...`, `?category=...`) |
| `/api/categories` | `GET` | Returns unique categories with counts |
| `/api/authors` | `GET` | Returns unique authors with counts |
