import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Page1 from '../screens/Page1';
import Page2 from '../screens/Page2';

export default createAppContainer(
  createStackNavigator({
    App: {
      screen: Page1,
    },
    ScreenNative: {
      screen: Page2,
    },
  }),
);
