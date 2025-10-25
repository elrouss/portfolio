class Dialog {
  #rootElement = null;

  #closeButton = null;

  constructor(rootElement) {
    this.#rootElement = rootElement;

    this.#closeButton = this.#rootElement.querySelector(
      '.dialog__close-button'
    );

    this.#rootElement.addEventListener('click', this.handleOverlayClick);
    this.#closeButton.addEventListener('click', this.close);
  }

  handleOverlayClick = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    this.close();
  };

  handleOverlayKeydown = (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    this.close();
  };

  open = () => {
    document.documentElement.classList.add('scroll-lock');
    this.#rootElement.classList.remove('visually-hidden');

    window.addEventListener('keydown', this.handleOverlayKeydown);
  };

  close = () => {
    document.documentElement.classList.remove('scroll-lock');
    this.#rootElement.classList.add('visually-hidden');

    window.removeEventListener('keydown', this.handleOverlayKeydown);
  };
}

export default Dialog;
