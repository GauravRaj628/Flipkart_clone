const Storage = {
  KEYS: {
    CART: "flipkart_cart",
    WISHLIST: "flipkart_wishlist",
    ORDERS: "flipkart_orders"
  },

  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getCart() {
    return this.get(this.KEYS.CART) || [];
  },

  saveCart(cart) {
    this.set(this.KEYS.CART, cart);
    document.dispatchEvent(new CustomEvent("cartUpdated"));
  },

  getWishlist() {
    return this.get(this.KEYS.WISHLIST) || [];
  },

  saveWishlist(wishlist) {
    this.set(this.KEYS.WISHLIST, wishlist);
    document.dispatchEvent(new CustomEvent("wishlistUpdated"));
  },

  getOrders() {
    return this.get(this.KEYS.ORDERS) || [];
  },

  saveOrder(order) {
    const orders = this.getOrders();
    orders.unshift(order);
    this.set(this.KEYS.ORDERS, orders);
  }
};
