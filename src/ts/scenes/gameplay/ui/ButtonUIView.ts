import CustomTypes from '../../../../types/custom';
import { gameplayAsset } from '../../../collections/GameplayAsset';

type Props = {
  pos: Required<Phaser.Types.Math.Vector2Like>;
  text: string;
  baseRatio: number;
  onClick: CustomTypes.General.EventOp<PointerEvent>;
  screenHeight: number;
};

export class PlayButtonUIView {

  constructor (private _scene: Phaser.Scene) {}

  create (props: Props) {
    const { pos, screenHeight, baseRatio, onClick, text } = props;
    const buttonElement = this._scene.add.dom(pos.x, 0)
      .createFromCache(gameplayAsset.button_html.key)
      .setScale(2 * baseRatio);

    buttonElement.getChildByID('btn').innerHTML = text;
    buttonElement.updateSize();

    this._scene.tweens.add({
      targets: buttonElement,
      props: {
        y: {
          getStart: () => screenHeight, getEnd: () => pos.y
        },
      },
      ease: Phaser.Math.Easing.Back.Out,
      duration: 350,
    });

    buttonElement.addListener('click').on('click', onClick);
  }

}