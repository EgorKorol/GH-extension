import { Cart } from '../index.js';
import { getFullUrl } from '../utils.js';

const getPrice = ({ value = null, formattedValue = null }) => {
  return { value, formattedValue };
};

const getCartItems = (items) => {
  return items.map(({ quantity, totalPrice, product, basePrice }) => {
    return {
      title: product.name,
      imageUrl: getFullUrl(product.imageUrl),
      price: getPrice(basePrice),
      totalPrice: getPrice(totalPrice),
      sku: product.sku,
      quantity,
    };
  })
};

export class NewlookCart extends Cart {
  constructor(url) {
    super(url);
  }

  convertRowData({ data }) {
    const { totalPrice, entries } = data;

    this.saveCartItems(getCartItems(entries));
    this.saveTotalPrice(getPrice(totalPrice));
  }
}
