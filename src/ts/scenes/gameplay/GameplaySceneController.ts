import AudioController from '../../modules/audio';
import { GameplaySceneView } from './GameplaySceneView';
import { SceneInfo } from '..';

type OnTapToped = (props: { audioKey: string }) => void;

export class GameplaySceneController extends Phaser.Scene {

	view: GameplaySceneView;
	audioController: AudioController;

	constructor () {
		super({ key: SceneInfo.GAMEPLAY.key })
	}

	init () {
		this.view = new GameplaySceneView(this);
		this.audioController = AudioController.getInstance();

		this.onTapToped((props) => {
			this.audioController.playSFX(props.audioKey);
		});

		this.onCreateFinish(() => {});
	}

	create () {
		this.view.create();
	}

	onCreateFinish (event: Function) {
		this.view.event.once(this.view.evenName.onCreateFinish, event);
	}

	onTapToped (event: OnTapToped) {
		this.view.event.on(this.view.evenName.onTapToped, event);
	}

}
