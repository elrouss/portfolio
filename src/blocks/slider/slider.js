import TouchDeviceAdapter from '../../services/touch-device-adapter.js';

import { BREAKPOINTS } from '../../constants/breakpoints.js';

const SCROLL_BASIC_STEP = 4;
const SWIPE_BASIC_STEP = 300;

class Slider {
  #sliderElement = null;

  #sliderInnerElement = null;
  #slidesElement = null;

  #hoverAreaStartElement = null;
  #hoverAreaEndElement = null;

  #slidesOffsetXTimeoutIntervalId = null;
  #slidesOffsetX = 0;

  #mode;

  constructor(slider) {
    this.#sliderElement = slider;

    this.#sliderInnerElement =
      this.#sliderElement.querySelector('.slider__inner');
    this.#slidesElement = this.#sliderElement.querySelector('.slider__slides');

    this.#hoverAreaStartElement = this.#sliderElement.querySelector(
      '.slider__hover-area_start'
    );
    this.#hoverAreaEndElement = this.#sliderElement.querySelector(
      '.slider__hover-area_end'
    );

    this.#setMode();
    this.#setSlidesOffsetX();

    window.addEventListener('resize', this.#resizeSlides);
  }

  #setMode = () => {
    const mode = TouchDeviceAdapter.isTouchDevice() ? 'swipe' : 'scroll';

    if (this.#mode === mode) {
      return;
    }

    this.#mode = mode;

    if (this.#mode === 'scroll') {
      this.#turnOnScrollMode();
    } else {
      this.#turnOnSwipeMode();
    }
  };

  #turnOnScrollMode = () => {
    this.#hoverAreaStartElement.classList.remove('hidden');
    this.#hoverAreaEndElement.classList.remove('hidden');
    this.#slidesElement.classList.remove('slider__slides_transition');

    this.#sliderElement.removeEventListener('touchstart', this.#onTouchStart);
    this.#sliderElement.removeEventListener('touchend', this.#onTouchEnd);

    this.#hoverAreaStartElement.addEventListener(
      'mouseenter',
      this.#onAreaStartElementMouseEnter
    );
    this.#hoverAreaStartElement.addEventListener(
      'mouseleave',
      this.#onMouseLeave
    );

    this.#hoverAreaEndElement.addEventListener(
      'mouseenter',
      this.#onAreaEndElementMouseEnter
    );
    this.#hoverAreaEndElement.addEventListener(
      'mouseleave',
      this.#onMouseLeave
    );
  };

  #turnOnSwipeMode = () => {
    this.#hoverAreaStartElement.classList.add('hidden');
    this.#hoverAreaEndElement.classList.add('hidden');
    this.#slidesElement.classList.add('slider__slides_transition');

    this.#hoverAreaStartElement.removeEventListener(
      'mouseenter',
      this.#onAreaStartElementMouseEnter
    );
    this.#hoverAreaStartElement.removeEventListener(
      'mouseleave',
      this.#onMouseLeave
    );

    this.#hoverAreaEndElement.removeEventListener(
      'mouseenter',
      this.#onAreaEndElementMouseEnter
    );
    this.#hoverAreaEndElement.removeEventListener(
      'mouseleave',
      this.#onMouseLeave
    );

    this.#sliderElement.addEventListener('touchstart', this.#onTouchStart);
    this.#sliderElement.addEventListener('touchend', this.#onTouchEnd);
  };

  #resizeSlides = () => {
    this.#setMode();

    if (window.innerWidth >= BREAKPOINTS.xl) {
      return;
    }

    this.#setSlidesOffsetX(this.#slidesOffsetX);
  };

  #setSlidesOffsetX = (offset = 0) => {
    const parentWidth =
      this.#sliderInnerElement.getBoundingClientRect().width / 2;
    const childWidth = this.#slidesElement.getBoundingClientRect().width / 2;

    let calc = parentWidth - childWidth + offset;

    const permissibleTransitionX = (parentWidth - childWidth) * 2;
    const isFarStart = calc > 0;
    const isFarEnd = calc < permissibleTransitionX;

    if (isFarStart) {
      calc = 0;
    } else if (isFarEnd) {
      calc = permissibleTransitionX;
    }

    this.#slidesElement.style.transform = `translateX(${calc}px)`;
  };

  #scrollSlider = (direction) => {
    const step = this.#calcSliderStep(direction, SCROLL_BASIC_STEP);

    if (Math.abs(Math.round(step)) <= 0) {
      return;
    }

    if (this.#slidesOffsetXTimeoutIntervalId) {
      clearInterval(this.#slidesOffsetXTimeoutIntervalId);
    }

    this.#slidesOffsetXTimeoutIntervalId = setInterval(() => {
      const step = this.#calcSliderStep(direction, SCROLL_BASIC_STEP);

      this.#slidesOffsetX += step;

      this.#setSlidesOffsetX(this.#slidesOffsetX);

      if (Math.abs(Math.round(step)) <= 0) {
        clearInterval(this.#slidesOffsetXTimeoutIntervalId);
      }
    }, 0);
  };

  #calcSliderStep = (direction, basicStep) => {
    const parentRect = this.#sliderInnerElement.getBoundingClientRect();
    const childRect = this.#slidesElement.getBoundingClientRect();

    if (direction === 'start') {
      const currentTranslateX = parentRect.left - childRect.left;
      const nextTranslateX = currentTranslateX - basicStep;

      return nextTranslateX < 0 ? currentTranslateX : basicStep;
    }

    const currentTranslateX = parentRect.right - childRect.right;
    const nextTranslateX = currentTranslateX + basicStep;

    return nextTranslateX > 0 ? currentTranslateX : -basicStep;
  };

  #swipeSlider = (step) => {
    this.#slidesOffsetX += step;
    this.#setSlidesOffsetX(this.#slidesOffsetX);
  };

  #onAreaStartElementMouseEnter = () => {
    this.#scrollSlider('start');
  };

  #onAreaEndElementMouseEnter = () => {
    this.#scrollSlider('end');
  };

  #onMouseLeave = () => {
    clearInterval(this.#slidesOffsetXTimeoutIntervalId);
  };

  #onTouchStart = (event) => {
    TouchDeviceAdapter.onTouchStart(event);
  };

  #onTouchEnd = (event) => {
    TouchDeviceAdapter.onTouchEnd(event);

    if (!TouchDeviceAdapter.isSwipe) {
      return;
    }

    const swipeStep = this.#calcSliderStep(
      TouchDeviceAdapter.direction,
      SWIPE_BASIC_STEP
    );

    this.#swipeSlider(swipeStep);
  };
}

export default Slider;
