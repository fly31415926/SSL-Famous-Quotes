/**
 * QuoteVault - Vanilla JavaScript Client
 */

// State management
const state = {
  currentQuote: null,
  allQuotes: [],
  currentQuotesList: [],
  categories: [],
  authors: [],
  activeCategory: "",
  selectedAuthor: "",
  searchKeyword: "",
  isLoading: false
};

// DOM Elements
const DOM = {
  themeToggleBtn: document.getElementById("themeToggleBtn"),
  themeIcon: document.getElementById("themeIcon"),
  themeLabel: document.getElementById("themeLabel"),

  spotlightQuote: document.getElementById("spotlightQuote"),
  spotlightAuthor: document.getElementById("spotlightAuthor"),
  spotlightCategory: document.getElementById("spotlightCategory"),
  nextQuoteBtn: document.getElementById("nextQuoteBtn"),
  copyQuoteBtn: document.getElementById("copyQuoteBtn"),
  speakQuoteBtn: document.getElementById("speakQuoteBtn"),
  copyIcon: document.getElementById("copyIcon"),
  copyText: document.getElementById("copyText"),

  searchQuery: document.getElementById("searchQuery"),
  clearSearchBtn: document.getElementById("clearSearchBtn"),
  authorSelect: document.getElementById("authorSelect"),
  categorySelect: document.getElementById("categorySelect"),
  resetFiltersBtn: document.getElementById("resetFiltersBtn"),
  categoryChips: document.getElementById("categoryChips"),
  resultsCount: document.getElementById("resultsCount"),
  exportCsvBtn: document.getElementById("exportCsvBtn"),
  quotesGrid: document.getElementById("quotesGrid"),
  toast: document.getElementById("toast"),

  totalQuotesStat: document.getElementById("totalQuotesStat"),
  totalCategoriesStat: document.getElementById("totalCategoriesStat"),
  totalAuthorsStat: document.getElementById("totalAuthorsStat")
};

// Theme Management (Light / Dark mode toggle)
function initTheme() {
  const savedTheme = localStorage.getItem("quotevault_theme") || "dark";
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("quotevault_theme", theme);

  if (DOM.themeIcon && DOM.themeLabel) {
    if (theme === "light") {
      DOM.themeIcon.textContent = "🌙";
      DOM.themeLabel.textContent = "Dark Mode";
      DOM.themeToggleBtn.setAttribute("title", "Switch to Dark Mode");
    } else {
      DOM.themeIcon.textContent = "☀️";
      DOM.themeLabel.textContent = "Light Mode";
      DOM.themeToggleBtn.setAttribute("title", "Switch to Light Mode");
    }
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
  showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode ✨`);
}

// Category to CSS class helper
function getCategoryClass(category) {
  if (!category) return "cat-default";
  const normalized = category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `cat-${normalized}`;
}

// Show Toast notification
function showToast(message = "Quote copied to clipboard!") {
  DOM.toast.textContent = message;
  DOM.toast.classList.add("show");
  setTimeout(() => {
    DOM.toast.classList.remove("show");
  }, 2500);
}

// Fetch a Random Quote
async function fetchRandomQuote(category = "") {
  try {
    DOM.spotlightQuote.classList.add("fade-out");
    DOM.spotlightQuote.classList.remove("fade-in");

    let url = "/api/quotes/random";
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (params.toString()) url += `?${params.toString()}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Could not fetch quote");
    const quote = await res.json();

    setTimeout(() => {
      displaySpotlightQuote(quote);
      DOM.spotlightQuote.classList.remove("fade-out");
      DOM.spotlightQuote.classList.add("fade-in");
    }, 200);
  } catch (err) {
    console.error("Error fetching random quote:", err);
    DOM.spotlightQuote.textContent = "Unable to load quote right now.";
    DOM.spotlightQuote.classList.remove("fade-out");
    DOM.spotlightQuote.classList.add("fade-in");
  }
}

// Display Spotlight Quote
function displaySpotlightQuote(quote) {
  state.currentQuote = quote;
  DOM.spotlightQuote.textContent = `"${quote.quote}"`;
  DOM.spotlightAuthor.textContent = `— ${quote.author}`;
  
  DOM.spotlightCategory.textContent = quote.category;
  DOM.spotlightCategory.className = `category-badge ${getCategoryClass(quote.category)}`;
}

