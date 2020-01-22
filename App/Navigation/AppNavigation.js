import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import AuthScreen from '../Modules/Auth/AuthScreen';
import Feed from '../Modules/Post/Feed';
import CreatePostScreen from '../Modules/Post/CreatePostScreen';
import EditPostScreen from '../Modules/Post/EditPostScreen';
import UserScreen from '../Modules/User/UserScreen';
import EditUserScreen from '../Modules/User/EditUserScreen';
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
    Feed: {screen: Feed},
    CreatePostScreen: {screen: CreatePostScreen},
    EditPostScreen: {screen: EditPostScreen},
    UserProfileScreen: {screen: UserScreen},
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'Feed',
  },
);

const UserStack = createStackNavigator(
  {
    UserScreen: {screen: UserScreen},
    EditUserScreen: {screen: EditUserScreen},
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
