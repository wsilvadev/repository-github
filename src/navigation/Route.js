import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from '../screens/Home';
import IssuesList from '../screens/IssuesList';

export default createAppContainer(
  createStackNavigator({
    Home: Home,
    IssuesList: IssuesList,
  }),
);
