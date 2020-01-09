import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import AuthScreen from '../Modules/Auth/AuthScreen';
import PostListingScreen from '../Modules/Post/PostListingScreen';
import CreatePostScreen from '../Modules/Post/CreatePostScreen';
import EditPostScreen from '../Modules/Post/EditPostScreen';
import UserScreen from '../Modules/User/UserScreen';
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

const PostStack = createStackNavigator(
  {
    PostListingScreen: {screen: PostListingScreen},
    CreatePostScreen: {screen: CreatePostScreen},
    EditPostScreen: {screen: EditPostScreen},
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'PostListingScreen',
  },
);

const UserStack = createStackNavigator(
  {
    UserScreen: {screen: UserScreen},
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'UserScreen',
  },
);

const TabStack = createBottomTabNavigator(
  {
    Post: PostStack,
    User: UserStack,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Post',
  },
);

// Manifest of possible screens
const MainNavigator = createSwitchNavigator(
  {
    LaunchScreen: LaunchScreen,
    AuthStack: AuthStack,
    MainStack: TabStack,
  },
  {
    headerMode: 'none',
    initialRouteName: 'LaunchScreen',
  },
);

export default createAppContainer(MainNavigator);
