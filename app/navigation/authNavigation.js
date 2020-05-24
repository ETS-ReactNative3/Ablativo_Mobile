import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


import { LoginScreen } from '../screens/AuthFlow/login';
import { SigninScreen } from '../screens/AuthFlow/signin';

const { Navigator, Screen } = createStackNavigator();

const AuthNavigation = () => (
  <Navigator headerMode='none'>
    <Screen name='Login' component={LoginScreen}/>
    <Screen name='SignIn' component={SigninScreen}/>
  </Navigator>
);

export const AuthNavigator = () => (
  <NavigationContainer>
    <AuthNavigation/>
  </NavigationContainer>
);
