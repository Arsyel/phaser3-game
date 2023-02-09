type CalculateScreenType = {
  width: number;
  height: number;
  zoom: number;
};

type ScreenConversionFn = (config: CalculateScreenType) => CalculateScreenType;

type ScreenType = 'PORTRAIT' | 'LANDSCAPE';

const SMALL_RESOLUTION = 480;
const ASPECT_RATIO = 9 / 16;

const isSmallResolution = () => {
  return window.innerWidth < SMALL_RESOLUTION;
};

// Avoid bleeding on edge screen
const toEven = (val: number) => {
  const result = Math.round(val);
  return result + (result % 2);
};

const calculateScreen = () => {
  const dprModifier = isSmallResolution() ? window.devicePixelRatio : 1;
  return {
    width: window.innerWidth * dprModifier,
    height: window.innerHeight * dprModifier,
    zoom: 1 / dprModifier,
  };
};

const portraitConversion: ScreenConversionFn = (config) => {
  const height = config.height;
  const isLandscape = config.width > height;
  const width = !isLandscape ? config.width : height * ASPECT_RATIO;
  return {
    width: toEven(width),
    height: toEven(height),
    zoom: config.zoom,
  };
};

const landscapeConversion: ScreenConversionFn = (config) => {
  const width = config.width;
  const isPortrait = config.height > width;
  const height = !isPortrait ? config.height : width * ASPECT_RATIO;
  return {
    width: toEven(width),
    height: toEven(height),
    zoom: config.zoom,
  };
};

function ScreenProfile(screenType: ScreenType) {
  const screenDetail = calculateScreen();
  switch (screenType) {
    case 'LANDSCAPE':
      return landscapeConversion(screenDetail);
    case 'PORTRAIT':
    default:
      return portraitConversion(screenDetail);
  }
}

export default ScreenProfile;
