import Transform from '../transform';

export class Sprite {
  private _gameObject: Phaser.GameObjects.Sprite;
  private _transform: Transform;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame = 0
  ) {
    this._gameObject = scene.add.sprite(x, y, texture, frame);
    this._transform = new Transform(this._gameObject);
  }

  get gameObject() {
    return this._gameObject;
  }

  get transform() {
    return this._transform;
  }
}
