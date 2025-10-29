import Auth from '@/services/auth';
import LocalStorageAdapter from '@/services/local-storage-adapter';

const localStorageKey = 'elrouss-portfolio:faq';

class Accordion {
  private accordionElement: HTMLDivElement | null = null;

  private detailsList: NodeListOf<HTMLDetailsElement> | null = null;

  constructor(accordionElement: HTMLDivElement) {
    this.accordionElement = accordionElement;

    this.detailsList = this.accordionElement.querySelectorAll('details');

    this.accordionElement.addEventListener('click', this.onAccordionClick);

    this.init();
  }

  private init = () => {
    if (Auth.isWebsiteFirstVisit) {
      this.setInitialOpenSummaryId();
    } else {
      this.setDefaultOpenSummaryId();
    }
  };

  private setInitialOpenSummaryId = () => {
    this.detailsList?.[Number(0)]?.setAttribute('open', '');

    LocalStorageAdapter.setItem(localStorageKey, '0');
  };

  private setDefaultOpenSummaryId = () => {
    const openSummaryId = LocalStorageAdapter.getItem<string>(localStorageKey);

    if (!openSummaryId) {
      return;
    }

    this.detailsList?.[Number(openSummaryId)]?.setAttribute('open', '');
  };

  private onAccordionClick = (event: Event) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    const summary: HTMLElement | null = event.target.closest(
      '.accordion__summary'
    );

    if (!summary) {
      return;
    }

    const { id } = summary.dataset;

    if (LocalStorageAdapter.getItem<string>(localStorageKey) === id) {
      LocalStorageAdapter.removeItem(localStorageKey);
    } else {
      LocalStorageAdapter.setItem(localStorageKey, summary.dataset.id);
    }
  };
}

export default Accordion;
