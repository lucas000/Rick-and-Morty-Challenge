import Main from './pages/Main';
import CharacterDetails from './pages/CharacterDetails';

import './config/StatusBarConfig';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {colors} from './styles/index';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: ({navigation}) => ({
          title: 'Rick & Morty',
        }),
      },
      CharacterDetails: {
        screen: CharacterDetails,
        navigationOptions: ({navigation}) => ({
          title: navigation.state.params.character.name,
        }),
      },
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: colors.primary,
          elevation: 0,
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: colors.text,
        },
      },
    },
  ),
);

export default Routes;
