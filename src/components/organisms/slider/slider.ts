import TouchDeviceAdapter, {
  type Direction
} from '@/services/touch-device-adapter';

import { BREAKPOINTS } from '@/constants/breakpoints';

import type { Timeout } from '@/types/global.types';

const SCROLL_BASIC_STEP = 4;
const SWIPE_BASIC_STEP = 300;

class Slider {
  private sliderElement: HTMLDivElement | null = null;

  private sliderInnerElement: HTMLDivElement | null = null;
  private slidesElement: HTMLDivElement | null = null;

  private hoverAreaStartElement: HTMLDivElement | null = null;
  private hoverAreaEndElement: HTMLDivElement | null = null;

  private slidesOffsetXTimeoutIntervalId: Timeout | null = null;
  private slidesOffsetX = 0;

  private mode?: 'scroll' | 'swipe';

  constructor(slider: HTMLDivElement) {
    this.sliderElement = slider;

    this.sliderInnerElement =
      this.sliderElement.querySelector('.slider__inner');
    this.slidesElement = this.sliderElement.querySelector('.slider__slides');

    this.hoverAreaStartElement = this.sliderElement.querySelector(
      '.slider__hover-area_start'
    );
    this.hoverAreaEndElement = this.sliderElement.querySelector(
      '.slider__hover-area_end'
    );

    this.setMode();
    this.setSlidesOffsetX();

    window.addEventListener('resize', this.resizeSlides);
  }

  private setMode = () => {
    const mode = TouchDeviceAdapter.isTouchDevice() ? 'swipe' : 'scroll';

    if (this.mode === mode) {
      return;
    }

    this.mode = mode;

    if (this.mode === 'scroll') {
      this.turnOnScrollMode();
    } else {
      this.turnOnSwipeMode();
    }
  };

  private turnOnScrollMode = () => {
    this.hoverAreaStartElement?.classList.remove('hidden');
    this.hoverAreaEndElement?.classList.remove('hidden');
    this.slidesElement?.classList.remove('slider__slides_transition');

    this.sliderElement?.removeEventListener('touchstart', this.onTouchStart);
    this.sliderElement?.removeEventListener('touchend', this.onTouchEnd);

    this.hoverAreaStartElement?.addEventListener(
      'mouseenter',
      this.onAreaStartElementMouseEnter
    );
    this.hoverAreaStartElement?.addEventListener(
      'mouseleave',
      this.onMouseLeave
    );

    this.hoverAreaEndElement?.addEventListener(
      'mouseenter',
      this.onAreaEndElementMouseEnter
    );
    this.hoverAreaEndElement?.addEventListener('mouseleave', this.onMouseLeave);
  };

  private turnOnSwipeMode = () => {
    this.hoverAreaStartElement?.classList.add('hidden');
    this.hoverAreaEndElement?.classList.add('hidden');
    this.slidesElement?.classList.add('slider__slides_transition');

    this.hoverAreaStartElement?.removeEventListener(
      'mouseenter',
      this.onAreaStartElementMouseEnter
    );
    this.hoverAreaStartElement?.removeEventListener(
      'mouseleave',
      this.onMouseLeave
    );

    this.hoverAreaEndElement?.removeEventListener(
      'mouseenter',
      this.onAreaEndElementMouseEnter
    );
    this.hoverAreaEndElement?.removeEventListener(
      'mouseleave',
      this.onMouseLeave
    );

    this.sliderElement?.addEventListener('touchstart', this.onTouchStart);
    this.sliderElement?.addEventListener('touchend', this.onTouchEnd);
  };

  private resizeSlides = () => {
    this.setMode();

    if (window.innerWidth >= BREAKPOINTS.xl) {
      return;
    }

    this.setSlidesOffsetX(this.slidesOffsetX);
  };

  private setSlidesOffsetX = (offset = 0) => {
    if (
      !this.sliderElement ||
      !this.slidesElement ||
      !this.sliderInnerElement
    ) {
      return;
    }

    const parentWidth =
      this.sliderInnerElement.getBoundingClientRect().width / 2;
    const childWidth = this.slidesElement.getBoundingClientRect().width / 2;

    let calc = parentWidth - childWidth + offset;

    const permissibleTransitionX = (parentWidth - childWidth) * 2;
    const isFarStart = calc > 0;
    const isFarEnd = calc < permissibleTransitionX;

    if (isFarStart) {
      calc = 0;
    } else if (isFarEnd) {
      calc = permissibleTransitionX;
    }

    this.slidesElement.style.transform = `translateX(${calc}px)`;
  };

  private scrollSlider = (direction: Direction) => {
    const step = this.calcSliderStep(direction, SCROLL_BASIC_STEP);

    if (Math.abs(Math.round(step)) <= 0) {
      return;
    }

    if (this.slidesOffsetXTimeoutIntervalId) {
      clearInterval(this.slidesOffsetXTimeoutIntervalId);
    }

    this.slidesOffsetXTimeoutIntervalId = setInterval(() => {
      const step = this.calcSliderStep(direction, SCROLL_BASIC_STEP);

      this.slidesOffsetX += step;

      this.setSlidesOffsetX(this.slidesOffsetX);

      if (
        Math.abs(Math.round(step)) <= 0 &&
        this.slidesOffsetXTimeoutIntervalId
      ) {
        clearInterval(this.slidesOffsetXTimeoutIntervalId);
      }
    }, 0);
  };

  private calcSliderStep = (direction: Direction, basicStep: number) => {
    if (!this.sliderInnerElement || !this.slidesElement) {
      return 0;
    }

    const parentRect = this.sliderInnerElement.getBoundingClientRect();
    const childRect = this.slidesElement.getBoundingClientRect();

    if (direction === 'start') {
      const currentTranslateX = parentRect.left - childRect.left;
      const nextTranslateX = currentTranslateX - basicStep;

      return nextTranslateX < 0 ? currentTranslateX : basicStep;
    }

    const currentTranslateX = parentRect.right - childRect.right;
    const nextTranslateX = currentTranslateX + basicStep;

    return nextTranslateX > 0 ? currentTranslateX : -basicStep;
  };

  private swipeSlider = (step: number) => {
    this.slidesOffsetX += step;
    this.setSlidesOffsetX(this.slidesOffsetX);
  };

  private onAreaStartElementMouseEnter = () => {
    this.scrollSlider('start');
  };

  private onAreaEndElementMouseEnter = () => {
    this.scrollSlider('end');
  };

  private onMouseLeave = () => {
    if (this.slidesOffsetXTimeoutIntervalId) {
      clearInterval(this.slidesOffsetXTimeoutIntervalId);
    }
  };

  private onTouchStart = (event: TouchEvent) => {
    TouchDeviceAdapter.onTouchStart(event);
  };

  private onTouchEnd = (event: TouchEvent) => {
    TouchDeviceAdapter.onTouchEnd(event);

    if (!TouchDeviceAdapter.isSwipe) {
      return;
    }

    const swipeStep = this.calcSliderStep(
      TouchDeviceAdapter.direction,
      SWIPE_BASIC_STEP
    );

    this.swipeSlider(swipeStep);
  };
}

export default Slider;
