import { convertToRem } from '../../utils/styles.js';

import { BREAKPOINTS } from 'constants/breakpoints.js';
import { TRANSITION_DURATION_BASIC } from 'constants/transition.js';

class Header {
  #rootElement = null;

  #hamburger = null;
  #drawer = null;
  #drawerNav = null;

  #isDrawerOpen = false;

  constructor(rootElement) {
    this.#rootElement = rootElement || null;

    this.#hamburger = this.#rootElement?.querySelector('.hamburger') || null;
    this.#drawer = document.querySelector('.drawer') || null;
    this.#drawerNav = this.#drawer?.querySelector('nav') || null;

    this.#setDrawerStyle();

    this.#hamburger?.addEventListener('click', this.#toggleDrawer);
    this.#drawerNav?.addEventListener('click', this.#handleDrawerNavLinkClick);

    window.addEventListener('resize', this.#setDrawerStyle);
  }

  #openDrawer = () => {
    this.#isDrawerOpen = true;

    document.documentElement.classList.add('scroll-lock');

    this.#hamburger?.classList.add('hamburger_open');
    this.#hamburger?.classList.remove('hamburger_close');
    this.#drawer?.classList.remove('drawer_hidden');

    this.#hamburger.setAttribute('aria-pressed', 'true');
  };

  #closeDrawer = () => {
    this.#isDrawerOpen = false;

    document.documentElement.classList.remove('scroll-lock');

    this.#hamburger?.classList.remove('hamburger_open');
    this.#drawer?.classList.add('drawer_hidden');

    this.#hamburger.setAttribute('aria-pressed', 'false');
  };

  #toggleDrawer = () => {
    if (this.#isDrawerOpen) {
      this.#closeDrawer();
      this.#hamburger?.classList.add('hamburger_close');
    } else {
      this.#setDrawerStyle();
      this.#openDrawer();
    }
  };

  #setDrawerStyle = () => {
    if (!this.#drawer) {
      return;
    }

    const headerHeight = this.#rootElement?.getBoundingClientRect().height ?? 0;

    this.#drawer.style.insetBlockStart = `${convertToRem(headerHeight + window.scrollY)}rem`;
    this.#drawer.style.height = `calc(100% - ${convertToRem(headerHeight)}rem)`;

    this.resetDrawer();
  };

  resetDrawer = () => {
    this.#hamburger?.classList.remove('hamburger_close');

    if (!this.#isDrawerOpen) {
      return;
    }

    const { clientWidth } = document.documentElement;

    if (clientWidth > BREAKPOINTS.s) {
      this.#closeDrawer();
    }
  };

  #handleDrawerNavLinkClick = (event) => {
    const { target } = event;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const anchor = target.closest('a');

    if (!anchor) {
      return;
    }

    event.preventDefault();

    this.#closeDrawer();
    this.#hamburger?.classList.add('hamburger_close');
    setTimeout(() => this.#scrollToSection(anchor), TRANSITION_DURATION_BASIC);
  };

  #scrollToSection = ({ href }) => {
    const link = href.slice(href.indexOf('#'));
    const element = document.querySelector(link);

    if (!element) {
      return;
    }

    element.scrollIntoView();
  };
}

export default Header;
