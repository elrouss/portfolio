class Dialog {
  private dialogElement: HTMLDivElement | null = null;

  private closeButton: HTMLButtonElement | null = null;

  constructor(dialogElement: HTMLDivElement) {
    this.dialogElement = dialogElement;

    this.closeButton = this.dialogElement.querySelector(
      '.dialog__close-button'
    );

    this.dialogElement.addEventListener('click', this.handleOverlayClick);
    this.closeButton?.addEventListener('click', this.close);
  }

  open = () => {
    document.documentElement.classList.add('scroll-lock');
    this.dialogElement?.classList.remove('visually-hidden');

    window.addEventListener('keydown', this.handleOverlayKeydown);
  };

  private close = () => {
    document.documentElement.classList.remove('scroll-lock');
    this.dialogElement?.classList.add('visually-hidden');

    window.removeEventListener('keydown', this.handleOverlayKeydown);
  };

  private handleOverlayClick = (event: Event) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    this.close();
  };

  private handleOverlayKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape') {
      return;
    }

    this.close();
  };
}

export default Dialog;
