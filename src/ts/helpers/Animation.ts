import CustomTypes from '../../types/custom';

export function AddAnimation(
  scene: Phaser.Scene,
  animationObject: CustomTypes.Asset.AnimationInfoType
) {
  const frames = scene.anims.generateFrameNumbers(
    animationObject.spritesheetRef,
    {
      start: animationObject.start,
      end: animationObject.end,
    }
  );
  return scene.anims.create({
    key: animationObject.key,
    frames: frames,
    frameRate: animationObject.frameSpeed,
    repeat: animationObject.loop ? -1 : 0,
  });
}

export function AddAnimationList(
  scene: Phaser.Scene,
  animationObjects: CustomTypes.Asset.AnimationAsset
) {
  for (const animKey in animationObjects) {
    const animationObject = animationObjects[animKey];
    AddAnimation(scene, animationObject);
  }
}
