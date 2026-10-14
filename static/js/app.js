/**
 * QuoteVault - Vanilla JavaScript Client
 * Supports English & Chinese (i18n), Dark/Light Mode, SpeechSynthesis, and CSV Export
 */

// i18n Dictionary
const I18N = {
  en: {
    appTitle: "QuoteVault",
    appTagline: "Explore timeless wisdom from history's greatest thinkers, writers, and leaders.",
    statQuotes: "Quotes",
    statCategories: "Categories",
    statAuthors: "Authors",
    spotlightLabel: "Featured Spotlight",
    fontSizeLabel: "Text:",
    shortcutBadge: "<kbd>Space</kbd> / <kbd>R</kbd> next",
    nextQuoteText: "Next Random Quote",
    copyText: "Copy",
    copiedText: "Copied!",
    listenText: "Listen",
    stopText: "Stop",
    exploreTitle: "Explore & Search Quotes",
    exploreSubtitle: "Filter through the archive by keyword, philosopher/author, or category.",
    searchLabel: "Search Quote Text or Keyword",
    searchPlaceholder: "Type words like 'courage', 'dreams', 'truth'...",
    authorFilterLabel: "Author / Speaker",
    allAuthors: "All Authors",
    categoryFilterLabel: "Category",
    allCategories: "All Categories",
    resetFiltersText: "↺ Reset Filters",
    exportCsvText: "Export to CSV",
    showingCount: (count) => `Showing ${count} quote${count === 1 ? '' : 's'}`,
    featureBtn: "⭐ Feature",
    copyBtn: "Copy",
    emptyTitle: "No matching quotes found",
    emptySubtitle: "Try adjusting your search terms or clearing your filters.",
    clearAllFilters: "Clear All Filters",
    failedLoad: "Failed to load quotes",
    failedSubtitle: "Please try again in a moment.",
    footerText: "QuoteVault • Built with Python Flask, Vanilla JavaScript & HTML/CSS",
    toastCopySuccess: "Quote copied to clipboard!",
    toastFeature: "Featured quote in spotlight!",
    toastExport: (count) => `Exported ${count} quotes to CSV! 📥`,
    themeLight: "Light Mode",
    themeDark: "Dark Mode"
  },
  zh: {
    appTitle: "QuoteVault 语录宝库",
    appTagline: "探索人类历史上伟大思想家、科学家、文学家与领袖的传世智慧。",
    statQuotes: "条名言",
    statCategories: "大分类",
    statAuthors: "位名家",
    spotlightLabel: "精选聚光灯",
    fontSizeLabel: "字号:",
    shortcutBadge: "<kbd>空格</kbd> / <kbd>R</kbd> 下一条",
    nextQuoteText: "换一条名言",
    copyText: "复制",
    copiedText: "已复制!",
    listenText: "朗读",
    stopText: "停止",
    exploreTitle: "名言检索与探索",
    exploreSubtitle: "按关键词、思想家/作者或类别筛选珍藏名言。",
    searchLabel: "搜索名言内容或关键词",
    searchPlaceholder: "输入关键词，如“勇气”、“梦想”、“真理”...",
    authorFilterLabel: "名家 / 作者",
    allAuthors: "全部名家",
    categoryFilterLabel: "分类",
    allCategories: "全部分类",
    resetFiltersText: "↺ 重置筛选",
    exportCsvText: "导出为 CSV",
    showingCount: (count) => `共显示 ${count} 条名言`,
    featureBtn: "⭐ 设为精选",
    copyBtn: "复制",
    emptyTitle: "未找到匹配的名言",
    emptySubtitle: "请尝试调整搜索词或重置筛选条件。",
    clearAllFilters: "清空所有筛选条件",
    failedLoad: "加载名言失败",
    failedSubtitle: "请稍后重试。",
    footerText: "QuoteVault 语录宝库 • 基于 Python Flask、原生 JavaScript 与 HTML/CSS 构建",
    toastCopySuccess: "名言已成功复制到剪贴板！",
    toastFeature: "已载入精选聚光灯！",
    toastExport: (count) => `已导出 ${count} 条名言至 CSV！📥`,
    themeLight: "亮色模式",
    themeDark: "暗色模式"
  }
};

