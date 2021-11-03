import { BootSceneController } from './boot/BootSceneController';
import { GameplaySceneController } from './gameplay/GameplaySceneController';
import { LoadingSceneController } from './loading/LoadingSceneController';

export const SceneInfo = {
	BOOT: {
		key: 'BootScene',
		scene: BootSceneController
	},
	LOADING: {
		key: 'LoadingScene',
		scene: LoadingSceneController
	},
	GAMEPLAY: {
		key: 'GameplayScene',
		scene: GameplaySceneController
	},
};

function SceneList() {
	return Object.values(SceneInfo).map((info) => info.scene);
}

export default SceneList;
