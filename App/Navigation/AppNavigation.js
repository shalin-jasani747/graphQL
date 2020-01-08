import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AuthScreen from '../Modules/Auth/AuthScreen';
import PostListingScreen from '../Modules/Post/PostListingScreen';
import CreatePostScreen from '../Modules/Post/CreatePostScreen';
import LaunchScreen from '../Modules/LaunchScreen';

const AuthStack = createStackNavigator(
  {
    AuthScreen: {screen: AuthScreen},
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'AuthScreen',
  },
);

const MainStack = createStackNavigator(
  {
    PostListingScreen: {screen: PostListingScreen},
    CreatePostScreen: {screen: CreatePostScreen},
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'PostListingScreen',
  },
);

// Manifest of possible screens
const MainNavigator = createSwitchNavigator(
  {
    LaunchScreen: LaunchScreen,
    AuthStack: AuthStack,
    MainStack: MainStack,
  },
  {
    headerMode: 'none',
    initialRouteName: 'LaunchScreen',
  },
);

export default createAppContainer(MainNavigator);