// State management
const state = {
  currentLang: "en",
  currentQuote: null,
  allQuotes: [],
  currentQuotesList: [],
  categories: [],
  authors: [],
  activeCategory: "",
  selectedAuthor: "",
  searchKeyword: "",
  isSpeaking: false,
  fontSizeIndex: 2
};

const FONT_SIZES = ["1.25rem", "1.45rem", "1.65rem", "1.9rem", "2.2rem"];

// DOM Elements Cache
const DOM = {
  langEnBtn: document.getElementById("langEnBtn"),
  langZhBtn: document.getElementById("langZhBtn"),
  themeToggleBtn: document.getElementById("themeToggleBtn"),
  themeIcon: document.getElementById("themeIcon"),
  themeLabel: document.getElementById("themeLabel"),

  appTitle: document.getElementById("appTitle"),
  appTagline: document.getElementById("appTagline"),
  totalQuotesStat: document.getElementById("totalQuotesStat"),
  totalCategoriesStat: document.getElementById("totalCategoriesStat"),
  totalAuthorsStat: document.getElementById("totalAuthorsStat"),
  statQuotesLabel: document.getElementById("statQuotesLabel"),
  statCategoriesLabel: document.getElementById("statCategoriesLabel"),
  statAuthorsLabel: document.getElementById("statAuthorsLabel"),

  spotlightLabel: document.getElementById("spotlightLabel"),
  fontSizeLabel: document.getElementById("fontSizeLabel"),
  shortcutBadge: document.getElementById("shortcutBadge"),
  spotlightQuote: document.getElementById("spotlightQuote"),
  spotlightAuthor: document.getElementById("spotlightAuthor"),
  spotlightCategory: document.getElementById("spotlightCategory"),
  nextQuoteBtn: document.getElementById("nextQuoteBtn"),
  nextQuoteText: document.getElementById("nextQuoteText"),
  copyQuoteBtn: document.getElementById("copyQuoteBtn"),
  copyIcon: document.getElementById("copyIcon"),
  copyText: document.getElementById("copyText"),
  speakQuoteBtn: document.getElementById("speakQuoteBtn"),
  speakIcon: document.getElementById("speakIcon"),
  speakText: document.getElementById("speakText"),
  decreaseFontBtn: document.getElementById("decreaseFontBtn"),
  increaseFontBtn: document.getElementById("increaseFontBtn"),
  backToTopBtn: document.getElementById("backToTopBtn"),

  exploreTitle: document.getElementById("exploreTitle"),
  exploreSubtitle: document.getElementById("exploreSubtitle"),
  searchLabel: document.getElementById("searchLabel"),
  searchQuery: document.getElementById("searchQuery"),
  clearSearchBtn: document.getElementById("clearSearchBtn"),
  authorFilterLabel: document.getElementById("authorFilterLabel"),
  authorSelect: document.getElementById("authorSelect"),
  categoryFilterLabel: document.getElementById("categoryFilterLabel"),
  categorySelect: document.getElementById("categorySelect"),
  resetFiltersBtn: document.getElementById("resetFiltersBtn"),
  resetFiltersText: document.getElementById("resetFiltersText"),
  categoryChips: document.getElementById("categoryChips"),
  resultsCount: document.getElementById("resultsCount"),
  exportCsvBtn: document.getElementById("exportCsvBtn"),
  exportCsvText: document.getElementById("exportCsvText"),
  quotesGrid: document.getElementById("quotesGrid"),
  footerText: document.getElementById("footerText"),
  toast: document.getElementById("toast")
};

// Helper: Get localized quote properties
function getQuoteText(q) {
  if (!q) return "";
  return (state.currentLang === "zh" && q.quote_cn) ? q.quote_cn : q.quote;
}

function getQuoteAuthor(q) {
  if (!q) return "";
  return (state.currentLang === "zh" && q.author_cn) ? q.author_cn : q.author;
}

