import * as icons from './blocks/icon/icon.js';

import Auth from './services/auth.js';

import Header from './blocks/header/header.js';

import PricingCardList from './blocks/pricing-card-list/pricing-card-list.js';
import Accordion from './blocks/accordion/accordion.js';

void icons;

Auth.authorize();

new Header(document.querySelector('.header'));

new PricingCardList(
  document.querySelector('.pricing-card-list'),
  document.querySelector('.dialog')
);
new Accordion(document.querySelector('.faq__accordion'));
