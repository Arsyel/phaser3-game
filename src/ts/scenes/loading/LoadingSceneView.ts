export class LoadingSceneView {

  private _progressText: Phaser.GameObjects.Text;

  constructor (private _scene: Phaser.Scene) {}

  create () {
    this._progressText = this._scene.add.text(this._scene.scale.width / 2, this._scene.scale.height / 2, '0%', {
      color: '#fafafa',
      fontStyle: 'bold',
      align: 'center'
    });

    this._progressText
      .setOrigin(0.5, 0)
      .setFontSize(48 * (this._scene.scale.width / 1080));
  }

  updateProgressText (value: number) {
    const percent = Math.round(value * 100);
    this._progressText.setText(`${percent}%`);
  }

}
