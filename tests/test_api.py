import json
import unittest
from pathlib import Path
from app import app, DATA_FILE

class TestQuoteVault(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = app.test_client()

    def test_quotes_file_integrity(self):
        """Verify quotes.json exists and has exactly 100 valid quotes."""
        self.assertTrue(DATA_FILE.exists(), "quotes.json must exist")
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            quotes = json.load(f)
        
        self.assertEqual(len(quotes), 100, f"Expected 100 quotes, found {len(quotes)}")
        
        for q in quotes:
            self.assertIn("id", q)
            self.assertIn("quote", q)
            self.assertIn("author", q)
            self.assertIn("category", q)
            self.assertTrue(len(q["quote"].strip()) > 0)
            self.assertTrue(len(q["author"].strip()) > 0)
            self.assertTrue(len(q["category"].strip()) > 0)

    def test_homepage(self):
        """Verify homepage renders HTML."""
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"QuoteVault", response.data)
        self.assertIn(b"spotlightQuote", response.data)

    def test_get_all_quotes(self):
        """Verify /api/quotes endpoint."""
        response = self.client.get("/api/quotes")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["total"], 100)
        self.assertEqual(len(data["quotes"]), 100)

    def test_get_random_quote(self):
        """Verify /api/quotes/random returns a quote."""
        response = self.client.get("/api/quotes/random")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("quote", data)
        self.assertIn("author", data)
        self.assertIn("category", data)

    def test_get_random_quote_with_category(self):
        """Verify /api/quotes/random with category filter."""
        response = self.client.get("/api/quotes/random?category=Philosophy")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["category"], "Philosophy")

    def test_get_random_quote_not_found(self):
        """Verify 404 for unmatched random quote criteria."""
        response = self.client.get("/api/quotes/random?category=NoSuchCategory")
        self.assertEqual(response.status_code, 404)

    def test_search_by_author(self):
        """Verify searching by author."""
        response = self.client.get("/api/quotes/search?author=Socrates")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertGreater(data["total"], 0)
        for q in data["quotes"]:
            self.assertIn("socrates", q["author"].lower())

    def test_search_by_category(self):
        """Verify searching by category."""
        response = self.client.get("/api/quotes/search?category=Philosophy")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertGreater(data["total"], 0)
        for q in data["quotes"]:
            self.assertEqual(q["category"].lower(), "philosophy")

    def test_search_by_keyword(self):
        """Verify searching by keyword in quote text."""
        response = self.client.get("/api/quotes/search?q=wisdom")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertGreater(data["total"], 0)
        for q in data["quotes"]:
            match = (
                "wisdom" in q["quote"].lower() or 
                "wisdom" in q["author"].lower() or 
                "wisdom" in q["category"].lower()
            )
            self.assertTrue(match)

    def test_get_categories(self):
        """Verify /api/categories endpoint."""
        response = self.client.get("/api/categories")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIsInstance(data, list)
        self.assertGreater(len(data), 0)
        total_count = sum(c["count"] for c in data)
        self.assertEqual(total_count, 100)

    def test_get_authors(self):
        """Verify /api/authors endpoint."""
        response = self.client.get("/api/authors")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIsInstance(data, list)
        self.assertGreater(len(data), 0)
        total_count = sum(a["count"] for a in data)
        self.assertEqual(total_count, 100)

if __name__ == "__main__":
    unittest.main()
