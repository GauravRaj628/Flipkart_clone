const Wishlist = {
  getIds() {
    return Storage.getWishlist();
  },

  getCount() {
    return this.getIds().length;
  },

  isInWishlist(productId) {
    return this.getIds().includes(productId);
  },

  toggle(productId) {
    let list = this.getIds();
    if (this.isInWishlist(productId)) {
      list = list.filter((id) => id !== productId);
      App.showToast("Removed from wishlist");
    } else {
      list.push(productId);
      App.showToast("Added to wishlist!");
    }
    Storage.saveWishlist(list);
    return this.isInWishlist(productId);
  },

  remove(productId) {
    const list = this.getIds().filter((id) => id !== productId);
    Storage.saveWishlist(list);
    App.showToast("Removed from wishlist");
  },

  getProducts() {
    return this.getIds()
      .map((id) => Products.getById(id))
      .filter(Boolean);
  }
};
