import Transform from '../transform';

export class Rectangle {
  private _gameObject: Phaser.GameObjects.Rectangle;
  private _transform: Transform;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    color?: number,
    alpha = 1
  ) {
    this._gameObject = scene.add.rectangle(x, y, width, height, color, alpha);
    this._transform = new Transform(this._gameObject);
  }

  get gameObject() {
    return this._gameObject;
  }

  get transform() {
    return this._transform;
  }
}
