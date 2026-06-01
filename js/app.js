const App = {
  init() {
    this.renderHeader();
    this.renderFooter();
    this.updateBadges();
    this.initSearch();
    this.initToast();

    document.addEventListener("cartUpdated", () => this.updateBadges());
    document.addEventListener("wishlistUpdated", () => this.updateBadges());
  },

  renderHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    header.innerHTML = `
      <div class="header-top">
        <div class="container header-inner">
          <a href="index.html" class="logo">
            <span class="logo-text">Flipkart</span>
            <span class="logo-plus">Plus</span>
          </a>
          <form class="search-form" id="searchForm">
            <input type="text" class="search-input" id="searchInput" placeholder="Search for products, brands and more" />
            <button type="submit" class="search-btn" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            </button>
          </form>
          <nav class="header-nav">
            <a href="products.html" class="nav-link ${currentPage === "products.html" ? "active" : ""}">Products</a>
            <a href="wishlist.html" class="nav-link nav-icon">
              Wishlist
              <span class="badge" id="wishlistBadge">0</span>
            </a>
            <a href="cart.html" class="nav-link nav-icon">
              Cart
              <span class="badge" id="cartBadge">0</span>
            </a>
          </nav>
        </div>
      </div>
    `;
  },

  renderFooter() {
    const footer = document.querySelector(".site-footer");
    if (!footer) return;

    footer.innerHTML = `
      <div class="container footer-grid">
        <div class="footer-col">
          <h4>ABOUT</h4>
          <a href="#">Contact Us</a>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
        </div>
        <div class="footer-col">
          <h4>HELP</h4>
          <a href="#">Payments</a>
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
        </div>
        <div class="footer-col">
          <h4>POLICY</h4>
          <a href="#">Return Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy</a>
        </div>
        <div class="footer-col">
          <h4>SOCIAL</h4>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">YouTube</a>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">
          <p>© 2026 Flipkart Clone. Built for learning purposes.</p>
        </div>
      </div>
    `;
  },

  updateBadges() {
    const cartBadge = document.getElementById("cartBadge");
    const wishlistBadge = document.getElementById("wishlistBadge");
    if (cartBadge) cartBadge.textContent = Cart.getCount();
    if (wishlistBadge) wishlistBadge.textContent = Wishlist.getCount();
  },

  initSearch() {
    const form = document.getElementById("searchForm");
    const input = document.getElementById("searchInput");
    if (!form || !input) return;

    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) input.value = q;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = input.value.trim();
      window.location.href = query
        ? `products.html?q=${encodeURIComponent(query)}`
        : "products.html";
    });
  },

  initToast() {
    if (!document.getElementById("toast")) {
      const toast = document.createElement("div");
      toast.id = "toast";
      toast.className = "toast";
      document.body.appendChild(toast);
    }
  },

  showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
  },

  getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }
};

document.addEventListener("DOMContentLoaded", () => App.init());
