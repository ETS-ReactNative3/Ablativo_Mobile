import React, { useState } from 'react';
import { SafeAreaView, Image, ImageBackground, View, StyleSheet } from 'react-native';
import { Divider, Icon, Layout, Text, Tab, TabView, TopNavigationAction, ViewPager } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from "react-native";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export const ProfileScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [name, setName] = React.useState("");

  async function retrieveData() {
    try {
      var userName = await AsyncStorage.getItem('userName');
      console.log(userName);
      if (userName) setName(userName);
      else console.log("Username unavailable")
    } catch (e) {
      // Restoring token failed
      console.log("Cannot retrieve username " + e);
    }
  }

  React.useEffect(() => {
    retrieveData();
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/images/wallpaper.jpg')}
        style={{
          width: "100%",
          height: "75%",
          resize: "center",
          alignSelf: 'center',
        }}>
        <View style={{
          justifyContent: 'center',
          alignSelf: 'center',
          width: 150,
          height: 150,
          borderRadius: 200,
          marginTop: "20%",
          backgroundColor: "#FFFF",
          overflow: 'hidden'
        }}>
          <Image
            source={require('../../assets/images/sticker2.png')}
            style={{
              width: 150,
              height: 160,
              borderRadius: 75,
              alignSelf: 'center',
            }} />
        </View>
        <Text style={{
          color: "white",
          fontSize: 40,
          alignSelf: "center",
          marginTop: 45,
          fontWeight: 'bold',
          textShadowColor: 'rgba(0, 0, 0, 0.75)',
          textShadowOffset: { width: -1, height: 1 },
          textShadowRadius: 10
        }}>{name.toUpperCase()}</Text>
        <View style={styles.socialsContainer}>
          <View
            style={styles.profileSocial}>
            <Text
              category='s2'
              status='control'>
              Questions
            </Text>
            <Text
              category='c2'
              status='control'>
              20
            </Text>
          </View>
          <View
            style={styles.profileSocial}>
            <Text
              category='s2'
              status='control'>
              Time
            </Text>
            <Text
              category='c2'
              status='control'>
              60 m
            </Text>
          </View>
          <View
            style={styles.profileSocial}>
            <Text
              category='s2'
              status='control'>
              Visits
            </Text>
            <Text
              category='c2'
              status='control'>
              1
            </Text>
          </View>
        </View>
      </ImageBackground>
      <ScrollView horizontal={true} pagingEnabled={true}>
        <View style={{ width: screenWidth }}>
          <Text style={{
            color: "white",
            fontSize: 40,
            alignSelf: "center",
            fontWeight: 'bold',
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 10
          }}>QUESTIONS</Text>
        </View>
        <View style={{ width: screenWidth }}>
          <Text style={{
            color: "white",
            fontSize: 40,
            alignSelf: "center",
            fontWeight: 'bold',
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 10
          }}>MUSIC</Text>
        </View>
        <View style={{ width: screenWidth }}>
          <Text style={{
            color: "white",
            fontSize: 40,
            alignSelf: "center",
            fontWeight: 'bold',
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 10
          }}>VISITS</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  tabContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSocial: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  socialsContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '75%',
    marginVertical: 8,

  },
});