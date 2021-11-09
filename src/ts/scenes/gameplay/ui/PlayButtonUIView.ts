import CustomTypes from '../../../../types/custom';
import { gameplayAsset } from './../../../collections/GameplayAsset';

type Props = {
  pos: Required<Phaser.Types.Math.Vector2Like>;
  baseRatio: number;
  onClick: CustomTypes.General.Noop;
  screenHeight: number;
};

export class PlayButtonUIView {

  private _container: Phaser.GameObjects.Container;

  constructor (private _scene: Phaser.Scene) {}

  create (props: Props) {
    const { pos, screenHeight, baseRatio, onClick } = props;
    const playButton = this._scene.add.dom(pos.x, 0)
      .createFromCache(gameplayAsset.play_button_html.key);
    playButton.setScale(2 * baseRatio); // Responsiveness on DOM

    this._scene.tweens.add({
      targets: playButton,
      props: {
        y: {
          getStart: () => screenHeight, getEnd: () => pos.y
        },
      },
      ease: Phaser.Math.Easing.Back.Out,
      duration: 350,
    });

    playButton.addListener('click').on('click', onClick);
  }

}