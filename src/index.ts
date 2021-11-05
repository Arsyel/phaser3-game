import 'phaser';
import './css/index.css';

import { CONFIG } from './config';
import SceneList from './ts/scenes';
import ScreenProfile from './ts/helpers/ScreenProfile';

const renderType = () => {
  const isFirefox = /Firefox/i.test(window.navigator.userAgent);
  // Set to WEBGL in Firefox, using Canvas in Firefox somehow create performance / lagging issues
  return isFirefox ? Phaser.WEBGL : Phaser.AUTO;
};

const screenProfile = ScreenProfile();

const config = {
  type: renderType(),
  parent: 'game-wrapper',
  banner: CONFIG.DEVELOPMENT,
  scale: {
    mode: Phaser.Scale.NONE,
    width: screenProfile.width,
    height: screenProfile.height,
    zoom: screenProfile.zoom,
    autoRound: true,
  },
  backgroundColor: CONFIG.DEVELOPMENT ? '#3498db' : '#1e1e1e',
  input: { activePointers: 2 },
  dom: { createContainer: true },
  render: {
    antialias: true,
    pixelArt: false,
    roundPixels: false,
  },
  scene: SceneList(),
} as Phaser.Types.Core.GameConfig;

const game = new Phaser.Game(config);

const onResize = () => {
  const { width, height, zoom } = ScreenProfile();
  game.scale.resize(width, height);
  game.scale.setZoom(zoom);
};
window.addEventListener('resize', onResize);
