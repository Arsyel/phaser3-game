class AudioController {
  private static _instance: AudioController;

  private _scene: Phaser.Scene;
  private _bgm: Phaser.Sound.BaseSound;
  private _bgmKey: string;
  private _enableAudio: boolean;
  private _sfxCache: Map<string, Phaser.Sound.BaseSound>;
  private _isInitialize: boolean;

  private constructor() {}

  static getInstance() {
    if (!AudioController._instance) {
      AudioController._instance = new AudioController();
    }
    return AudioController._instance;
  }

  init(scene: Phaser.Scene) {
    return new Promise<void>((resolve, reject) => {
      if (this._isInitialize)
        reject(Error('AudioControllor has been initialized!'));
      this._scene = scene;
      this._sfxCache = new Map<string, Phaser.Sound.BaseSound>();
      this._enableAudio = true;
      this._isInitialize = true;

      this._scene.sound.pauseOnBlur = true;
      this.registerVisibilityChangeEvent();
      resolve();
    });
  }

  private registerVisibilityChangeEvent() {
    const gameEvent = this._scene.game.events;
    gameEvent.on('hidden', () => {
      this.pauseBGM();
    });
    gameEvent.on('visible', () => {
      if (this._enableAudio) this.unmute();
    });
  }

  playBGM(
    key: string,
    restart = true,
    config?: Phaser.Types.Sound.SoundConfig
  ) {
    if (!restart && this._bgm?.isPlaying) return;
    this.stopBGM();

    if (!this._enableAudio) return;

    const bgmConfig = config ?? { loop: true };
    if (this._bgmKey === key) {
      this._bgm.play(bgmConfig);
    } else {
      this._bgmKey = key;
      this._bgm = this._scene.sound.add(key, bgmConfig);
      this._bgm.play();
    }
  }

  stopBGM() {
    if (this._bgm?.isPlaying) this._bgm.stop();
  }

  pauseBGM() {
    if (this._bgm?.isPlaying) this._bgm.pause();
  }

  resumeBGM() {
    if (this._bgm?.isPaused) this._bgm.resume();
  }

  setBGMVolume(volume: number) {
    if (this._bgm instanceof Phaser.Sound.WebAudioSound)
      this._bgm.setVolume(volume);
  }

  playSFX(key: string, config?: Phaser.Types.Sound.SoundConfig, force = true) {
    if (!this._enableAudio) return;
    if (!this._sfxCache.has(key)) {
      const sfx = this._scene.sound.add(key, config);
      sfx.play();
      this._sfxCache.set(key, sfx);
    } else {
      if (!force && this._sfxCache.get(key)?.isPlaying) return;
      this._sfxCache.get(key)?.play(config);
    }
  }

  unmute() {
    this._enableAudio = true;
    this.resumeBGM();
  }

  mute() {
    this._enableAudio = false;
    this.pauseBGM();
  }

  isMuted() {
    return this._enableAudio;
  }

  clearSFXCache() {
    for (const [, sfx] of this._sfxCache) {
      sfx.destroy();
    }
    this._sfxCache.clear();
  }
}

export default AudioController;
