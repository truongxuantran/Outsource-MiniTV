import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {fromRight} from 'react-navigation-transitions';
import HomeScreen from '../Home';
import SignInScreen from '../Auth/SignIn';
import TermAndCondition from '../Auth/TermAndCondition';

//use with case don't need slidemenu
// export default StackNavigator({
//   Home: { screen: HomeScreen },
//   Detail: { screen: DetailScreen }
// }, {
//       headerMode: 'none'
//   });

const stackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-open',
      }),
    },
    SignIn: {
      screen: SignInScreen,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    TermAndCondition: {
      screen: TermAndCondition,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => fromRight(500),
    //edit transition config between screen
    // transitionConfig: (toScreen, fromScreen) => {
    //   if (toScreen != null) {
    //     const index = toScreen.navigation.state.index;
    //     const routes = toScreen.navigation.state.routes;
    //     if (index && routes && routes.length > index) {
    //       if (routes[index].routeName === 'Detail') {
    //         return fromLeft(500);
    //       }
    //     }
    //   }
    //   return fromRight(500);
    // },
  },
);

stackNavigator.navigationOptions = ({navigation}) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }
  return {
    drawerLockMode,
  };
};
// const MyDrawerNavigator = createDrawerNavigator(
//   {
//     stackNavigator,
//   },
//   {
//     navigationOptions: {
//       gesturesEnabled: true,
//       drawerLockMode: 'locked-open',
//     },
//     contentComponent: SideMenu,
//     drawerBackgroundColor: 'white',
//     drawerWidth: 300,
//   },
// );

const MyApp = createAppContainer(stackNavigator);
export default MyApp;
