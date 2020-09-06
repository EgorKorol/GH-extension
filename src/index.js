import axios from 'axios';

export class Cart {
  /**
   * @param {string} url which return user's cart
   */
  constructor(url) {
    this.url = url;
  }

  getCartData() {
    axios.get(this.url)
      .then(({ data }) => {
        this.convertRowData(data)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * @param {any} payload any row data from server
   */
  convertRowData(payload) {
    throw new Error('convertRowData method should be implemented');
  }

  /**
   * @param {Object[]} cart - Current user's cart items'.
   * @param {string} cart.title - The item's name.
   * @param {string} cart.imageUrl - The item's image.
   * @param {Object} cart.price - The item's price.
   * @param {number} cart.price.value - The number value.
   * @param {string} cart.price.formattedValue - The string value with currency.
   * @param {Object} cart.totalPrice - The items' price.
   * @param {number} cart.totalPrice.value - The number value.
   * @param {string} cart.totalPrice.formattedValue - The string value with currency.
   * @param {string} cart.sku - The item's SKU.
   * @param {number} cart.quantity - The item's quantity.
   */
  saveCartItems(cart) {
    this.cart = cart;
  }

  /**
   * @param {Object} total - The items' price.
   * @param {number} total.value - The number value.
   * @param {string} total.formattedValue - The string value with currency.
   */
  saveTotalPrice(total) {
    this.total = total;
  }

  get cartItems() {
    return this.cart;
  }

  get totalPrice() {
    return this.total;
  }
}

export const runApp = (cart) => {
  window.onload = () => {
    cart.getCartData();
  
    chrome.runtime.onMessage.addListener(({ isCartUpdated = false }) => {
      if (isCartUpdated) {
        cart.getCartData();
      }
    });

    chrome.runtime.onMessage.addListener(({ isShowCart = false }, sender, sendResponse) => {
      if (isShowCart) {
        sendResponse({ total: cart.totalPrice, items: cart.cartItems });
      }
    });
  };
}
