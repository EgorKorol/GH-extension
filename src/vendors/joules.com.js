import { Cart } from '../index.js';
import { DEFAULT_PRICE } from '../constants.js';
import { dataOrNull, getFullUrl } from '../utils.js';

const getPrice = (str = '') => {
  if (!str) {
    return { ...DEFAULT_PRICE };
  }

  const value = str.trim();

  return value
    ? { formattedValue: value, value: parseFloat(value.substring(1)) }
    : { ...DEFAULT_PRICE };
};

const getTotalPrice = (html) => {
  if (!html) {
    return { ...DEFAULT_PRICE };
  }

  const totalNode = html.querySelector('.subtotal-summary');
  const total = totalNode && totalNode.textContent.trim();

  return getPrice(total);
};

const getCartItems = (html) => {
  if (!html) {
    return [];
  }

  const skusNodes = html.querySelectorAll('.sku-value');
  const skus = skusNodes && skusNodes.length
    ? Array.from(skusNodes).map((node) => node.textContent.trim())
    : [];
  const productsNodes = html.querySelectorAll('.shopping-basket-item');
  const products = productsNodes && productsNodes.length
    ? Array.from(productsNodes)
    : [];

  if (!skus.length || !products.length) {
    return [];
  }

  return products.map((node, index) => {
    const imageNode = node.querySelector('.product-details-image img');
    const imageMedia = imageNode && imageNode.getAttribute('data-media');
    const imageUrlFromDataMedia = Object.values(JSON.parse(imageMedia))[1];
    const titleNode = node.querySelector('.basket-details a');
    const title = titleNode && titleNode.textContent.trim();
    const quantityNode = node.querySelector('form input[name="quantity"]');
    const quantity = quantityNode && parseInt(quantityNode.getAttribute('value'));
    const priceNode = node.querySelector('.basket-details .item-price');
    const price = priceNode && priceNode.textContent.trim();
    const totalPriceNode = node.querySelector('.basket-details .subtotal-value');
    const totalPrice = totalPriceNode && totalPriceNode.textContent.trim();

    return {
      imageUrl: dataOrNull(getFullUrl(imageUrlFromDataMedia)),
      title: dataOrNull(title),
      quantity: dataOrNull(quantity),
      price: getPrice(price),
      totalPrice: getPrice(totalPrice),
      sku: skus[index],
    };
  });
};

export class JoulesCart extends Cart {
  constructor(url) {
    super(url);
  }

  convertRowData(payload) {
    const parser = new DOMParser();
    const html = parser.parseFromString(payload, 'text/html');

    this.saveCartItems(getCartItems(html));
    this.saveTotalPrice(getTotalPrice(html));
  }
}
