import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Icon } from "@ui-kitten/components";
import { ChatHeader } from "../../components/chatHeader";
import { CONST, dateFormatter } from "../../../config";

const initialMessages = [
  {
    id: 1,
    username: "Costantino",
    message: "Lo sai che nella chiesa ortodossa ono considerato santo?",
    avatar: "https://picsum.photos/300",
    date: new Date(),
    isRead: false,
  },
  {
    id: 2,
    username: "GrandeCapo",
    message: "Questo è un art attack",
    avatar: "https://picsum.photos/200",
    date: new Date(),
    isRead: false,
  },
];

export const ChatList = ({ navigation }) => {
  
  const _renderChatList = (element) => {
    const item = element.item;
    const messagePreview = item.message;

    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Chat", {
              chat: item,
              ownName: "ownName",
              ownPic: "ownPic",
              otherName: item.username,
              otherPic: item.avatar,
            })
          }
          style={styles.chatItemContainer}
        >
          <Image source={{ uri: item.avatar }} style={styles.imageContainer} />
          <View style={styles.chatElementContainer}>
            <Text
              style={styles.textName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.username}
            </Text>
            <Text
              style={styles.textLastMessage}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {messagePreview}
            </Text>
            <Text
              style={styles.textTime}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {dateFormatter(item.date)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ChatHeader
        type={CONST.HEADER_TYPE.CHATLIST}
        name={"Museo dei gessi"}
        subtitle={"Sapienza"}

      />
      <FlatList
        data={initialMessages}
        renderItem={_renderChatList}
        keyExtractor={(item) => item.id + "_" + item.index}
        ItemSeparatorComponent={() => (
          <View style={styles.horizontalRow}></View>
        )}
        vertical
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  chatItemContainer: {
    flexDirection: "row",
  },
  textName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textLastMessage: {
    fontSize: 14,
  },
  textTime: {
    fontSize: 12,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    margin: 10,
    borderWidth: 0.4,
    borderColor: "black",
  },
  chatElementContainer: {
    flex: 0.9,
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  horizontalRow: {
    borderBottomWidth: 0.5,
    width: "95%",
    marginLeft: "2.5%",
  },
});
