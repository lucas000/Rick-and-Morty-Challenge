import {Platform} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const metrics = {
  smallMargin: wp('3%'),
  baseMargin: wp('3%'),
  doubleBaseMargin: wp('15%'),
  screenWidth: wp < hp ? wp : hp,
  screenHeight: wp < hp ? hp : wp,
  statusBarHeight: Platform.OS === 'ios' ? 20 : 0,
  baseRadius: wp('1%'),
};

export default metrics;
