import React, { useState } from "react";
import {
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  FlatList,
  Text,
  ImageBackground,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Icon } from "@ui-kitten/components";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { colors } from "react-native-elements";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { getMyInfo, getMyVisits } from "../../repository/appRepository";
import { CONST } from "../../../config";
import SoundPlayer from "react-native-sound-player";
import Toast from 'react-native-rn-toast';

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

export const ProfileScreen = ({ props }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [name, setName] = React.useState("");
  const [showQuestionAndAnswer, setShowQuestionAndAnswer] = useState(false);
  const [animationValue, setAnimationValue] = useState(new Animated.Value(90));
  const [viewState, setViewState] = useState(true);
  const [counter, setCounter] = useState({});
  const [visits, setVisits] = useState([]);

  const animatedStyle = {
    height: animationValue,
  };

  const msgRef = React.createRef();
  const musicRef = React.createRef();

  const toggleAnimation = () => {
    if (viewState) {
      setShowQuestionAndAnswer(true);
      Animated.timing(animationValue, {
        toValue: 300,
        timing: 1400,
        useNativeDriver: false,
      }).start(() => {
        setViewState(false);
      });
    } else {
      setShowQuestionAndAnswer(false);
      Animated.timing(animationValue, {
        toValue: 100,
        timing: 1400,
        useNativeDriver: false,
      }).start(() => {
        setViewState(true);
      });
    }
  };

  async function retrieveData(data) {
    try {
      var profile = data[0];
      setCounter(profile.counter);
      setName(profile.username);
    } catch (e) {
      // Restoring data failed
      console.log("Cannot retrieve profile Info " + e);
    }
  }

  function handleVisits(data) {
    try {
      var visits = data;
      if (visits != []) setVisits(visits);
    } catch (e) {
      // Restoring token failed
      console.log("Cannot retrieve visits Info " + e);
    }
  }

  React.useEffect(() => {
    getMyInfo(retrieveData);
    getMyVisits(handleVisits);
  }, []);

  const _renderQuestions = (data) => {
    console.log(data);
    return (
      <View style={{ margin: 10 }}>
        <View style={styles.questionLeftItem}>
          <View
            style={{
              margin: 5,
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 30 / 2,
                resizeMode: "cover",
                borderRadius: 15,
                marginLeft: 10,
              }}
              source={CONST.MENTOR_AUGUSTO}
            />
          </View>

          <Text
            style={{
              flex: 0.9,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              alignSelf: "center",
            }}
          >
            <Text style={styles.questionStatueName}>Tu: </Text>
            <Text style={styles.questionText}>{data.item.question}</Text>
          </Text>
        </View>
        <View style={styles.questionLeftItem}>
          <View
            style={{
              margin: 5,
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 30 / 2,
                resizeMode: "cover",
                borderRadius: 15,
                marginLeft: 10,
              }}
              source={{ uri: data.item.statue.image }}
            />
          </View>

          <Text style={{ flex: 0.9 }}>
            <Text style={styles.questionStatueName}>
              {data.item.statue.name + ": "}
            </Text>
            <Text style={styles.questionText}>{data.item.answer}</Text>
          </Text>
        </View>
      </View>
    );
  };

  const _renderVisitItem = (data) => {
    return (
      <View style={{ margin: 15 }}>
        <Animated.View style={[styles.cardContainer, animatedStyle]}>
          <View style={{ height: 90, flexDirection: "row" }}>
            <View style={styles.cardLeftContent}>
              <Image
                style={{
                  width: 80,
                  height: 80,
                  resizeMode: "center",
                  borderRadius: 15,
                  marginLeft: 10,
                }}
                source={require("../../assets/images/uniroma1-universita-la-sapienza-di-roma.jpg")}
              />
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
                Durata visita: {data.item.time}m
              </Text>
            </View>
            <View style={styles.cardRightContent}>
              <TouchableWithoutFeedback
                onPress={() => {
                  musicRef.current.startAnimation();
                  try {
                    SoundPlayer.playUrl(
                      CONST.MUSIC_STORAGE_LINK + data.item.musicLink
                    );  
                  } catch (error) {
                    Toast.show("Server error", Toast.SHORT);
                    console.log(error);

                  }
                  
                }}
              >
                <Icon
                  width={30}
                  height={30}
                  fill={["color-primary-default"]}
                  name="music-outline"
                  animation="pulse"
                  ref={musicRef}
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  toggleAnimation();
                  msgRef.current.startAnimation();
                }}
              >
                <Icon
                  width={30}
                  height={30}
                  fill={["color-primary-default"]}
                  name="message-square-outline"
                  animation="pulse"
                  ref={msgRef}
                />
              </TouchableWithoutFeedback>

              {/*   <View style={{ flex: 0.5, backgroundColor: "green" }}>
              <Icon name="music-outline" />;
            </View> */}
            </View>
          </View>
          {showQuestionAndAnswer ? (
            <ScrollView>
              <FlatList
                data={data.item.questions}
                renderItem={_renderQuestions}
                keyExtractor={(item) => item._id}
                vertical={true}
                ItemSeparatorComponent={() => (
                  <View style={styles.horizontalRow}></View>
                )}
              ></FlatList>
            </ScrollView>
          ) : null}
        </Animated.View>
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
        <Image source={CONST.MENTOR_AUGUSTO} style={styles.mentorImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.usernameText}>{name.toUpperCase()}</Text>
          <View style={styles.socialsContainer}>
            <View style={styles.profileSocial}>
              <Text category="s2">Domande</Text>
              <Text category="c2">{counter.question}</Text>
            </View>
            <View style={styles.profileSocial}>
              <Text category="s2">Visite</Text>
              <Text category="c2">{counter.visit}</Text>
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
          keyExtractor={(item) => item._id}
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
    elevation: 10,
    borderRadius: 10,

    backgroundColor: "white",
  },
  iconCentered: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
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
  cardLeftContent: {
    flex: 0.25,
    borderRadius: 10,
    alignContent: "center",
    alignItems: "center",
    padding: 5,
  },
  cardCentralContent: {
    flex: 1,
    margin: 10,
  },
  cardRightContent: {
    height: 80,
    width: 30,
    marginHorizontal: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  questionLeftItem: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  questionStatueName: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
  },
  questionText: {
    color: "black",
    fontSize: 15,
    alignItems: "center",
  },
  questionCenterItem: {},
  horizontalRow: {
    borderBottomWidth: 0.5,
    width: "80%",
    marginLeft: "10%",
  },
});
