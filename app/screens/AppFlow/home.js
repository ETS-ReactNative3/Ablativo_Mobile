import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { beaconSetup } from "./chat";
import { CONST } from "../../../config";
import { Icon } from "@ui-kitten/components";
import { getRoomByID } from "../../repository/appRepository";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const roomID = "fcf8bbd9-57a7-4871-aa4a-5a56008b7efc";
const statue = [
  {
    name: "Zeus",
    artista: "Artista anonimo",
    image: "https://picsum.photos/710",
    description: "Marmo, 134 a.C, replica",
  },
  {
    name: "Minerva",
    artista: "Artista anonimo",
    image: "https://picsum.photos/750",
    description: "Marmo, 324 a.C, replica",
  },
  {
    name: "Plutarco",
    artista: "Artista anonimo",
    image: "https://picsum.photos/720",
    description: "Bronzo, 654 a.C, replica",
  },
  {
    name: "Marte",
    artista: "Artista anonimo",
    image: "https://picsum.photos/730",
    description: "Marmo, 134 a.C, replica",
  },
];

export const HomeScreen = ({ navigation }) => {
  const [roomName, setRoomName] = useState("");
  const [artworks, setArtworks] = useState("");

  const handleRoom = (data) => {
    setRoomName(data.roomName);
    setArtworks(data.artworks)
  };

  React.useEffect(() => {
    beaconSetup();
    getRoomByID(roomID, handleRoom);
  }, []);
  const likeRef = React.createRef();

  const _renderStatue = (element) => {
    var item = element.item;
    return (
      <View style={styles.cardContainer}>
        <View style={{ height: 80, flexDirection: "row" }}>
          <View style={styles.cardLeftContent}>
            <Image
              style={{
                width: 60,
                height: 60,
                resizeMode: "center",
                borderRadius: 999,
                marginLeft: 10,
              }}
              source={{ uri: item.image }}
            />
          </View>
          <View style={styles.cardCentralContent}>
            <View style={styles.cardTitleWrapper}>
              <Text>
                <Text style={styles.cardTitleText}>{item.name} </Text>
              </Text>
            </View>
            <Text style={styles.cardDateText}>Artista anonimo</Text>

            <Text style={styles.cardTimeText}>{item.description}</Text>
          </View>
          <View style={styles.cardRightContent}>
            <TouchableWithoutFeedback
              onPress={() => likeRef.current.startAnimation()}
            >
              <Icon
                width={30}
                height={30}
                fill={["color-primary-default"]}
                name="heart-outline"
                animation="pulse"
                ref={likeRef}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => likeRef.current.startAnimation()}
            >
              <Icon
                width={30}
                height={30}
                fill={["color-primary-default"]}
                name="close-outline"
                animation="pulse"
                ref={likeRef}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={[styles.centerStyle, { marginTop: 30 }]}>
        <View style={{ marginBottom: 30 }}>
          <Text style={[styles.infoText, styles.centerStyle]}>
            Sei entrato nella stanza
          </Text>
          <Text style={[styles.roomText, styles.centerStyle]}> {roomName}</Text>
          <Text style={[styles.extraText, styles.centerStyle]}>
            Ti sta piacendo? Lascia un like tramite shake!
          </Text>
        </View>

        <View style={{ width: screenWidth, height: 150, elevation: 10 }}>
          <Image
            source={CONST.ROOM_PLACEHOLDER}
            style={styles.placeHolderStyle}
          />
        </View>
      </View>
      <View style={{ flex: 1, margin: 10 }}>
        <Text style={styles.descriptionText}>Staute</Text>
        <FlatList
          data={artworks}
          renderItem={_renderStatue}
          keyExtractor={(item) => item.name + "_" + item.index}
          vertical={true}
          scrollEnabled={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  placeHolderStyle: {
    width: screenWidth,
    height: 150,
    resizeMode: "cover",
    borderColor: "black",
  },
  centerStyle: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: 20,
    color: "gray",
  },
  roomText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  extraText: {
    fontSize: 20,
    color: "gray",
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  cardContainer: {
    flex: 1,
    elevation: 5,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "white",
  },
  cardTitleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitleText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
  },
  cardDateText: {
    color: "black",
    justifyContent: "center",
    fontSize: 12,
  },
  cardTimeText: {
    color: "gray",
    fontSize: 12,
  },
  cardLink: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
  },
  cardLeftContent: {
    flex: 0.25,
    borderRadius: 80 / 2,
    alignContent: "center",
    alignItems: "center",
    padding: 5,
  },
  cardCentralContent: {
    flex: 0.6,
    margin: 10,
  },
  cardRightContent: {
    flex: 0.15,
    marginHorizontal: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
