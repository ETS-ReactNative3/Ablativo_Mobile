import React from 'react';
import * as eva from '@eva-design/eva';
import { SafeAreaView } from 'react-native';
import { ApplicationProvider, Button, Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';


export const HomeScreen = ({ navigation }) => {

  const navigateChat = () => {
    navigation.navigate('Chat');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>HOME</Text>
      </Layout>
    </SafeAreaView>
  );
};