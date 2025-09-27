import * as icons from './blocks/icon/icon.js';

import Auth from './services/auth.js';

import Accordion from './blocks/accordion/accordion.js';

void icons;

Auth.authorize();

new Accordion(document.querySelector('.faq__accordion'));
