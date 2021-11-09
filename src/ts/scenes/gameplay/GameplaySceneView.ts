import { Image } from '../../modules/gameobject/Image';
import { PlayButtonUIView } from './ui/PlayButtonUIView';
import ScreenUtilityController from '../../modules/screenutility';
import { TitleUIView } from './ui/TitleUIView';
import { TopedButtonUIView } from './ui/TopedButtonUIView';
import { audioAsset } from '../../collections/AudioAsset';
import { gameplayAsset } from './../../collections/GameplayAsset';

export class GameplaySceneView {

  event: Phaser.Events.EventEmitter;
  evenName = {
    onCreateFinish: 'onCreateFinish',
    onTapToped: 'onTapToped',
  };

  private _image: Image;
  private _titleUIView: TitleUIView;
  private _topedButtonUIView: TopedButtonUIView;
  private _playHTMLButtonUIView: PlayButtonUIView;

  constructor (private _scene: Phaser.Scene, private _screenUtil: ScreenUtilityController) {
    this.event = new Phaser.Events.EventEmitter();
    this._titleUIView = new TitleUIView(_scene);
    this._topedButtonUIView = new TopedButtonUIView(_scene);
    this._playHTMLButtonUIView = new PlayButtonUIView(_scene);
  }

  create () {
    const { centerX, centerY, width, height } = this._screenUtil;
    this._image = new Image(this._scene, centerX, centerY, gameplayAsset.test_image.key);
    this._image.transform.setMaxPreferredDisplaySize(width, height);

    const backgroundRatio = this._image.transform.ratio;

    this._titleUIView.create({
      pos: { x: centerX, y: centerY * 0.5 },
      fontSize: 96 * backgroundRatio,
      text: 'Tokopedia Seru',
    });

    this._topedButtonUIView.create({
      pos: { x: centerX, y: centerY },
      baseRatio: backgroundRatio,
      onClick: () => this.event.emit(
        this.evenName.onTapToped, { audioKey: audioAsset.sfx_click.key }
      )
    });

    this._playHTMLButtonUIView.create({
      baseRatio: backgroundRatio,
      pos: { x: centerX, y: centerY * 1.25 },
      screenHeight: height,
      onClick: (e: PointerEvent) => {
        const nextCounter = this._topedButtonUIView.counter + 1;
        this._titleUIView.setText(nextCounter.toString());
        this._topedButtonUIView.setCounter(nextCounter)
      }
    });

    this.event.emit(this.evenName.onCreateFinish);
  }

}
