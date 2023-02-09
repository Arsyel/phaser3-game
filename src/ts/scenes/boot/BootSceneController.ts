import AudioController from '../../modules/audio';
import { SceneInfo } from '..';
import ScreenUtilityController from '../../modules/screenutility';

export class BootSceneController extends Phaser.Scene {
  constructor() {
    super({ key: SceneInfo.BOOT.key });
  }

  init() {
    ScreenUtilityController.getInstance().init(this.scale);

    Promise.all([AudioController.getInstance().init(this)])
      .then(() => {
        this.scene.launch(SceneInfo.LOADING.key);
      })
      .catch((error) => Error('Bootscene::\n' + error));
  }
}
