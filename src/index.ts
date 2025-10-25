import * as icons from './blocks/icon/icon';

import Auth from './services/auth';

import Header from './blocks/header/header';

import Slider from './blocks/slider/slider';
import PricingCardList from './blocks/pricing-card-list/pricing-card-list';
import Accordion from './blocks/accordion/accordion';

import { enableOnLoadStyle } from './utils/styles';

void icons;

Auth.authorize();

const header = document.querySelector<HTMLElement>('.header');
const portfolioSlider = document.querySelector<HTMLDivElement>('.slider');
const pricingCardList =
  document.querySelector<HTMLUListElement>('.pricing-card-list');
const bookingDialog = document.querySelector<HTMLDivElement>('.dialog');
const faqAccordion = document.querySelector<HTMLDivElement>('.faq__accordion');

if (header) {
  new Header(header);
}

if (portfolioSlider) {
  new Slider(portfolioSlider);
}

if (pricingCardList && bookingDialog) {
  new PricingCardList(pricingCardList, bookingDialog);
}

if (faqAccordion) {
  new Accordion(faqAccordion);
}

window.addEventListener('load', enableOnLoadStyle);