// Populate Category & Author Filters
async function loadFilterMetadata() {
  try {
    const [catsRes, authsRes] = await Promise.all([
      fetch("/api/categories"),
      fetch("/api/authors")
    ]);

    const categories = await catsRes.json();
    const authors = await authsRes.json();

    state.categories = categories;
    state.authors = authors;

    // Update stats in header
    DOM.totalCategoriesStat.textContent = categories.length;
    DOM.totalAuthorsStat.textContent = authors.length;

    // Populate Category Dropdown
    DOM.categorySelect.innerHTML = '<option value="">All Categories</option>';
    categories.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat.name;
      opt.textContent = `${cat.name} (${cat.count})`;
      DOM.categorySelect.appendChild(opt);
    });

    // Populate Category Chips
    DOM.categoryChips.innerHTML = '<button class="category-chip active" data-category="">All Categories</button>';
    categories.forEach(cat => {
      const chip = document.createElement("button");
      chip.className = "category-chip";
      chip.dataset.category = cat.name;
      chip.textContent = `${cat.name} (${cat.count})`;
      DOM.categoryChips.appendChild(chip);
    });

    // Populate Author Dropdown
    DOM.authorSelect.innerHTML = '<option value="">All Authors</option>';
    authors.forEach(auth => {
      const opt = document.createElement("option");
      opt.value = auth.name;
      opt.textContent = `${auth.name} (${auth.count})`;
      DOM.authorSelect.appendChild(opt);
    });

  } catch (err) {
    console.error("Failed to load metadata:", err);
  }
}

// Perform Quotes Search and Filtering
async function searchQuotes() {
  const params = new URLSearchParams();
  if (state.searchKeyword) params.append("q", state.searchKeyword);
  if (state.selectedAuthor) params.append("author", state.selectedAuthor);
  if (state.activeCategory) params.append("category", state.activeCategory);

  try {
    const res = await fetch(`/api/quotes/search?${params.toString()}`);
    const data = await res.json();
    state.currentQuotesList = data.quotes || [];
    renderQuotesGrid(state.currentQuotesList);
  } catch (err) {
    console.error("Search failed:", err);
    DOM.quotesGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <h3>Failed to load quotes</h3>
        <p>Please try again in a moment.</p>
      </div>
    `;
  }
}

// Render Quotes Grid
function renderQuotesGrid(quotes) {
  DOM.resultsCount.textContent = `Showing ${quotes.length} quote${quotes.length === 1 ? '' : 's'}`;

  if (!quotes || quotes.length === 0) {
    DOM.quotesGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3>No matching quotes found</h3>
        <p>Try adjusting your search terms or clearing your filters.</p>
      </div>
    `;
    return;
  }

  DOM.quotesGrid.innerHTML = "";
  quotes.forEach(item => {
    const card = document.createElement("div");
    card.className = "quote-card";

    const catClass = getCategoryClass(item.category);

    card.innerHTML = `
      <div class="card-top">
        <p class="card-quote">“${escapeHtml(item.quote)}”</p>
        <span class="card-author">— ${escapeHtml(item.author)}</span>
      </div>
      <div class="card-bottom">
        <span class="category-badge ${catClass}">${escapeHtml(item.category)}</span>
        <div class="card-btns">
          <button class="btn-card-action feature-btn" title="Spotlight this quote">⭐ Feature</button>
          <button class="btn-card-action copy-btn" title="Copy quote to clipboard">
            <span class="copy-icon">📋</span> <span class="copy-label">Copy</span>
          </button>
        </div>
      </div>
    `;

    // Feature in hero card
    card.querySelector(".feature-btn").addEventListener("click", () => {
      displaySpotlightQuote(item);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast("Featured quote in spotlight!");
    });

    // Copy to Clipboard with visual feedback on the card button
    const copyBtn = card.querySelector(".copy-btn");
    const copyLabel = card.querySelector(".copy-label");
    copyBtn.addEventListener("click", async () => {
      await copyToClipboard(`"${item.quote}" — ${item.author}`);
      copyLabel.textContent = "Copied!";
      copyBtn.classList.add("copied");
      setTimeout(() => {
        copyLabel.textContent = "Copy";
        copyBtn.classList.remove("copied");
      }, 1800);
    });

    DOM.quotesGrid.appendChild(card);
  });
}