function getQuoteCategory(q) {
  if (!q) return "";
  return (state.currentLang === "zh" && q.category_cn) ? q.category_cn : q.category;
}

// Category to CSS class helper (always uses English name for consistency)
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

// Language Switcher Management
function initLanguage() {
  const savedLang = localStorage.getItem("quotevault_lang") || "en";
  setLanguage(savedLang, false);
}

function setLanguage(lang, triggerToast = true) {
  state.currentLang = lang;
  localStorage.setItem("quotevault_lang", lang);

  // Update button active state
  if (lang === "zh") {
    DOM.langZhBtn.classList.add("active");
    DOM.langEnBtn.classList.remove("active");
  } else {
    DOM.langEnBtn.classList.add("active");
    DOM.langZhBtn.classList.remove("active");
  }

  // Update static text elements
  const t = I18N[lang];
  DOM.appTitle.textContent = t.appTitle;
  DOM.appTagline.textContent = t.appTagline;
  DOM.statQuotesLabel.textContent = t.statQuotes;
  DOM.statCategoriesLabel.textContent = t.statCategories;
  DOM.statAuthorsLabel.textContent = t.statAuthors;

  DOM.spotlightLabel.textContent = t.spotlightLabel;
  DOM.fontSizeLabel.textContent = t.fontSizeLabel;
  DOM.shortcutBadge.innerHTML = t.shortcutBadge;
  DOM.nextQuoteText.textContent = t.nextQuoteText;
  DOM.copyText.textContent = t.copyText;
  DOM.speakText.textContent = state.isSpeaking ? t.stopText : t.listenText;

  DOM.exploreTitle.textContent = t.exploreTitle;
  DOM.exploreSubtitle.textContent = t.exploreSubtitle;
  DOM.searchLabel.textContent = t.searchLabel;
  DOM.searchQuery.placeholder = t.searchPlaceholder;
  DOM.authorFilterLabel.textContent = t.authorFilterLabel;
  DOM.categoryFilterLabel.textContent = t.categoryFilterLabel;
  DOM.resetFiltersText.textContent = t.resetFiltersText;
  DOM.exportCsvText.textContent = t.exportCsvText;
  DOM.footerText.textContent = t.footerText;

  // Re-populate filter dropdowns & chips with localized names
  renderFilterOptions();

  // Re-render Spotlight Card in new language
  if (state.currentQuote) {
    displaySpotlightQuote(state.currentQuote);
  }

  // Re-render Quotes Grid in new language
  renderQuotesGrid(state.currentQuotesList);

  if (triggerToast) {
    showToast(lang === "zh" ? "已切换至简体中文 🇨🇳" : "Switched to English 🌐");
  }
}

// Theme Management (Light / Dark mode toggle)
function initTheme() {
  const savedTheme = localStorage.getItem("quotevault_theme") || "dark";
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("quotevault_theme", theme);

  const t = I18N[state.currentLang];
  if (DOM.themeIcon && DOM.themeLabel) {
    if (theme === "light") {
      DOM.themeIcon.textContent = "🌙";
      DOM.themeLabel.textContent = t.themeDark;
      DOM.themeToggleBtn.setAttribute("title", t.themeDark);
    } else {
      DOM.themeIcon.textContent = "☀️";
      DOM.themeLabel.textContent = t.themeLight;
      DOM.themeToggleBtn.setAttribute("title", t.themeLight);
    }
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
  const t = I18N[state.currentLang];
  showToast(newTheme === "dark" ? t.themeDark : t.themeLight);
}

// Fetch a Random Quote
async function fetchRandomQuote(category = "") {
  stopSpeakingQuote();

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
    DOM.spotlightQuote.textContent = I18N[state.currentLang].failedLoad;
    DOM.spotlightQuote.classList.remove("fade-out");
    DOM.spotlightQuote.classList.add("fade-in");
  }
}

