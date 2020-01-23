import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

const metrics = {
  smallMargin: 5,
  baseMargin: 10,
  doubleBaseMargin: 20,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  statusBarHeight: Platform.OS === 'ios' ? 20 : 0,
  baseRadius: 3,
};

export default metrics;
