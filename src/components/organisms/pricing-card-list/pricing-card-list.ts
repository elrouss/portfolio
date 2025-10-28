import Dialog from '../dialog/dialog';

class PricingCardList {
  private pricingCardListElement: HTMLUListElement | null = null;

  private dialog: Dialog | null = null;

  constructor(
    pricingCardListElement: HTMLUListElement,
    dialogElement: HTMLDivElement
  ) {
    this.pricingCardListElement = pricingCardListElement;

    this.dialog = new Dialog(dialogElement);

    this.pricingCardListElement.addEventListener('click', this.#openDialog);
  }

  #openDialog = ({ target }: Event) => {
    if (
      !(target instanceof HTMLElement) ||
      !target.closest('.pricing-card__button')
    ) {
      return;
    }

    this.dialog?.open();
  };
}

export default PricingCardList;
