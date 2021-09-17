import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import HomeFeedScreen from "../screens/HomeFeedScreen";
import CreateNewPostScreen from "../screens/CreateNewPostScreen";
import PostDetailScreen from "../screens/PostDetailScreen";
import MapScreen from "../screens/MapScreen";
import AuthScreen from "../screens/AuthScreen";
import SplashScreen from "../screens/SplashScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditUserPostScreen from "../screens/EditUserPostScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfilePostDetailScreen from "../screens/ProfilePostDetailScreen";

const MainStackNav = createStackNavigator({
  HomeFeed: HomeFeedScreen,
  CreateNewPost: CreateNewPostScreen,
  PostDetail: PostDetailScreen,
  Map: MapScreen,
  Profile: ProfileScreen,
  EditUserPost: EditUserPostScreen,
  Settings: SettingsScreen,
  ProfilePostDetail: ProfilePostDetailScreen,
});

const AuthStackNav = createStackNavigator({
  Auth: AuthScreen,
});

const MainNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  Auth: AuthStackNav,
  Home: MainStackNav,
});

export default createAppContainer(MainNavigator);
