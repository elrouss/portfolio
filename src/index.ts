import * as icons from './components/atoms/icon/icon';

import Auth from './services/auth';

import Header from './components/organisms/header/header';
import Slider from './components/organisms/slider/slider';
import PricingCardList from './components/organisms/pricing-card-list/pricing-card-list';
import Accordion from './components/organisms/accordion/accordion';

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
