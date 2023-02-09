import Transform from '../transform';

export class Image {
  private _gameObject: Phaser.GameObjects.Image;
  private _transform: Transform;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame = 0
  ) {
    this._gameObject = scene.add.image(x, y, texture, frame);
    this._transform = new Transform(this._gameObject);
  }

  get gameObject() {
    return this._gameObject;
  }

  get transform() {
    return this._transform;
  }
}
