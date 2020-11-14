import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  Alert,
  DeviceEventEmitter,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid,
  View,
} from "react-native";

import { GiftedChat } from "react-native-gifted-chat";
import Kontakt, { KontaktModule } from "react-native-kontaktio";
import { ChatHeader } from "../../components/chatHeader";
import { CONST } from "../../../config";
import { createChat, sendMessage } from "../../repository/chatRepository";
import { Value } from "react-native-reanimated";
import { getMentorDetails } from "../../repository/appRepository";

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
  ownName,
  ownPic,
  artworkID,
  mentorName,
  userId,
  navigation,
}) => {
  const [chatDetails, setChatDetails] = useState("");
  const [messages, setMessages] = useState([]);
  const [storedReplies, setStoredReplies] = useState("");
  const [user, setUser] = useState({
    _id: userId,
    name: ownName,
    avatar: ownPic,
  });
  const [artworkUser, setArtworkUser] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [mentorUser, setMentorUser] = useState("");
  const [askedQuestion, setAskedQuestion] = useState([]);

  function askCounterHelper(value) {
    var temp = askedQuestion;
    temp[value]++;
    setAskedQuestion(temp);
  }

  async function handleMentorData(data) {
    var mentorUser = {
      _id: data._id,
      name: data.name,
      avatar: data.image,
      questions: data.questions,
    };

    setMentorUser(mentorUser);
  }

  async function retrieveChat() {
    await createChat(artworkID, setChatDetails);
    getMentorDetails(mentorName, handleMentorData);
  }

  useEffect(() => {
    retrieveChat();
  }, []);

  useEffect(() => {
    if (chatDetails) {
      var artworkUser = {
        _id: artworkID,
        name: chatDetails?.artworkName,
        avatar: chatDetails?.artworkAvatar,
      };
      var askedQuestionTemp = new Array(
        chatDetails?.artworkQuestions.Q.length
      ).fill(0);

      setAskedQuestion(askedQuestionTemp);
      setArtworkUser(artworkUser);
      appendQuickReplies();
    }
  }, [chatDetails]);

  function appendQuickReplies() {
    if (chatDetails) {
      var questions = chatDetails?.artworkQuestions.Q;
      var quickReplies = [];

      questions.map((item, index) =>
        quickReplies.push({ title: item, value: index })
      );

      var messagesAux = messages.length > 0 ? messages : chatDetails?.messages;
      var position =
        messages.length > 0
          ? messages.length - 1
          : chatDetails?.messages.length - 1;

      messagesAux[position > 0 ? position : 0].quickReplies = {
        type: "radio",
        values: quickReplies,
      };

      if (storedReplies == "")
        setStoredReplies({ type: "radio", values: quickReplies });

      setMessages(messagesAux);
    } else {
      console.log("Errore retrieving chatDetails");
    }
  }

  const onSend = useCallback((msg) => {
    var temp = messages;
    try {
      temp.push(msg[0]);
      setMessages(temp);
    } catch (error) {
      console.error("Error on send : " + error);
    } finally {
      sendMessage(msg[0], chatId);
    }
  }, []);

  const onQuickReply = (replies) => {
    const createdAt = new Date();
    if (replies.length === 1) {
      askCounterHelper(replies[0].value);
     

      let message;
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
        message =
          askedQuestion[replies[0].value] < 2
            ? {
                createdAt: createdAt,
                _id: Math.round(Math.random() * 1000000),
                text: chatDetails.artworkQuestions.A[replies[0].value],
                user: artworkUser,
                quickReplies: storedReplies,
              }
            : {
                createdAt: createdAt,
                _id: Math.round(Math.random() * 1000000),
                text:
                  mentorUser.questions.R[
                    Math.round(
                      Math.random() * (mentorUser.questions.R.length - 1)
                    )
                  ],
                user: mentorUser,
                quickReplies: storedReplies,
              };
        setIsTyping(false);
        onSend([message]);
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
        subtitle={mentorName}
        goBack={navigateBack}
      />

      <GiftedChat
        messageIdGenerator={() => Math.floor(Math.random() * 10000) + 1}
        messages={messages}
        onSend={(message) => onSend(message)}
        user={user}
        showAvatarForEveryMessage={true}
        onQuickReply={onQuickReply}
        alignTop={true}
        renderInputToolbar={() => <View style={{ height: 0 }} />}
        isTyping={isTyping}
        inverted={false}
      />
    </SafeAreaView>
  );
};
