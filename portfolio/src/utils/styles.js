export const convertToRem = (size, rootFontSize = 16) => size / rootFontSize;

export const enableOnLoadStyle = () => {
  const preloadElements = document.querySelectorAll('.preload');

  preloadElements.forEach((element) => element.classList.remove('preload'));
};
