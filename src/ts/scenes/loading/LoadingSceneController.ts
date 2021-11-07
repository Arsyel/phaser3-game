import LoadAssets from '../../helpers/Loader';
import { LoadingSceneView } from './LoadingSceneView';
import { SceneInfo } from '..';
import ScreenUtilityController from '../../modules/screenutility';
import { audioAsset } from '../../collections/AudioAsset';
import { gameplayAsset } from './../../collections/GameplayAsset';

export class LoadingSceneController extends Phaser.Scene {

  view: LoadingSceneView;

  constructor () {
    super({ key: SceneInfo.LOADING.key });
    this.onCompleteLoadBoot = this.onCompleteLoadBoot.bind(this);
    this.onCompleteLoad = this.onCompleteLoad.bind(this);
  }

  init () {
    this.view = new LoadingSceneView(this, ScreenUtilityController.getInstance());
  }

  preload () {
    this.load.once('complete', this.onCompleteLoadBoot);
    this.loadBootResources();
    this.load.start(); // Execute: onCompleteLoadBoot
  }

  private loadBootResources () {
    // LOAD LOADING FILE HERE!
  }

  private loadGameResources () {
    // LOAD ALL GAME FILE HERE!
    LoadAssets(this, audioAsset);
    LoadAssets(this, gameplayAsset);
  }

  onCompleteLoadBoot () {
    this.view.create();
    this.load.on('progress', (value: number) => this.view.updateProgressText(value));

    this.load.once('complete', this.onCompleteLoad);
    this.loadGameResources();
    this.load.start(); // Execute: onCompleteLoad
  }

  onCompleteLoad () {
    this.load.removeAllListeners();
    this.scene.start(SceneInfo.GAMEPLAY.key);
  }

}
