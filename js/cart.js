const Cart = {
  getItems() {
    return Storage.getCart();
  },

  getCount() {
    return this.getItems().reduce((sum, item) => sum + item.quantity, 0);
  },

  getTotal() {
    return this.getItems().reduce((sum, item) => {
      const product = Products.getById(item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  },

  add(productId, quantity = 1) {
    const cart = this.getItems();
    const existing = cart.find((item) => item.productId === productId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    Storage.saveCart(cart);
    App.showToast("Added to cart!");
  },

  updateQuantity(productId, quantity) {
    let cart = this.getItems();
    if (quantity <= 0) {
      cart = cart.filter((item) => item.productId !== productId);
    } else {
      const item = cart.find((i) => i.productId === productId);
      if (item) item.quantity = quantity;
    }
    Storage.saveCart(cart);
  },

  remove(productId) {
    const cart = this.getItems().filter((item) => item.productId !== productId);
    Storage.saveCart(cart);
    App.showToast("Removed from cart");
  },

  clear() {
    Storage.saveCart([]);
  },

  getDetailedItems() {
    return this.getItems()
      .map((item) => {
        const product = Products.getById(item.productId);
        if (!product) return null;
        return { ...product, quantity: item.quantity };
      })
      .filter(Boolean);
  }
};
