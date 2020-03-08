import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const screenWidth = width;
const screenHeight = height;
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

const horizontalScale = size => (screenWidth / guidelineBaseWidth) * size;

const verticalScale = size => (screenHeight / guidelineBaseHeight) * size;

const moderateScale = (size, factor = 0.51) =>
  size + (horizontalScale(size) - size) * factor;

export {
  horizontalScale,
  verticalScale,
  moderateScale,
  screenWidth,
  screenHeight,
};
