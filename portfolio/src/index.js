import * as icons from './blocks/icon/icon.js';

import Auth from './services/auth.js';

import Header from './blocks/header/header.js';

import Slider from './blocks/slider/slider.js';
import PricingCardList from './blocks/pricing-card-list/pricing-card-list.js';
import Accordion from './blocks/accordion/accordion.js';

import { enableOnLoadStyle } from './utils/styles.js';

void icons;

Auth.authorize();

const header = document.querySelector('.header');
const portfolioSlider = document.querySelector('.slider');
const pricingCardList = document.querySelector('.pricing-card-list');
const bookingDialog = document.querySelector('.dialog');
const faqAccordion = document.querySelector('.faq__accordion');

new Header(header);

new Slider(portfolioSlider);
new PricingCardList(pricingCardList, bookingDialog);
new Accordion(faqAccordion);

window.addEventListener('load', enableOnLoadStyle);