// Display Spotlight Quote
function displaySpotlightQuote(quote) {
  state.currentQuote = quote;
  const quoteText = getQuoteText(quote);
  const authorText = getQuoteAuthor(quote);
  const categoryText = getQuoteCategory(quote);

  DOM.spotlightQuote.textContent = `“${quoteText}”`;
  DOM.spotlightAuthor.textContent = `— ${authorText}`;
  
  DOM.spotlightCategory.textContent = categoryText;
  DOM.spotlightCategory.className = `category-badge ${getCategoryClass(quote.category)}`;
}

// Font Size Controls for Spotlight Quote
function setSpotlightFontSize(newIndex) {
  state.fontSizeIndex = Math.max(0, Math.min(FONT_SIZES.length - 1, newIndex));
  DOM.spotlightQuote.style.fontSize = FONT_SIZES[state.fontSizeIndex];
  
  DOM.decreaseFontBtn.disabled = (state.fontSizeIndex === 0);
  DOM.increaseFontBtn.disabled = (state.fontSizeIndex === FONT_SIZES.length - 1);
  DOM.decreaseFontBtn.style.opacity = state.fontSizeIndex === 0 ? "0.4" : "1";
  DOM.increaseFontBtn.style.opacity = state.fontSizeIndex === FONT_SIZES.length - 1 ? "0.4" : "1";
}

// Load Filter Metadata from Server
async function loadFilterMetadata() {
  try {
    const [catsRes, authsRes] = await Promise.all([
      fetch("/api/categories"),
      fetch("/api/authors")
    ]);

    state.categories = await catsRes.json();
    state.authors = await authsRes.json();

    DOM.totalCategoriesStat.textContent = state.categories.length;
    DOM.totalAuthorsStat.textContent = state.authors.length;

    renderFilterOptions();
  } catch (err) {
    console.error("Failed to load metadata:", err);
  }
}

// Render Filter Dropdowns & Category Chips based on current language
function renderFilterOptions() {
  const t = I18N[state.currentLang];
  const isZh = state.currentLang === "zh";

  // Category Dropdown
  const prevCat = DOM.categorySelect.value;
  DOM.categorySelect.innerHTML = `<option value="">${t.allCategories}</option>`;
  state.categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat.name;
    const displayName = (isZh && cat.name_cn) ? cat.name_cn : cat.name;
    opt.textContent = `${displayName} (${cat.count})`;
    if (cat.name === prevCat) opt.selected = true;
    DOM.categorySelect.appendChild(opt);
  });

  // Category Chips
  DOM.categoryChips.innerHTML = `<button class="category-chip ${state.activeCategory === '' ? 'active' : ''}" data-category="">${t.allCategories}</button>`;
  state.categories.forEach(cat => {
    const chip = document.createElement("button");
    chip.className = `category-chip ${state.activeCategory === cat.name ? 'active' : ''}`;
    chip.dataset.category = cat.name;
    const displayName = (isZh && cat.name_cn) ? cat.name_cn : cat.name;
    chip.textContent = `${displayName} (${cat.count})`;
    DOM.categoryChips.appendChild(chip);
  });

  // Author Dropdown
  const prevAuth = DOM.authorSelect.value;
  DOM.authorSelect.innerHTML = `<option value="">${t.allAuthors}</option>`;
  state.authors.forEach(auth => {
    const opt = document.createElement("option");
    opt.value = auth.name;
    const displayName = (isZh && auth.name_cn) ? auth.name_cn : auth.name;
    opt.textContent = `${displayName} (${auth.count})`;
    if (auth.name === prevAuth) opt.selected = true;
    DOM.authorSelect.appendChild(opt);
  });
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
    const t = I18N[state.currentLang];
    DOM.quotesGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <h3>${t.failedLoad}</h3>
        <p>${t.failedSubtitle}</p>
      </div>
    `;
  }
}

// Render Quotes Grid
function renderQuotesGrid(quotes) {
  const t = I18N[state.currentLang];
  DOM.resultsCount.textContent = t.showingCount(quotes ? quotes.length : 0);

  if (!quotes || quotes.length === 0) {
    DOM.quotesGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3>${t.emptyTitle}</h3>
        <p>${t.emptySubtitle}</p>
        <button class="btn btn-secondary btn-sm" style="margin-top: 1rem;" onclick="resetFilters()">${t.clearAllFilters}</button>
      </div>
    `;
    return;
  }

  DOM.quotesGrid.innerHTML = "";
  quotes.forEach(item => {
    const card = document.createElement("div");
    card.className = "quote-card";

    const catClass = getCategoryClass(item.category);
    const quoteText = getQuoteText(item);
    const authorText = getQuoteAuthor(item);
    const categoryText = getQuoteCategory(item);

    card.innerHTML = `
      <div class="card-top">
        <p class="card-quote">“${escapeHtml(quoteText)}”</p>
        <span class="card-author">— ${escapeHtml(authorText)}</span>
      </div>
      <div class="card-bottom">
        <span class="category-badge ${catClass}">${escapeHtml(categoryText)}</span>
        <div class="card-btns">
          <button class="btn-card-action feature-btn" title="${t.featureBtn}">${t.featureBtn}</button>
          <button class="btn-card-action copy-btn" title="${t.copyBtn}">
            <span class="copy-icon">📋</span> <span class="copy-label">${t.copyBtn}</span>
          </button>
        </div>
      </div>
    `;

    // Feature in hero card
    card.querySelector(".feature-btn").addEventListener("click", () => {
      displaySpotlightQuote(item);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast(t.toastFeature);
    });

    // Copy to Clipboard
    const copyBtn = card.querySelector(".copy-btn");
    const copyLabel = card.querySelector(".copy-label");
    copyBtn.addEventListener("click", async () => {
      await copyToClipboard(`“${quoteText}” — ${authorText}`);
      copyLabel.textContent = t.copiedText;
      copyBtn.classList.add("copied");
      setTimeout(() => {
        copyLabel.textContent = t.copyBtn;
        copyBtn.classList.remove("copied");
      }, 1800);
    });

    DOM.quotesGrid.appendChild(card);
  });
}

