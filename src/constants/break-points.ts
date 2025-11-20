const smallBreakpoint = 640; // px
const mediumBreakpoint = 768; // px
const largeBreakpoint = 1024; // px
const extraLargeBreakpoint = 1280; // px
const extraExtraLargeBreakpoint = 1536; // px

const currentWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

const breakpoints = {
  small: smallBreakpoint,
  medium: mediumBreakpoint,
  large: largeBreakpoint,
  extraLarge: extraLargeBreakpoint,
  extraExtraLarge: extraExtraLargeBreakpoint,
};

export {
  currentWidth,
  breakpoints,
}