import { runApp } from './index.js';
import { JoulesCart } from './vendors/joules.com.js';

runApp(new JoulesCart('https://www.joules.com/cart'));
