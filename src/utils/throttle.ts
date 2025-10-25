import { TRANSITION_DURATION_BASIC } from '../constants/transition';

export const throttle = (
  callback: (...args: unknown[]) => void,
  limiter = TRANSITION_DURATION_BASIC
) => {
  let previousTime = 0;

  return (...args: unknown[]) => {
    const currentTime = new Date().getTime();

    if (currentTime - previousTime > limiter) {
      previousTime = currentTime;

      callback(args);
    }
  };
};
