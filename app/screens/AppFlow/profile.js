import React, { useState } from "react";
import {
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  FlatList,
  Text,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Icon } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { colors } from "react-native-elements";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const visits = [
  {
    id: 0,
    museum: "Museo dei gessi",
    location: "Sapienza",
    time: "35m",
    musicLink: "www.google.it",
    createdAt: Date.now(),
    image: "../../assets/images/uniroma1-universita-la-sapienza-di-roma.jpg",
    questions: [
      {
        id: 0,
        question: "Come sei arrivato in questo museo?",
        answer: "Ho navigato nei mari di tutto il mondo prima di giungere qui.",
        statue: "Zeus",
      },
      {
        id: 1,
        question: "Quanti anni hai?",
        answer: "Sono nato nel 192 d.C. sotto la mano di Petrus artista Romano",
        statue: "Minerva",
      },
    ],
  },
  /* {
    id: 1,
    museum: "Museo del Louvre",
    location: "Parigi",
    time: "2h 35m",
    musicLink: "www.google.it",
    createdAt: Date.now(),
    image: "../../assets/images/uniroma1-universita-la-sapienza-di-roma.jpg",
    questions: [
      {
        id: 0,
        question: "Quanti anni hai?",
        answer: "Sono nato nel 192 d.C. sotto la mano di Petrus artista Romano",
        statue: "Minerva",
      },
    ],
  }, */
];

export const ProfileScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [name, setName] = React.useState("");

  async function retrieveData() {
    try {
      var userName = await AsyncStorage.getItem("userName");
      if (userName) setName(userName);
      else console.log("Username unavailable");
    } catch (e) {
      // Restoring token failed
      console.log("Cannot retrieve username " + e);
    }
  }

  React.useEffect(() => {
    retrieveData();
  });

  const _renderVisitItem = (data) => {
    return (
      <View style={{ margin: 15 }}>
        <View style={styles.cardContainer}>
          <View style={styles.imageWrapper}>
            <Image
              style={{
                flex: 0.9,
                resizeMode: "center",
                borderRadius: 15,
                marginLeft: 10,
              }}
              source={require("../../assets/images/uniroma1-universita-la-sapienza-di-roma.jpg")}
            ></Image>
          </View>
          <View style={styles.cardCentralContent}>
            <View style={styles.cardTitleWrapper}>
              <Text>
                <Text style={styles.cardTitleText}>
                  {data.item.museum + " "}
                </Text>
              </Text>
            </View>
            <Text style={styles.cardDateText}>mer 12 ott</Text>

            <Text style={styles.cardTimeText}>
              Durata visita: {data.item.time}
            </Text>
          </View>
          <View style={styles.cardRightContent}>
            <View style={{ flex: 0.5, backgroundColor: "blue" }}>
              <Icon name="arrow-ios-downward-outline" />
            </View>
            <View style={{ flex: 0.5, backgroundColor: "green" }}>
              <Icon name="music-outline" />;
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          overflow: "hidden",
          flexDirection: "row",
          //borderBottomWidth: 0.3,
          borderColor: "#75151e",
        }}
      >
        <Image
          source={require("../../assets/images/Augusto.png")}
          style={styles.mentorImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.usernameText}>{name.toUpperCase()}</Text>
          <View style={styles.socialsContainer}>
            <View style={styles.profileSocial}>
              <Text category="s2">Questions</Text>
              <Text category="c2">20</Text>
            </View>
            <View style={styles.profileSocial}>
              <Text category="s2">Time</Text>
              <Text category="c2">60 m</Text>
            </View>
            <View style={styles.profileSocial}>
              <Text category="s2">Visits</Text>
              <Text category="c2">1</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: "white" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", margin: 15 }}>
          Visits
        </Text>

        <FlatList
          data={visits}
          renderItem={_renderVisitItem}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={3}
          scrollEnabled
          //onEndReachedThreshold={0.01}
          //onEndReached={this.getMoreDataThrottled}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  tabContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  profileSocial: {
    flex: 1,
  },
  socialsContainer: {
    flexDirection: "row",
    width: "75%",
    marginVertical: 8,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "white",
    elevation: 10,
    borderRadius: 10,
    height: 100,
    flexDirection: "row",
  },
  imageWrapper: {
    flex: 0.25,
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 5,
  },
  mentorImage: {
    width: 100,
    height: 100,
    borderRadius: 75,
    justifyContent: "center",
    alignSelf: "center",
    margin: 10,
  },
  profileInfo: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  usernameText: {
    color: "black",
    fontSize: 20,
    marginTop: 15,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
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
  cardCentralContent: { flex: 1, margin: 10, justifyContent: "center" },
  cardRightContent: {
    flex: 0.4,
    backgroundColor: "red",
    flexDirection: "column",
  },
});
