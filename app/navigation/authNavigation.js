import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


import { LoginScreen } from '../screens/AuthFlow/login';
import { SignUpScreen } from '../screens/AuthFlow/signup';

const { Navigator, Screen } = createStackNavigator();

const AuthNavigation = () => (
  <Navigator headerMode='none'>
    <Screen name='Login' component={LoginScreen}/>
    <Screen name='SignUp' component={SignUpScreen}/>
  </Navigator>
);

export const AuthNavigator = () => (
  <NavigationContainer>
    <AuthNavigation/>
  </NavigationContainer>
);
