import { runApp } from './index.js';
import { NewlookCart } from './vendors/newlook.com.js';

runApp(new NewlookCart('https://www.newlook.com/uk/json/cart/currentCart.json'));
