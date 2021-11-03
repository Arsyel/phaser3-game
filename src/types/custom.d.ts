import { AssetType } from '../ts/enum/AssetType';

export declare namespace CustomTypes {

	namespace General {

		type KeyValuePair<K, V> = {
			key: K,
			value: V
		}

	}

	namespace Asset {

		type BaseAssetInfoType = {
			key: string,
			type: AssetType
		}

		type AssetInfoType = BaseAssetInfoType & {
			url: string | string[],
			width?: number,
			height?: number,
			config?: object
		}

		type AnimationInfoType = BaseAssetInfoType & {
			spritesheetRef: string,
			start: number,
			end: number,
			frameSpeed: number,
			loop?: true
		}

		interface ObjectAsset {
			[key: string]: AssetInfoType
		}

		interface AnimationAsset {
			[key: string]: AnimationInfoType
		}

	}

	namespace Gameplay {

		type GeneralData = {
			screenRatio: number;
			initialPos?: { x: number, y: number }
			data?: any;
		}

	}

}