// Utility: Export Current Quotes to CSV
function exportQuotesToCSV() {
  const t = I18N[state.currentLang];
  const quotesToExport = state.currentQuotesList && state.currentQuotesList.length > 0 
    ? state.currentQuotesList 
    : [];

  if (!quotesToExport || quotesToExport.length === 0) {
    showToast(t.emptyTitle);
    return;
  }

  const isZh = state.currentLang === "zh";
  const headers = isZh 
    ? ["ID", "名言 (中文)", "作者 (中文)", "分类 (中文)", "Quote (EN)", "Author (EN)", "Category (EN)"]
    : ["ID", "Quote", "Author", "Category", "Quote (Chinese)", "Author (Chinese)", "Category (Chinese)"];

  const rows = quotesToExport.map(q => [
    q.id,
    `"${(isZh ? q.quote_cn || q.quote : q.quote || '').replace(/"/g, '""')}"`,
    `"${(isZh ? q.author_cn || q.author : q.author || '').replace(/"/g, '""')}"`,
    `"${(isZh ? q.category_cn || q.category : q.category || '').replace(/"/g, '""')}"`,
    `"${(isZh ? q.quote || '' : q.quote_cn || '').replace(/"/g, '""')}"`,
    `"${(isZh ? q.author || '' : q.author_cn || '').replace(/"/g, '""')}"`,
    `"${(isZh ? q.category || '' : q.category_cn || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);

  const dateStr = new Date().toISOString().slice(0, 10);
  link.setAttribute("download", `quotevault_${state.currentLang}_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast(t.toastExport(quotesToExport.length));
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
  const t = I18N[state.currentLang];
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    showToast(t.toastCopySuccess);
  } catch (err) {
    console.error("Clipboard write error:", err);
    showToast("Failed to copy quote.");
  }
}

// Speech Synthesis: Start / Stop Toggle
function toggleSpeech() {
  if (state.isSpeaking) {
    stopSpeakingQuote();
  } else {
    speakCurrentQuote();
  }
}

function speakCurrentQuote() {
  if (!state.currentQuote) return;
  if (!('speechSynthesis' in window)) {
    showToast("Text-to-speech is not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();
  const quoteText = getQuoteText(state.currentQuote);
  const authorText = getQuoteAuthor(state.currentQuote);
  const t = I18N[state.currentLang];

  const textToRead = state.currentLang === "zh"
    ? `${quoteText}。出自 ${authorText}。`
    : `${quoteText}. By ${authorText}.`;

  const utterance = new SpeechSynthesisUtterance(textToRead);
  utterance.lang = state.currentLang === "zh" ? "zh-CN" : "en-US";
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  utterance.onstart = () => {
    state.isSpeaking = true;
    DOM.speakQuoteBtn.classList.add("speaking");
    DOM.speakIcon.textContent = "⏹";
    DOM.speakText.textContent = t.stopText;
    DOM.speakQuoteBtn.setAttribute("title", t.stopText);
  };

  utterance.onend = () => {
    stopSpeakingQuote();
  };

  utterance.onerror = () => {
    stopSpeakingQuote();
  };

  window.speechSynthesis.speak(utterance);
}

function stopSpeakingQuote() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  state.isSpeaking = false;
  const t = I18N[state.currentLang];
  if (DOM.speakQuoteBtn) {
    DOM.speakQuoteBtn.classList.remove("speaking");
    DOM.speakIcon.textContent = "🔊";
    DOM.speakText.textContent = t.listenText;
    DOM.speakQuoteBtn.setAttribute("title", t.listenText);
  }
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
  // Language Switcher Buttons
  if (DOM.langEnBtn) {
    DOM.langEnBtn.addEventListener("click", () => setLanguage("en"));
  }
  if (DOM.langZhBtn) {
    DOM.langZhBtn.addEventListener("click", () => setLanguage("zh"));
  }

  // Theme Toggle Button
  if (DOM.themeToggleBtn) {
    DOM.themeToggleBtn.addEventListener("click", toggleTheme);
  }

  // Export to CSV Button
  if (DOM.exportCsvBtn) {
    DOM.exportCsvBtn.addEventListener("click", exportQuotesToCSV);
  }

  // Font Size Buttons
  if (DOM.decreaseFontBtn) {
    DOM.decreaseFontBtn.addEventListener("click", () => setSpotlightFontSize(state.fontSizeIndex - 1));
  }
  if (DOM.increaseFontBtn) {
    DOM.increaseFontBtn.addEventListener("click", () => setSpotlightFontSize(state.fontSizeIndex + 1));
  }

  // Next Quote Button
  DOM.nextQuoteBtn.addEventListener("click", () => {
    fetchRandomQuote(state.activeCategory);
  });

  // Copy Quote Button (Spotlight)
  DOM.copyQuoteBtn.addEventListener("click", async () => {
    if (state.currentQuote) {
      const q = getQuoteText(state.currentQuote);
      const a = getQuoteAuthor(state.currentQuote);
      const t = I18N[state.currentLang];
      await copyToClipboard(`“${q}” — ${a}`);
      DOM.copyText.textContent = t.copiedText;
      setTimeout(() => {
        DOM.copyText.textContent = t.copyText;
      }, 1800);
    }
  });

  // Speak / Stop Quote Button
  DOM.speakQuoteBtn.addEventListener("click", toggleSpeech);

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

  // Floating Back to Top Button
  if (DOM.backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 350) {
        DOM.backToTopBtn.classList.add("visible");
      } else {
        DOM.backToTopBtn.classList.remove("visible");
      }
    });

    DOM.backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Keyboard Navigation: Space or R for next quote
  window.addEventListener("keydown", (e) => {
    const tag = document.activeElement ? document.activeElement.tagName : "";
    if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") {
      return;
    }

    if (e.key === " " || e.key === "r" || e.key === "R") {
      e.preventDefault();
      fetchRandomQuote(state.activeCategory);
    }
  });
}

// Set active category and sync UI
function setCategory(category) {
  state.activeCategory = category;
  DOM.categorySelect.value = category;

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
  initLanguage();
  initTheme();
  setupEventListeners();
  await loadFilterMetadata();
  await fetchRandomQuote();
  await searchQuotes();
}

// Start application when DOM is ready
document.addEventListener("DOMContentLoaded", initApp);
