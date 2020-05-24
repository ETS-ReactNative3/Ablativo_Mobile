import React from 'react';
import { BottomNavigation, BottomNavigationTab, Icon  } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';;

import { HomeScreen } from '../screens/AppFlow/home';
import { ProfileScreen } from '../screens/AppFlow/profile';
import { ChatScreen } from '../screens/AppFlow/chat';
/* import { Login } from './screens/login';
import { SignIn } from './screens/signin'; */

const { Navigator, Screen } = createBottomTabNavigator();

const PersonIcon = (props) => (
    <Icon {...props} name='person-outline' />
);

const ChatIcon = (props) => (
    <Icon {...props} name='message-circle-outline' />
);

const HomeIcon = (props) => (
    <Icon {...props} name='home-outline' />
);

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='CHAT' icon={ChatIcon}/>
        <BottomNavigationTab title='HOME' icon={HomeIcon}/>
        <BottomNavigationTab title='PROFILE' icon={PersonIcon} />
    </BottomNavigation>
);

const TabNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name='Chat' component={ChatScreen} />
        <Screen name='Home' component={HomeScreen} />
        <Screen name='Profile' component={ProfileScreen} />
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <TabNavigator />
    </NavigationContainer>
);