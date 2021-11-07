import { Image } from '../../modules/gameobject/Image';
import ScreenUtilityController from '../../modules/screenutility';
import { audioAsset } from '../../collections/AudioAsset';
import { gameplayAsset } from './../../collections/GameplayAsset';

export class GameplaySceneView {

  event: Phaser.Events.EventEmitter;
  evenName = {
    onCreateFinish: 'onCreateFinish',
    onTapToped: 'onTapToped',
  };

  private _image: Image;

  constructor (private _scene: Phaser.Scene, private _screenUtil: ScreenUtilityController) {
    this.event = new Phaser.Events.EventEmitter();
  }

  create () {
    const { centerX, centerY, width, height } = this._screenUtil;
    this._image = new Image(this._scene, centerX, centerY, gameplayAsset.test_image.key);
    this._image.transform.setMaxPreferredDisplaySize(width, height);

    const backgroundRatio = this._image.transform.ratio;

    const titleText = this._scene.add.text(centerX, centerY * 0.5, 'Tokopedia Seru', {
      fontFamily: 'sans-serif',
      fontSize: `${82 * backgroundRatio}px`,
      align: 'center',
      padding: { top: 8 }
    });
    titleText.setOrigin(0.5, 0);

    const toped = new Image(this._scene, centerX, centerY, gameplayAsset.logo.key);
    toped.transform.setToScaleDisplaySize(backgroundRatio * 0.25);

    const initialScale = toped.gameObject.scale;
    const tweenTapEffect = this._scene.tweens.create({
      targets: toped.gameObject,
      props: {
        scale: { getStart: () => initialScale, getEnd: () => initialScale * 0.95 },
      },
      yoyo: true,
      duration: 50,
    });

    toped.gameObject.setInteractive({ useHandCursor: true })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        tweenTapEffect.once(Phaser.Tweens.Events.TWEEN_COMPLETE, () => this.event.emit(
          this.evenName.onTapToped, { audioKey: audioAsset.sfx_click.key })
        );
        tweenTapEffect.play();

        const nextCounter = (toped.gameObject.getData('counter') as number) + 1;
        titleText.setText(nextCounter.toString());
        toped.gameObject.setData('counter', nextCounter);
      })
      .setData('counter', 0);

    this.event.emit(this.evenName.onCreateFinish);
  }

}
