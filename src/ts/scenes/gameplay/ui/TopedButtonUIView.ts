import CustomTypes from '../../../../types/custom';
import { Image } from './../../../modules/gameobject/Image';
import { gameplayAsset } from './../../../collections/GameplayAsset';

type Props = {
  pos: Required<Phaser.Types.Math.Vector2Like>;
  baseRatio: number;
  onClick: CustomTypes.General.Noop;
};

const enum Data {
  COUNTER = 'COUNTER',
}

export class TopedButtonUIView {

  private _toped: Image;

  constructor (private _scene: Phaser.Scene) {}

  get counter () {
    return this._toped.gameObject.getData(Data.COUNTER) as number;
  }

  create (props: Props) {
    const { pos, baseRatio, onClick } = props;
    this._toped = new Image(this._scene, pos.x, pos.y, gameplayAsset.logo.key);
    this._toped.transform.setToScaleDisplaySize(baseRatio * 0.25);

    const initialScale = this._toped.gameObject.scale;
    const tweenTapEffect = this._scene.tweens.create({
      targets: this._toped.gameObject,
      props: {
        scale: { getStart: () => initialScale, getEnd: () => initialScale * 0.95 },
      },
      yoyo: true,
      duration: 50,
    });

    this._toped.gameObject.setInteractive({ useHandCursor: true })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        tweenTapEffect.once(Phaser.Tweens.Events.TWEEN_COMPLETE, onClick);
        tweenTapEffect.play();
      })
      .setData(Data.COUNTER, 0);
  }

  setCounter (value: number) {
    this._toped.gameObject.setData(Data.COUNTER, value);
  }

}