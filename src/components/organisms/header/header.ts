import { convertToRem } from '@/utils/styles';

import { BREAKPOINTS } from '@/constants/breakpoints';
import { TRANSITION_DURATION_BASIC } from '@/constants/transition';

class Header {
  private headerElement: HTMLElement | null = null;

  private hamburger: HTMLButtonElement | null = null;
  private drawer: HTMLDivElement | null = null;
  private drawerNav: HTMLElement | null = null;

  private isDrawerOpen = false;

  constructor(headerElement: HTMLElement) {
    this.headerElement = headerElement;

    this.hamburger = this.headerElement.querySelector('.hamburger') || null;
    this.drawer = document.querySelector('.drawer') || null;
    this.drawerNav = this.drawer?.querySelector('nav') || null;

    this.setDrawerStyle();

    this.hamburger?.addEventListener('click', this.toggleDrawer);
    this.drawerNav?.addEventListener('click', this.handleDrawerNavLinkClick);

    window.addEventListener('resize', this.setDrawerStyle);
  }

  private openDrawer = () => {
    this.isDrawerOpen = true;

    document.documentElement.classList.add('scroll-lock');

    this.hamburger?.classList.add('hamburger_open');
    this.hamburger?.classList.remove('hamburger_close');
    this.drawer?.classList.remove('drawer_hidden');

    this.hamburger?.setAttribute('aria-pressed', 'true');
  };

  private closeDrawer = () => {
    this.isDrawerOpen = false;

    document.documentElement.classList.remove('scroll-lock');

    this.hamburger?.classList.remove('hamburger_open');
    this.drawer?.classList.add('drawer_hidden');

    this.hamburger?.setAttribute('aria-pressed', 'false');
  };

  private toggleDrawer = () => {
    if (this.isDrawerOpen) {
      this.closeDrawer();
      this.hamburger?.classList.add('hamburger_close');
    } else {
      this.setDrawerStyle();
      this.openDrawer();
    }
  };

  private setDrawerStyle = () => {
    if (!this.drawer) {
      return;
    }

    const headerHeight =
      this.headerElement?.getBoundingClientRect().height ?? 0;

    this.drawer.style.insetBlockStart = `${convertToRem(headerHeight + window.scrollY)}rem`;
    this.drawer.style.height = `calc(100% - ${convertToRem(headerHeight)}rem)`;

    this.resetDrawer();
  };

  private resetDrawer = () => {
    this.hamburger?.classList.remove('hamburger_close');

    if (!this.isDrawerOpen) {
      return;
    }

    const { clientWidth } = document.documentElement;

    if (clientWidth > BREAKPOINTS.s) {
      this.closeDrawer();
    }
  };

  private handleDrawerNavLinkClick = (event: Event) => {
    const { target } = event;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const anchor = target.closest('a');

    if (!anchor) {
      return;
    }

    event.preventDefault();

    this.closeDrawer();
    this.hamburger?.classList.add('hamburger_close');
    setTimeout(() => this.scrollToSection(anchor), TRANSITION_DURATION_BASIC);
  };

  private scrollToSection = ({ href }: HTMLAnchorElement) => {
    const link = href.slice(href.indexOf('#'));
    const element = document.querySelector(link);

    if (!element) {
      return;
    }

    element.scrollIntoView();
  };
}

export default Header;
