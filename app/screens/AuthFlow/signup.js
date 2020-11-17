import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Easing,
} from "react-native";

import {
  Divider,
  Icon,
  Layout,
  Text,
  Input,
  Button,
} from "@ui-kitten/components";
import { AuthContext } from "../../App";
import Carousel, { Pagination } from "react-native-snap-carousel";

const MENTOR_AUGUSTO = "https://picsum.photos/1000";
const MENTOR_CESARE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Gaius_Iulius_Caesar_%28Vatican_Museum%29.jpg/800px-Gaius_Iulius_Caesar_%28Vatican_Museum%29.jpg";
const MENTOR_NERONE = "https://picsum.photos/100";

const screenWidth = Math.round(Dimensions.get("screen").width);
const screenHeight = Math.round(Dimensions.get("screen").height);

export const SignUpScreen = (props) => {
  const { navigation, route } = props;
  const [username, setUsername] = React.useState(route.params.username);
  const [password, setPassword] = React.useState(route.params.password);
  const { signUp } = React.useContext(AuthContext);

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [selectedType, setSelectedType] = React.useState("");

  const [data, setData] = useState([
    {
      name: "Augusto",
      quote: "“Acta est fabula”",
      image: MENTOR_AUGUSTO,
      desc:
        "Augusto volle trasmettere l'immagine di sé come principe pacifico e quella di Roma come trionfatrice universale attraverso un uso accorto delle immagini, l'abbellimento della città di Roma, la tutela degli intellettuali che celebravano il principato, la riqualificazione del senato e dell'ordine degli equites.",
    },
    {
      name: "Cesare",
      quote: "“Veni vidi vici”",
      image: MENTOR_CESARE,
      desc:
        "Cesare fin da giovanissimo si fece notare subito non solo per la sua abilità militare, ma anche per la sua notevole abilità oratoria e per la capacità di conquistarsi il favore della gente con una grande disponibilità e un'ostenta generosità. ",
    },
    {
      name: "Nerone",
      quote: "“Qualis artifex pereo”",
      image: MENTOR_NERONE,
      desc:
        "Nerone fu un personaggio pieno di contraddizioni: un pazzo ha incendiato la città, racconta la leggenda, ma anche un uomo amante dell'arte e della bellezza. Un despota megalomane e crudele ma, allo stesso tempo, amato dal popolo per la riforma tributaria e monetaria che diedero vantaggi ai più poveri.",
    },
  ]);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const navigateBack = () => {
    navigation.goBack();
  };

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <View style={{ flex: 0.75 }}>
          <Text style={styles.mentorName}>{item.name}</Text>
          <Text style={styles.mentorQuote}>{item.quote}</Text>
          <View style={styles.imageWrapper}>
            <TouchableOpacity
              onPress={() => {
                _carousel.snapToPrev();
              }}
            >
              <Icon
                width={40}
                height={40}
                margin={10}
                fill="#4a4a4c"
                name="arrow-left-outline"
                style={{
                  alignSelf: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                width: 200,
                height: 200,
                alignSelf: "center",
                borderRadius: 200,
                backgroundColor: "red",
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 200,
                  height: 200,
                  alignSelf: "center",
                  resizeMode: "cover",
                  borderRadius: 200,
                }}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                _carousel.snapToNext();
              }}
            >
              <Icon
                width={40}
                height={40}
                margin={10}
                fill="#4a4a4c"
                name="arrow-right-outline"
                style={{
                  alignSelf: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.mentorDescription}>{item.desc}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            var mentor = item.name.toUpperCase();
            signUp({ username, password, mentor });
          }}
        >
          <View style={styles.nextButton}>
            <Text style={[styles.selectButtonText]}>Seleziona</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <Text style={styles.usernamePlaceHolder}>Scegli un mentore</Text>
      <Carousel
        ref={(c) => {
          _carousel = c;
        }}
        data={data}
        renderItem={_renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    height: screenHeight,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  circle: {
    elevation: 10,
    width: 800,
    height: 800,
    borderRadius: 800 / 2,
    borderColor: "#50a0d5",
    borderWidth: 0,
    backgroundColor: "#FFF",
    position: "absolute",
    left: -266,
    top: -40,
  },
  usernamePlaceHolder: {
    marginTop: 20,
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "300",
    color: "#4a4a4c",
  },
  mentorName: {
    marginTop: -50,
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 50,
    fontWeight: "bold",
    color: "#4a4a4c",
  },
  mentorQuote: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "300",
    color: "#4a4a4c",
  },
  slide: {
    alignItems: "center",
    marginTop: 40,
    height: screenHeight,
  },
  mentorDescription: {
    margin: 40,
    textAlign: "justify",
    fontSize: 18,
  },
  nextButton: {
    width: 350,
    height: 50,
    borderRadius: 20 / 2,
    margin: 40,
    alignSelf: "flex-end",
    alignContent: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#50a0d5",
    borderColor: "#50a0d5",
    borderWidth: 0,
  },
  selectButtonText: {
    justifyContent: "center",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFF",
  },
  imageWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
