type CalculateScreenType = {
	width: number;
	height: number;
	zoom: number;
};

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
    zoom: 1 / dprModifier
  };
};

const portraitConversion = (config: CalculateScreenType) => {
  const height = config.height;
  const isLandscape = config.width > height;
  const width = !isLandscape ? config.width : height * ASPECT_RATIO;
  return {
    width: toEven(width),
    height: toEven(height),
    zoom: config.zoom
  } as CalculateScreenType;
};

function ScreenProfile () {
	return portraitConversion(calculateScreen());
}

export default ScreenProfile;
