import Auth from '../../services/auth.js';
import LocalStorageAdapter from '../../services/local-storage-adapter.js';

const localStorageKey = 'elrouss-portfolio:faq';

class Accordion {
  #rootElement = null;

  #detailsList = null;

  constructor(rootElement) {
    this.#rootElement = rootElement;

    this.#detailsList = this.#rootElement.querySelectorAll('details');

    this.#rootElement?.addEventListener('click', this.#onAccordionClick);

    this.#init();
  }

  #init = () => {
    if (Auth.isWebsiteFirstVisit) {
      this.#setDefaultOpenSummaryId();
    } else {
      this.#setInitialOpenSummaryId();
    }
  };

  #setInitialOpenSummaryId = () => {
    this.#detailsList[Number(0)]?.setAttribute('open', '');

    LocalStorageAdapter.setItem(localStorageKey, '0');
  };

  #setDefaultOpenSummaryId = () => {
    const openSummaryId = LocalStorageAdapter.getItem(localStorageKey);

    if (!openSummaryId) {
      return;
    }

    this.#detailsList[Number(openSummaryId)]?.setAttribute('open', '');
  };

  #onAccordionClick = (event) => {
    const summary = event.target.closest('.accordion__summary');

    if (!summary) {
      return;
    }

    const { id } = summary.dataset;

    if (LocalStorageAdapter.getItem(localStorageKey) === id) {
      LocalStorageAdapter.removeItem(localStorageKey);
    } else {
      LocalStorageAdapter.setItem(localStorageKey, summary.dataset.id);
    }
  };
}

export default Accordion;
