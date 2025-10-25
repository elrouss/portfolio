import { TRANSITION_DURATION_BASIC } from '../constants/transition.js';

export const throttle = (callback, limiter = TRANSITION_DURATION_BASIC) => {
  let previousTime = 0;

  return (...args) => {
    const currentTime = new Date().getTime();

    if (currentTime - previousTime > limiter) {
      previousTime = currentTime;

      callback(args);
    }
  };
};
