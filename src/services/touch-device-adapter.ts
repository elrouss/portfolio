const MIN_SWIPE_SIZE = 50;

export type Direction = 'start' | 'end';

class TouchDeviceAdapter {
  static direction: Direction;
  static isSwipe: boolean;

  private static clientX = {
    start: 0,
    end: 0
  };

  static isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;

  static onTouchStart = (event: TouchEvent) => {
    const [touch] = event.touches;

    if (!touch) {
      return;
    }

    this.clientX = {
      start: Math.round(touch.clientX),
      end: 0
    };
  };

  static onTouchEnd = (event: TouchEvent) => {
    const [touch] = event.changedTouches;

    if (!touch) {
      return;
    }

    this.clientX = {
      ...this.clientX,
      end: Math.round(touch.clientX)
    };

    const touchMovement = this.clientX.end - this.clientX.start;

    this.direction = touchMovement >= 0 ? 'start' : 'end';
    this.isSwipe = Math.abs(touchMovement) >= MIN_SWIPE_SIZE;
  };
}

export default TouchDeviceAdapter;
