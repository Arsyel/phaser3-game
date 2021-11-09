type Props = {
  pos: Required<Phaser.Types.Math.Vector2Like>;
  text: string;
  fontSize: number;
};

export class TitleUIView {

  private _container: Phaser.GameObjects.Container;

  constructor (private _scene: Phaser.Scene) {}

  create (props: Props) {
    const { pos, text, fontSize } = props;
    const titleText = this._scene.add.text(0, 0, text, {
      fontFamily: 'sans-serif',
      align: 'center',
      padding: { top: 8 }
    });

    titleText
      .setName('title')
      .setFontSize(fontSize)
      .setOrigin(0.5, 0);

    this._container = this._scene.add.container(pos.x, pos.y, titleText);
    this._container.setDepth(100);
  }

  setText (value: string) {
    (this._container.getByName('title') as Phaser.GameObjects.Text).setText(value);
  }

}