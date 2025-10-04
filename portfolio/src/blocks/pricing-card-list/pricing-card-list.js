import Dialog from '../dialog/dialog.js';

class PricingCardList {
  #rootElement = null;

  #dialog = null;

  constructor(rootElement, dialogElement) {
    this.#rootElement = rootElement;

    this.#dialog = new Dialog(dialogElement);

    this.#rootElement.addEventListener('click', this.#openDialog);
  }

  #openDialog = (event) => {
    if (!event.target.closest('.pricing-card__button')) {
      return;
    }

    this.#dialog.open();
  };
}

export default PricingCardList;
