const Products = {
  getAll() {
    return PRODUCTS;
  },

  getById(id) {
    return PRODUCTS.find((p) => p.id === Number(id));
  },

  getByCategory(category) {
    if (!category || category === "all") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === category);
  },

  search(query) {
    const q = query.toLowerCase().trim();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  },

  sort(products, sortBy) {
    const list = [...products];
    switch (sortBy) {
      case "price-low":
        return list.sort((a, b) => a.price - b.price);
      case "price-high":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      case "discount":
        return list.sort((a, b) => this.getDiscount(b) - this.getDiscount(a));
      default:
        return list;
    }
  },

  getDiscount(product) {
    if (!product.mrp || product.mrp <= product.price) return 0;
    return Math.round(((product.mrp - product.price) / product.mrp) * 100);
  },

  formatPrice(amount) {
    return "₹" + amount.toLocaleString("en-IN");
  },

  renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return (
      "★".repeat(full) +
      (half ? "½" : "") +
      "☆".repeat(empty)
    );
  },

  createCard(product) {
    const discount = this.getDiscount(product);
    const inWishlist = Wishlist.isInWishlist(product.id);

    return `
      <div class="product-card" data-id="${product.id}">
        <button class="wishlist-btn ${inWishlist ? "active" : ""}" data-id="${product.id}" aria-label="Wishlist">
          ${inWishlist ? "♥" : "♡"}
        </button>
        <a href="product-details.html?id=${product.id}" class="product-card-link">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy" />
          </div>
          <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">
              <span class="rating-badge">${product.rating} ★</span>
              <span class="review-count">(${product.reviews.toLocaleString()})</span>
            </div>
            <div class="product-price">
              <span class="price">${this.formatPrice(product.price)}</span>
              ${discount ? `<span class="mrp">${this.formatPrice(product.mrp)}</span>` : ""}
              ${discount ? `<span class="discount">${discount}% off</span>` : ""}
            </div>
          </div>
        </a>
        <button class="btn btn-add-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
  },

  renderGrid(container, products) {
    if (!container) return;
    if (products.length === 0) {
      container.innerHTML = `<div class="empty-state"><p>No products found</p></div>`;
      return;
    }
    container.innerHTML = products.map((p) => this.createCard(p)).join("");
    this.bindCardEvents(container);
  },

  bindCardEvents(container) {
    container.querySelectorAll(".btn-add-cart").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        Cart.add(Number(btn.dataset.id));
        App.updateBadges();
      });
    });

    container.querySelectorAll(".wishlist-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = Number(btn.dataset.id);
        const active = Wishlist.toggle(id);
        btn.classList.toggle("active", active);
        btn.textContent = active ? "♥" : "♡";
        App.updateBadges();
      });
    });
  }
};
