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
import { getChatList } from "../../repository/chatRepository";
import { retrieveData } from "../../repository/utility";

export const ChatList = ({ navigation }) => {
  const [chatList, setChatList] = useState("");
  const [roomID, setRoomID] = useState("");
  const [ownName, setOwnName] = useState("");
  const [mentorName, setMentorName] = useState("");
  const [mentor, setMentor] = useState("");

  async function retreiveRoomID() {
    var id = await retrieveData("roomID");
    id != undefined || id != ""
      ? setRoomID(id)
      : console.log("No roomID to fetch");
  }

  async function retreiveUserInfo() {
    var userName = await retrieveData("userName");
    var mentorName = await retrieveData("userMentor");



    setOwnName(userName);
    setMentorName(mentorName);

  }

  React.useEffect(() => {
    retreiveRoomID();
    retreiveUserInfo();
  }, []);

 

  React.useEffect(() => {
    if (roomID != "") {
      console.log(roomID);
      getChatList(roomID, setChatList);
    } else {
      console.log("No roomID stored");
    }
  }, [roomID]);

  const _renderChatList = (element) => {
    const item = element.item;
    const messagePreview = item.message;

    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Chat", {
              chat: item,
              ownPic: "ownPic",
              ownName: ownName,
              mentorName: mentorName,
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
        data={chatList}
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
