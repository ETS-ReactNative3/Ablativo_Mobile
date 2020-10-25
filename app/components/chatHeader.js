import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Icon } from "@ui-kitten/components";
import { CONST } from "../../config";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

export const ChatHeader = (props) => {
  const { type, name, subtitle, goBack } = props;

  const menuRef = React.createRef();
  const searchRef = React.createRef();
  const backRef = React.createRef();
  const feedRef = React.createRef();

  const SearchIcon = (props) => (
    <Icon
      width={25}
      height={25}
      fill={["color-primary-default"]}
      name="search-outline"
      animation="zoom"
      ref={searchRef}
    />
  );

  const MenuIcon = (props) => (
    <Icon
      width={25}
      height={25}
      fill={["color-primary-default"]}
      name="more-vertical"
      animation="pulse"
      ref={menuRef}
    />
  );

  const BackIcon = (props) => (
    <Icon
      width={25}
      height={25}
      fill={["color-primary-default"]}
      name="arrow-ios-back-outline"
      animation="pulse"
      ref={backRef}
    />
  );

  const FeedBackIcon = (props) => (
    <Icon
      width={25}
      height={25}
      fill={["color-primary-default"]}
      name="heart-outline"
      animation="shake"
      ref={feedRef}
    />
  );

  return (
    <View style={[styles.container, styles.centerStyle]}>
      <View style={[styles.nameContainer, styles.centerStyle]}>
        {type == CONST.HEADER_TYPE.CHAT ? (
          <View style={styles.absoluteRight}>
            <TouchableWithoutFeedback
              onPress={() => {
                backRef.current.startAnimation();
                goBack();
              }}
            >
              {BackIcon()}
            </TouchableWithoutFeedback>
          </View>
        ) : null}

        <Text style={styles.museumNameText}>{name}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        {type != CONST.HEADER_TYPE.CHAT ? (
          <View style={styles.absoluteLeft}>
            <TouchableWithoutFeedback
              onPress={() => searchRef.current.startAnimation()}
            >
              {SearchIcon()}
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => menuRef.current.startAnimation()}
            >
              {MenuIcon()}
            </TouchableWithoutFeedback>
          </View>
        ) : 
          <View style={styles.absoluteLeft}>
            <TouchableWithoutFeedback
              onPress={() => feedRef.current.startAnimation()}
            >
              {FeedBackIcon()}
            </TouchableWithoutFeedback>
          </View>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 6,
    backgroundColor: "white",
    flexDirection: "row",
    marginBottom: 0,
    padding: 5,
  },
  nameContainer: { flex: 1 },
  museumNameText: { fontSize: 18, fontWeight: "bold" },
  subtitle: { fontSize: 14 },
  centerStyle: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  absoluteLeft: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: screenWidth * 0.85,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  absoluteRight: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    right: screenWidth * 0.85,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
