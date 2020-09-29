import React from "react";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "../screens/AppFlow/home";
import { ProfileScreen } from "../screens/AppFlow/profile";
import { ChatScreen } from "../screens/AppFlow/chat";
import { ChatList } from "../screens/AppFlow/chatList";
/* import { Login } from './screens/login';
import { SignIn } from './screens/signin'; */

const { Navigator, Screen } = createBottomTabNavigator();

const PersonIcon = (props) => <Icon {...props} name="person-outline" />;

const ChatIcon = (props) => <Icon {...props} name="message-circle-outline" />;

const HomeIcon = (props) => <Icon {...props} name="home-outline" />;

function BottomTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <BottomNavigation
      initialRouteName="PROFILE"
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab title="CHAT" icon={ChatIcon} />
      <BottomNavigationTab title="HOME" icon={HomeIcon} />
      <BottomNavigationTab title="PROFILE" icon={PersonIcon} />
    </BottomNavigation>
  );
}

//    tabBar={(props) => <BottomTabBar {...props} />}

const TabNavigator = () => (
  <Navigator
    initialRouteName="Home"
    tabBar={(props) => <BottomTabBar {...props} />}
  >
    <Screen name="ChatList" component={ChatList} />
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Profile" component={ProfileScreen} />
    <Screen
      name="Chat"
      component={ChatScreen}
      options={{ tabBarVisible: false }}
    />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);
