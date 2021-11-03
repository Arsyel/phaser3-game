import ScreenUtilityController from '../screenutility';

type GameObject = (
		Phaser.GameObjects.GameObject
		& Phaser.GameObjects.Components.ComputedSize
		& Phaser.GameObjects.Components.Origin
		& Phaser.GameObjects.Components.Transform
	) | Phaser.GameObjects.Rectangle;

class Transform {

	private _gameObject: GameObject;

	constructor (gameObject: GameObject) {
		this._gameObject = gameObject;
	}

	get ratio () {
		return this._gameObject.displayWidth / this._gameObject.width;
	}

	get widthAspectRatio () {
		return this._gameObject.width / this._gameObject.height;
	}

	get heightAspectRatio () {
		return this._gameObject.height / this._gameObject.width;
	}

	getDisplayPositionFromCoordinate (x = 0, y = x) {
		return new Phaser.Math.Vector2(
			this._gameObject.x + ((x - this._gameObject.originX) * this._gameObject.displayWidth),
			this._gameObject.y + ((y - this._gameObject.originY) * this._gameObject.displayHeight)
		);
	}

	setDisplaySize (width: number, height: number) {
		this._gameObject.displayWidth = width;
		this._gameObject.displayHeight = height;
	}

	setToScaleDisplaySize (percent: number) {
		this.setDisplaySize(percent * this._gameObject.width, percent * this._gameObject.height);
	}

	setToScreenPercentage (percentage = 1) {
		const value = (ScreenUtilityController.getInstance().screenPercentage) * percentage;
		this.setToScaleDisplaySize(value);
	}

	setDisplayHeightToAspectRatio () {
		this._gameObject.displayHeight = Math.ceil(this._gameObject.displayWidth * this.heightAspectRatio);
	}

	setDisplayWidthToAspectRatio () {
		this._gameObject.displayWidth = Math.ceil(this._gameObject.displayHeight * this.widthAspectRatio);
	}

	setDisplayHeight (height: number, matchWidthToAspectRatio = true) {
		this._gameObject.displayHeight = height;
		if (matchWidthToAspectRatio) {
			this.setDisplayWidthToAspectRatio();
		}
	}

	setDisplayWidth (width: number, matchHeightToAspectRatio = true) {
		this._gameObject.displayWidth = width;
		if (matchHeightToAspectRatio) {
			this.setDisplayHeightToAspectRatio();
		}
	}

	setMaxPreferredDisplaySize (maxWidth: number, maxHeight: number) {
		if (maxWidth * this.heightAspectRatio > maxHeight) {
			this.setDisplayHeight(maxHeight);
			return;
		}
		this.setDisplayWidth(maxWidth);
	}

	setMinPreferredDisplaySize (minWidth: number, minHeight: number) {
		if (minWidth * this.heightAspectRatio < minHeight) {
			this.setDisplayHeight(minHeight);
			return;
		}
		this.setDisplayWidth(minWidth);
	}

}

export default Transform;
