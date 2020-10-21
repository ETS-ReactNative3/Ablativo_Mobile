import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  Alert,
  DeviceEventEmitter,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid,
} from "react-native";

import { GiftedChat } from "react-native-gifted-chat";
import Kontakt, { KontaktModule } from "react-native-kontaktio";
import { ChatHeader } from "../../components/chatHeader";
import { CONST } from "../../../config";
import { createChat } from "../../repository/chatRepository";

const { connect, init, startDiscovery, startScanning } = Kontakt;
const kontaktEmitter = new NativeEventEmitter(KontaktModule);

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

/* messages: [
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
              title: "Ea",
              value: 1,
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
    ], */
export const ChatScreen = ({
  chatId,
  username,
  mentor,
  ownName,
  ownPic,
  artworkID,
  navigation,
}) => {
  const [chatDetails, setChatDetails] = useState("");
  const [messages, setMessages] = useState([]);
  const [quickReplies, setQuickReplies] = useState("");
  const [user, setUser] = useState({});
  const [artworkUser, setArtworkUser] = useState({});
  const [isTyping, setIsTyping] = useState(false);

  async function retrieveChat() {
    console.log(artworkID);
    await createChat(artworkID, setChatDetails);
  }

  useEffect(() => {
    retrieveChat();
  }, []);

  useEffect(() => {
    if (chatDetails) {
      appendQuickReplies();
      var user = {
        _id: chatDetails._id.split("_")[0],
        name: ownName,
        avatar: ownPic,
      };
      var artworkUser = {
        _id: artworkID,
        name: chatDetails.artworkName,
        avatar: chatDetails.artworkAvatar,
      };

      setUser(user);
      setArtworkUser(artworkUser);
    }
  }, [chatDetails]);

  function appendQuickReplies() {
    var questions = chatDetails.artworkQuestions.Q;
    var quickReplies = [];

    questions.map((item, index) =>
      quickReplies.push({ title: item, value: index })
    );

    var messagesAux = chatDetails.messages;
    messagesAux[chatDetails.messages.length - 1].quickReplies = {
      type: "radio",
      values: quickReplies,
    };
    console.log(JSON.stringify(messagesAux));
    setMessages(messagesAux);
  }

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const onQuickReply = (replies) => {
    const createdAt = new Date();
    if (replies.length === 1) {
      console.log(replies[0]);
      onSend([
        {
          createdAt: createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies[0].title,
          user: user,
        },
      ]);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        onSend([
          {
            createdAt: createdAt,
            _id: Math.round(Math.random() * 1000000),
            text: chatDetails.artworkQuestions.A[replies[0].value],
            user: artworkUser,
           
          },
        ]);
      }, 4000);
    } else {
      console.log("replies param is not set correctly");
    }
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ChatHeader
        type={CONST.HEADER_TYPE.CHAT}
        name={username}
        subtitle={mentor}
        goBack={navigateBack}
      />

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={user}
        showAvatarForEveryMessage={true}
        onQuickReply={onQuickReply}
        alignTop={true}
        renderInputToolbar={() => null}
        isTyping={isTyping}
      />
    </SafeAreaView>
  );
};
