import ScreenUtilityController from '../../modules/screenutility';

export class LoadingSceneView {
  private _progressText: Phaser.GameObjects.Text;

  constructor(
    private _scene: Phaser.Scene,
    private _screenUtil: ScreenUtilityController
  ) {}

  create() {
    const { centerX, centerY } = this._screenUtil;
    this._progressText = this._scene.add.text(centerX, centerY, '0%', {
      fontFamily: 'sans-serif',
      color: '#fafafa',
      fontStyle: 'bold',
      align: 'center',
    });

    this._progressText
      .setOrigin(0.5, 0)
      .setFontSize(48 * this._screenUtil.screenPercentage);
  }

  updateProgressText(value: number) {
    const percent = Math.round(value * 100);
    this._progressText.setText(`${percent}%`);
  }
}
