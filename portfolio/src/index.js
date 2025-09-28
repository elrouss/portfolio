import * as icons from './blocks/icon/icon.js';

import Auth from './services/auth.js';

import Header from './blocks/header/header.js';
import Accordion from './blocks/accordion/accordion.js';

void icons;

Auth.authorize();

new Header(document.querySelector('.header'));
new Accordion(document.querySelector('.faq__accordion'));
