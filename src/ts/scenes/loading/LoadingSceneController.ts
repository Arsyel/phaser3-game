import { LoadAssets } from '../../helpers/Loader';
import { LoadingSceneView } from './LoadingSceneView';
import { SceneInfo } from '..';
import { audioAsset } from '../../collections/AudioAsset';
import { gameplayAsset } from './../../collections/GameplayAsset';

export class LoadingSceneController extends Phaser.Scene {

	view: LoadingSceneView;

	constructor () {
		super({ key: SceneInfo.LOADING.key });
		this.onCompleteLoadBoot = this.onCompleteLoadBoot.bind(this);
		this.onCompleteLoad = this.onCompleteLoad.bind(this);
	}

	init (): void {
		this.view = new LoadingSceneView(this);
	}

	preload (): void {
		this.load.once('complete', this.onCompleteLoadBoot);
		this.loadBootResources();
		this.load.start(); // Execute: onCompleteLoadBoot
	}

	loadBootResources (): void {
		// LoaderHelper.LoadAssets(this, LoadingAsset as CustomTypes.Asset.ObjectAsset);
	}

	onCompleteLoadBoot (): void {
		this.view.create();
		this.load.on('progress', (value: number) => this.view.updateProgressText(value));

		this.load.once('complete', this.onCompleteLoad);
		this.loadGameResources();
		this.load.start(); // Execute: onCompleteLoad
	}

	loadGameResources (): void {
		// LOAD ALL GAME FILE HERE!
		// LoaderHelper.LoadAssets(this, GameplayAsset as CustomTypes.Asset.ObjectAsset);
		LoadAssets(this, audioAsset);
		LoadAssets(this, gameplayAsset);
	}

	onCompleteLoad (): void {
		this.load.removeAllListeners();
		this.scene.start(SceneInfo.GAMEPLAY.key);
	}

}