// Utility: Export Current Quotes to CSV
function exportQuotesToCSV() {
  const quotesToExport = state.currentQuotesList && state.currentQuotesList.length > 0 
    ? state.currentQuotesList 
    : [];

  if (!quotesToExport || quotesToExport.length === 0) {
    showToast("No quotes available to export.");
    return;
  }

  // Header row
  const headers = ["ID", "Quote", "Author", "Category"];

  // Data rows with quotes escaped according to RFC 4180
  const rows = quotesToExport.map(q => [
    q.id,
    `"${(q.quote || '').replace(/"/g, '""')}"`,
    `"${(q.author || '').replace(/"/g, '""')}"`,
    `"${(q.category || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");

  // Create downloadable file blob
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);

  const dateStr = new Date().toISOString().slice(0, 10);
  link.setAttribute("download", `quotevault_export_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast(`Exported ${quotesToExport.length} quotes to CSV! 📥`);
}

// Utility: Escape HTML
function escapeHtml(str) {
  if (!str) return "";
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Copy to Clipboard helper
async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    showToast("Quote copied to clipboard!");
  } catch (err) {
    console.error("Clipboard write error:", err);
    showToast("Failed to copy quote.");
  }
}

// Speech Synthesis: Read Quote Aloud
function speakCurrentQuote() {
  if (!state.currentQuote) return;
  if (!('speechSynthesis' in window)) {
    showToast("Text-to-speech is not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();
  const textToRead = `${state.currentQuote.quote}. By ${state.currentQuote.author}.`;
  const utterance = new SpeechSynthesisUtterance(textToRead);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
  showToast("Reading quote aloud 🔊");
}

// Debounce Utility
function debounce(fn, delay = 250) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Event Listeners setup
function setupEventListeners() {
  // Theme Toggle Button
  if (DOM.themeToggleBtn) {
    DOM.themeToggleBtn.addEventListener("click", toggleTheme);
  }

  // Export to CSV Button
  if (DOM.exportCsvBtn) {
    DOM.exportCsvBtn.addEventListener("click", exportQuotesToCSV);
  }

  // Next Quote Button
  DOM.nextQuoteBtn.addEventListener("click", () => {
    fetchRandomQuote(state.activeCategory);
  });

  // Copy Quote Button (Spotlight)
  DOM.copyQuoteBtn.addEventListener("click", async () => {
    if (state.currentQuote) {
      await copyToClipboard(`"${state.currentQuote.quote}" — ${state.currentQuote.author}`);
      DOM.copyText.textContent = "Copied!";
      setTimeout(() => {
        DOM.copyText.textContent = "Copy";
      }, 1800);
    }
  });

  // Speak Quote Button
  DOM.speakQuoteBtn.addEventListener("click", () => {
    speakCurrentQuote();
  });

  // Search input live typing (debounced)
  const debouncedSearch = debounce(() => {
    state.searchKeyword = DOM.searchQuery.value.trim();
    DOM.clearSearchBtn.style.display = state.searchKeyword ? "block" : "none";
    searchQuotes();
  }, 250);

  DOM.searchQuery.addEventListener("input", debouncedSearch);

  // Clear search button
  DOM.clearSearchBtn.addEventListener("click", () => {
    DOM.searchQuery.value = "";
    state.searchKeyword = "";
    DOM.clearSearchBtn.style.display = "none";
    searchQuotes();
  });

  // Author Dropdown change
  DOM.authorSelect.addEventListener("change", (e) => {
    state.selectedAuthor = e.target.value;
    searchQuotes();
  });

  // Category Dropdown change
  DOM.categorySelect.addEventListener("change", (e) => {
    const val = e.target.value;
    setCategory(val);
  });

  // Category Chips click delegation
  DOM.categoryChips.addEventListener("click", (e) => {
    const chip = e.target.closest(".category-chip");
    if (!chip) return;
    const cat = chip.dataset.category;
    setCategory(cat);
  });

  // Reset Filters Button
  DOM.resetFiltersBtn.addEventListener("click", () => {
    resetFilters();
  });
}

// Set active category and sync UI
function setCategory(category) {
  state.activeCategory = category;
  DOM.categorySelect.value = category;

  // Update chip active states
  const chips = DOM.categoryChips.querySelectorAll(".category-chip");
  chips.forEach(chip => {
    if (chip.dataset.category === category) {
      chip.classList.add("active");
    } else {
      chip.classList.remove("active");
    }
  });

  searchQuotes();
}

// Reset all filters
function resetFilters() {
  state.searchKeyword = "";
  state.selectedAuthor = "";
  state.activeCategory = "";

  DOM.searchQuery.value = "";
  DOM.clearSearchBtn.style.display = "none";
  DOM.authorSelect.value = "";
  DOM.categorySelect.value = "";

  const chips = DOM.categoryChips.querySelectorAll(".category-chip");
  chips.forEach(c => c.classList.remove("active"));
  const allChip = DOM.categoryChips.querySelector('.category-chip[data-category=""]');
  if (allChip) allChip.classList.add("active");

  searchQuotes();
}

// App Initialization
async function initApp() {
  initTheme();
  setupEventListeners();
  await loadFilterMetadata();
  await fetchRandomQuote();
  await searchQuotes();
}

// Start application when DOM is ready
document.addEventListener("DOMContentLoaded", initApp);
