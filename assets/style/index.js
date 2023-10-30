import { Dimensions } from "react-native";

const Fonts = {
    Barlow: {
        Bold: 'Barlow-Bold',
        Medium: 'Barlow-Medium',
        Regular: 'Barlow-Regular',
        SemiBold: 'Barlow-SemiBold',
    },
    BarlowCondensed: {
        Bold: 'BarlowCondensed-Bold',
        Medium: 'BarlowCondensed-Medium',
        Regular: 'BarlowCondensed-Regular',
        SemiBold: 'BarlowCondensed-SemiBold',
    },
    GildaDisplay: {
        Regular: 'GildaDisplay-Regular'
    }
};

const WIDTH = Dimensions.get("screen").width
const HEIGHT = Dimensions.get("screen").height

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size) => (WIDTH / guidelineBaseWidth) * size;
const verticalScale = (size) => (HEIGHT / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

const Shadow = {
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
}
export { Fonts, WIDTH, HEIGHT, horizontalScale, verticalScale, moderateScale, Shadow };