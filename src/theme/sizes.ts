import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export const normalize = (size: number): number => {
	const newSize = size * scale;
	if (Platform.OS === 'ios') {
		return Math.round(PixelRatio.roundToNearestPixel(newSize));
	}
	return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

export const fontSizes = {
	mini: normalize(14),
	small: normalize(17),
	medium: normalize(19),
	large: normalize(22),
	xlarge: normalize(26),
	xxlarge: normalize(62)

};

export type FontSizes = typeof fontSizes;
