import { AssetType } from '../enum/AssetType';
import { CustomTypes } from '../../types/custom';

export function LoadAssets (scene: Phaser.Scene, assets: CustomTypes.Asset.ObjectAsset) {
  let assetInfo: CustomTypes.Asset.AssetInfoType;
  for (const key in assets) {
    assetInfo = assets[key];
    if (assetInfo.type === AssetType.STATIC) {
      scene.load.image(assetInfo.key, assetInfo.url);
    }
    else if (assetInfo.type === AssetType.SPRITESHEET) {
      scene.load.spritesheet(assetInfo.key, assetInfo.url as string, {
        frameWidth: assetInfo.width as number,
        frameHeight: assetInfo.height
      });
    }
    else if (assetInfo.type === AssetType.AUDIO) {
      if (Array.isArray(assetInfo.url)) {
        const audioPath = assetInfo.url.map((path: string) => path);
        scene.load.audio(assetInfo.key, audioPath);
        continue;
      }
      scene.load.audio(assetInfo.key, assetInfo.url);
    }
    else if (assetInfo.type === AssetType.JSON) {
      scene.load.json(assetInfo.key, assetInfo.url);
    }
    else if (assetInfo.type === AssetType.HTML) {
      scene.load.html(assetInfo.key, assetInfo.url as string);
    }
    else {
      console.warn('Asset type is undefined:', assetInfo);
    }
  }
}