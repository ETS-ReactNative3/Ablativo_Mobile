import React, {useState} from 'react';
import * as eva from '@eva-design/eva';
import { SafeAreaView, } from 'react-native';
import {  Layout, Button, List, StyleService, Text, useStyleShee } from '@ui-kitten/components';
import {beaconSetup} from './chat';  

export const HomeScreen = ({ navigation }) => {

  React.useEffect(() => {
    beaconSetup();
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>Welcomea to Ablativo</Text>
      </Layout>
    </SafeAreaView>
  );
};