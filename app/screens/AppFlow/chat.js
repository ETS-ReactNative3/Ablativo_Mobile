import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Alert,
  DeviceEventEmitter,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid,
} from "react-native";
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  MenuItem,
  OverflowMenu,
} from "@ui-kitten/components";
import { GiftedChat } from "react-native-gifted-chat";
import Kontakt, { KontaktModule } from "react-native-kontaktio";
import { ChatHeader } from "../../components/chatHeader";
import { CONST } from "../../../config";

const { connect, init, startDiscovery, startScanning } = Kontakt;
const kontaktEmitter = new NativeEventEmitter(KontaktModule);

const user = {
  _id: 1,
  name: "Developer",
};

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: "Location Permission",
        message:
          "This example app needs to access your location in order to use bluetooth beacons.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
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
const isAndroid = Platform.OS === "android";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;

const InfoIcon = (props) => <Icon {...props} name="info" />;

const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

export const beaconSetup = async () => {
  if (isAndroid) {
    // Android
    const granted = await requestLocationPermission();
    if (granted) {
      await connect();
      await startScanning();
    } else {
      Alert.alert(
        "Permission error",
        "Location permission not granted. Cannot scan for beacons",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  } else {
    // iOS
    await init();
    await startDiscovery();
  }

  // Add beacon listener
  if (isAndroid) {
    console.log("Listening for beacon");

    DeviceEventEmitter.addListener(
      "beaconsDidUpdate",
      ({ beacons, region }) => {
        console.log("beaconsDidUpdate", beacons, region);
      }
    );
  } else {
    kontaktEmitter.addListener("didDiscoverDevices", ({ beacons }) => {
      console.log("didDiscoverDevices", beacons);
    });
  }
};

export const ChatScreen = ({ route, navigation }) => {
  console.log(route);
  const chat = route.params.chat;
  const chatId = chat.chatId;
  const username = route.params.otherName;
  const otherPic = otherPic;
  const mentor = "augusto";

  console.log(chatId + ":" + username);

  const [menuVisible, setMenuVisible] = useState(false);
  const [state, setState] = useState({
    messages: [
      {
        _id: 2,
        text: `Hey, qual è il tuo colore preferito?`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Statue",
          avatar:
            "https://ladiscaricadelloziotom.files.wordpress.com/2017/09/img_0263.jpg?w=614",
        },
        quickReplies: {
          type: "radio", // or 'checkbox'
          values: [
            {
              title: "Red",
              value: "Red",
            },
            {
              title: "Yellow",
              value: "Yellow",
            },
            {
              title: "Blue",
              value: "Blue",
            },
          ],
        },
      },
      {
        _id: 1,
        text: `Benvenuto nel museo dell'Arte Classica\nFai un giro, le statue prenderanno vita!`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "FAQ Bot",
          avatar:
            "https://www.italiaincammino.it/wp-content/uploads/2018/02/minerva-sapienza-1024x768.jpg",
        },
      },
    ],
  });

  React.useEffect(() => {
    //beaconSetup();
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
        onBackdropPress={toggleMenu}
      >
        <MenuItem accessoryLeft={InfoIcon} title="About" />
        <MenuItem accessoryLeft={LogoutIcon} title="Delete and leave group" />
      </OverflowMenu>
    </React.Fragment>
  );

  function onSend(messages = []) {
    setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    console.log(messages[0].user._id);

    if (messages[0].user._id == 1) {
      console.log(messages[0].user._id);
      botSend(messages[0].text);
    }
  }

  const botSend = (name) => {
    console.log(name);
    if (name == "Red" || name == "Yellow" || name == "Blue") {
      onSend([
        {
          _id: 1,
          text:
            "Bene! il tuo colore preferito è " +
            name +
            "!\n\nIndovina qual è il mio",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "FAQ Bot",
            avatar:
              "https://ladiscaricadelloziotom.files.wordpress.com/2017/09/img_0263.jpg?w=614",
          },
          quickReplies: {
            type: "radio", // or 'checkbox'
            values: [
              {
                title: "Gold",
                value: "Gold",
              },
              {
                title: "Green",
                value: "Green",
              },
              {
                title: "Silver",
                value: "Silver",
              },
            ],
          },
        },
      ]);
    } else if (name == "Silver" || name == "Green" || name == "Gold") {
      onSend([
        {
          _id: 1,
          text: "Ottimo, era proprio " + name + "! ",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "FAQ Bot",
            avatar:
              "https://ladiscaricadelloziotom.files.wordpress.com/2017/09/img_0263.jpg?w=614",
          },
        },
      ]);
    }
  };

  const onQuickReply = (replies) => {
    const createdAt = new Date();
    if (replies.length === 1) {
      console.log(replies);
      onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies[0].title,
          user,
        },
      ]);
    } else if (replies.length > 1) {
      onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies.map((reply) => reply.title).join(", "),
          user,
        },
      ]);
    } else {
      console.warn("replies param is not set correctly");
    }
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ChatHeader
        type={CONST.HEADER_TYPE.CHAT}
        name={username}
        subtitle={mentor}
        goBack={navigateBack}
      />

      <GiftedChat
        messages={state.messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        showAvatarForEveryMessage={true}
        onQuickReply={onQuickReply}
        alignTop={true}
        renderInputToolbar={() => null}
      />
    </SafeAreaView>
  );
};
