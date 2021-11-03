class ScreenUtilityController {

	private static instance: ScreenUtilityController;

	private _scaleManager: Phaser.Scale.ScaleManager;
	private _defaultWidth: number = 1080;
	private _defaultHeight: number = 1920;

	private constructor () {}

	static getInstance () {
		if (!ScreenUtilityController.instance) {
			ScreenUtilityController.instance = new ScreenUtilityController();
		}
		return ScreenUtilityController.instance;
	}

	get width () {
		return this._scaleManager.width;
	}

	get height () {
		return this._scaleManager.height;
	}

	get centerX () {
		return this._scaleManager.width * 0.5;
	}

	get centerY () {
		return this._scaleManager.height * 0.5;
	}

	get screenPercentage () {
		return this._scaleManager.width / this._defaultWidth;
	}

	get defaultScreenSize () {
		return {
			width: this._defaultWidth,
			height: this._defaultHeight
		};
	}

	init (scene: Phaser.Scale.ScaleManager) {
		this._scaleManager = scene;
	}

}

export default ScreenUtilityController;