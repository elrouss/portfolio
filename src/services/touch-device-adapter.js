const MIN_SWIPE_SIZE = 50;

class TouchDeviceAdapter {
  static direction;
  static isSwipe;

  static #clientX = {
    start: 0,
    end: 0
  };

  static isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;

  static onTouchStart = (event) => {
    this.#clientX = {
      start: Math.round(event.touches[0].clientX),
      end: 0
    };
  };

  static onTouchEnd = (event) => {
    this.#clientX = {
      ...this.#clientX,
      end: Math.round(event.changedTouches[0].clientX)
    };

    const touchMovement = this.#clientX.end - this.#clientX.start;

    this.direction = touchMovement >= 0 ? 'start' : 'end';
    this.isSwipe = Math.abs(touchMovement) >= MIN_SWIPE_SIZE;
  };
}

export default TouchDeviceAdapter;
