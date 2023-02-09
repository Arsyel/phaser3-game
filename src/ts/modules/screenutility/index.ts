class ScreenUtilityController {
  private static _instance: ScreenUtilityController;

  private _scaleManager: Phaser.Scale.ScaleManager;
  private _defaultWidth = 1080;
  private _defaultHeight = 1920;
  private _activeRatio: number;

  private constructor() {}

  static getInstance() {
    if (!ScreenUtilityController._instance) {
      ScreenUtilityController._instance = new ScreenUtilityController();
    }
    return ScreenUtilityController._instance;
  }

  get width() {
    return this._scaleManager.width;
  }

  get height() {
    return this._scaleManager.height;
  }

  get centerX() {
    return this._scaleManager.width * 0.5;
  }

  get centerY() {
    return this._scaleManager.height * 0.5;
  }

  get screenPercentage() {
    return this._scaleManager.width / this._defaultWidth;
  }

  get defaultScreenSize() {
    return {
      width: this._defaultWidth,
      height: this._defaultHeight,
    };
  }

  set activeRatio(value: number) {
    this._activeRatio = value <= 0 ? 0 : value;
  }

  get activeRatio() {
    return this._activeRatio ? this._activeRatio : 0;
  }

  init(scene: Phaser.Scale.ScaleManager) {
    this._scaleManager = scene;
  }
}

export default ScreenUtilityController;
