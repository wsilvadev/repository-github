import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import App from '../screens/homeScreen';
import ScreenRocketNative from '../screens/rocketNative';

export default createAppContainer(
  createStackNavigator({
    App: {
      screen: App,
    },
    ScreenNative: {
      screen: ScreenRocketNative,
    },
  }),
);
