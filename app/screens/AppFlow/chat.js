import React, { useState } from 'react';
import {
  SafeAreaView, StyleSheet, View, Image, Alert,
  DeviceEventEmitter,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, MenuItem, OverflowMenu, } from '@ui-kitten/components';
import { GiftedChat } from 'react-native-gifted-chat';
import Kontakt, { KontaktModule } from 'react-native-kontaktio';


const { connect, init, startDiscovery, startScanning } = Kontakt;
const kontaktEmitter = new NativeEventEmitter(KontaktModule);

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'This example app needs to access your location in order to use bluetooth beacons.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      // permission denied
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};
const isAndroid = Platform.OS === 'android';



const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical' />
);

const InfoIcon = (props) => (
  <Icon {...props} name='info' />
);

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out' />
);
export default function ChatScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [state, setState] = useState({
    messages: [
      {
        _id: 1,
        text: `Bella fratellì\n\nOggi te nsegno a guidà fratelli`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'FAQ Bot',
          avatar: 'https://i.imgur.com/7k12EPD.png'
        }
      },
      {
        _id: 2,
        text: `Bella fratellì\n\nOggi te nsegno a guidà fratelli`,
        createdAt: new Date(),
        user: {
          _id: 3,
          name: 'Fratelli',
          avatar: 'https://picsum.photos/id/1/1920'
        }
      },
    ]
  });

  const beaconSetup = async () => {
    if (isAndroid) {
      // Android
      console.log("Ye i'm called")

      const granted = await requestLocationPermission();
      if (granted) {
        await connect();
        await startScanning();
      } else {
        Alert.alert(
          'Permission error',
          'Location permission not granted. Cannot scan for beacons',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false },
        );
      }
    } else {
      // iOS
      await init();
      await startDiscovery();
    }

    // Add beacon listener
    if (isAndroid) {
      console.log("Listening")

      DeviceEventEmitter.addListener('beaconsDidUpdate', ({ beacons, region }) => {
        console.log('beaconsDidUpdate', beacons, region);
      });
    } else {
      kontaktEmitter.addListener('didDiscoverDevices', ({ beacons }) => {
        console.log('didDiscoverDevices', beacons);
      });
    }
  };
  React.useEffect(() => {
    beaconSetup();
  });

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderRightActions = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} title='About' />
        <MenuItem accessoryLeft={LogoutIcon} title='Delete and leave group' />
      </OverflowMenu>
    </React.Fragment>
  );

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  function onSend(messages = []) {
    setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }


  const navigateBack = () => {
    navigation.goBack();
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ minHeight: 40, }} level='1'>
        <TopNavigation
          alignment='center'
          title='Chat Name'
          subtitle='Mentor'
/*           accessoryLeft={renderBackAction}
 */          accessoryRight={renderRightActions}
        />
      </Layout>
      <GiftedChat
        messages={state.messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
        }}
        showAvatarForEveryMessage={true}
      />
    </SafeAreaView>
  );
};