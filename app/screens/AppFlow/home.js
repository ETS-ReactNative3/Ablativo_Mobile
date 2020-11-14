import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { beaconSetup } from "./chat";
import { CONST } from "../../../config";
import { Icon } from "@ui-kitten/components";
import {
  getRoomByID,
  upvoteArtwork,
  upvoteRoom,
} from "../../repository/appRepository";
import { saveData } from "../../repository/utility";
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from "react-native-sensors";
import { map, filter } from "rxjs/operators";
import Toast from "react-native-rn-toast";
import { createVisit, endVisit } from "../../repository/appRepository";
import RNShakeEvent from "react-native-shake-event";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const roomID = "a936eb9d-6907-4bac-bdc6-c71eb2efff74";

export const HomeScreen = ({ navigation }) => {
  const [visitFlag, setVisitFlag] = useState(CONST.VISIT_FLAG.START);
  const [subscriptionAccelerometer, setSubscriptionAccelerometer] = useState(
    ""
  );
  const [subscriptionGyroscope, setSubscriptionGyroscope] = useState("");
  const [subscriptionHeartRate, setSubscriptionHeartRate] = useState("");

  const [roomName, setRoomName] = useState("");
  const [artworks, setArtworks] = useState("");
  const [storedTelemetries, setStoredTelemetries] = useState([]);

  const [roomUpvoted, setRoomUpvoted] = useState(-1);
  const [artworksUpvoted, setArtworksUpvoted] = useState([]);
  const [visitID, setVisitID] = useState("");

  const [visitState, setVisitState] = useState("Inizia visita");

  async function handleEndVisit(telemetries, subs_a, subs_g, subs_h) {
    console.log(telemetries);
    setStoredTelemetries(telemetries);
    setVisitFlag(CONST.VISIT_FLAG.START);
    setVisitState("Inizia visita");
    subs_a.unsubscribe();
    subs_g.unsubscribe();
    subs_h.clearInterval();
    setSubscriptionHeartRate("");
    setSubscriptionAccelerometer("");
    setSubscriptionGyroscope("");
    setVisitID("");
  }

  async function handleStartVisit(subs_a, subs_g, subs_h, visitID) {
    setVisitFlag(CONST.VISIT_FLAG.END);
    setVisitState("Concludi visita");
    setSubscriptionAccelerometer(subs_a);
    setSubscriptionGyroscope(subs_g);
    setSubscriptionHeartRate(subs_h);
    setVisitID(visitID);
  }

  async function startPollingTelemetries(type) {
    setUpdateIntervalForType(SensorTypes.accelerometer, 60000); // defaults to 100ms
    setUpdateIntervalForType(SensorTypes.gyroscope, 60000); // defaults to 100ms

    let subs_a;
    let subs_g;
    let subs_h = subscriptionHeartRate;
    let event_a;
    let event_g;
    let event_h;
    let tempTelemetries = storedTelemetries;

    subscriptionAccelerometer == ""
      ? (subs_a = accelerometer.subscribe(({ x, y, z, timestamp }) => {
          event_a = { sensor: "Accelerometer", x, y, z, timestamp };
          tempTelemetries.push(event_a);
        }))
      : (subs_a = subscriptionAccelerometer);

    subscriptionGyroscope == ""
      ? (subs_g = gyroscope.subscribe(({ x, y, z, timestamp }) => {
          event_g = { sensor: "Gyroscope", x, y, z, timestamp };
          tempTelemetries.push(event_g);
        }))
      : (subs_g = subscriptionGyroscope);

    if (subscriptionHeartRate == "") {
      subs_h = setInterval(() => {
        event_h = {
          sensor: "Heartrate",
          timestamp: Date.now(),
          value: Math.floor(Math.random() * 130) + 50,
        };
        tempTelemetries.push(event_h);
        console.log(event_h);
      }, 60000);
    }

    if (type == CONST.VISIT_FLAG.END) {
      console.log("Stop polling");

      setVisitState("Elaborando la musica...");
      setVisitFlag(CONST.VISIT_FLAG.LOADING);
      endVisit(
        visitID,
        tempTelemetries,
        subs_a,
        subs_g,
        subs_h,
        handleEndVisit
      );
    } else {
      console.log("Start polling");

      //in this phase we currently supports only Museo dei Gessi at Sapienza
      createVisit(
        "Museo dei Gessi",
        "Sapienza",
        "",
        subs_a,
        subs_g,
        subs_h,
        handleStartVisit
      );
    }
  }

  const handleRoom = (payload) => {
    var data = payload[0];
    setRoomName(data.roomName);
    setArtworks(data.artworks);

    var upvotes = new Array(data.artworks.length).fill(0);
    setArtworksUpvoted(upvotes);
  };

  React.useEffect(() => {
    beaconSetup();
    saveData("roomID", roomID); // retreived from beacon
    getRoomByID(roomID, handleRoom);

    RNShakeEvent.addEventListener("shake", () => {
      upvoteRoom(roomID, -roomUpvoted, setRoomUpvoted);
    });
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
              onPress={() => {
                upvoteArtwork();
                likeRef.current.startAnimation();
              }}
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
        <TouchableOpacity
          style={
            visitFlag == CONST.VISIT_FLAG.LOADING
              ? {
                  width: screenWidth * 0.55,
                  height: 35,
                  elevation: 10,
                  backgroundColor: "white",
                  borderWidth: 2,
                  borderColor: "gray",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignContent: "center",
                  alignSelf: "center",
                  margin: 10,
                }
              : {
                  width: screenWidth * 0.55,
                  height: 35,
                  elevation: 10,
                  backgroundColor: "white",
                  borderWidth: 2,
                  borderColor: "#50A0D5",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignContent: "center",
                  alignSelf: "center", 
                  margin: 10,
                }
          }
          onPress={() =>visitFlag != CONST.VISIT_FLAG.LOADING
            ? startPollingTelemetries(visitFlag) : Toast.show("Attendi qualche secondo", Toast.SHORT)} 
        >
          <Text
            style={
              visitFlag == CONST.VISIT_FLAG.LOADING
                ? {
                    justifyContent: "center",
                    alignContent: "center",
                    alignSelf: "center",
                    fontWeight: "bold",
                    color: "gray",
                  }
                : {
                    justifyContent: "center",
                    alignContent: "center",
                    alignSelf: "center",
                    fontWeight: "bold",
                    color: "#50A0D5",
                  }
            }
          >
            {visitState}
          </Text>
        </TouchableOpacity>
        <Text style={styles.descriptionText}>Staute</Text>
        <FlatList
          data={artworks}
          renderItem={_renderStatue}
          keyExtractor={(item, index) => item.name + "_" + index}
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
