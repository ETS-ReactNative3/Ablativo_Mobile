import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";

import { CONST } from "../../../config";
import { ChatScreen } from "./chat";

export const ChatWrapper = ({ route, navigation }) => {
  const chat = route.params.chat;
  const chatId = chat.chatID;
  const username = chat.username;
  const otherPic = otherPic;
  const mentor = route.params.mentor;
  const ownName = route.params.ownName;
  const ownPic =
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
  const artworkID = chat.artworkID;

  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ChatScreen
        chat={chat}
        chatId={chatId}
        username={username}
        otherPic={otherPic}
        mentor={mentor}
        ownName={ownName}
        ownPic={ownPic}
        artworkID={artworkID}
        navigation={navigation}
      ></ChatScreen>
    </SafeAreaView>
  );
};
