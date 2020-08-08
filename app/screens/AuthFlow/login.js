import React from "react";
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { Divider, Icon, Layout, Input, Button } from "@ui-kitten/components";
import { AuthContext } from "../../App";

const screenWidth = Math.round(Dimensions.get("screen").width);
const screenHeight = Math.round(Dimensions.get("screen").height);

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

export const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn } = React.useContext(AuthContext);
  const { signUp } = React.useContext(AuthContext);
  const [value, setValue] = React.useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [selectedType, setSelectedType] = React.useState("");

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

  return (
    <SafeAreaView>
      <Layout style={styles.mainContent}>
        <View style={styles.circle} />
        <Image
          source={require("../../assets/images/logoWablativo.png")}
          style={{
            elevation: 11,
            width: "50%",
            height: "40%",
            alignSelf: "center",
            resizeMode: "contain",
            marginLeft: "-55%",
            marginTop: -70,
          }}
        />

        <View style={styles.inputWrapper}>
          <Text style={styles.usernamePlaceHolder}>Username</Text>
          <Input
            placeholder="SickedOyster47"
            value={username}
            onChangeText={(nextValue) => setUsername(nextValue)}
            style={{
              width: screenWidth * 0.6,
              marginTop: 10,
              borderRadius: 30,
              backgroundColor: "transparent",
            }}
          />
          <Text style={styles.usernamePlaceHolder}>Password</Text>
          <Input
            value={password}
            placeholder="*******"
            caption="Should contain at least 8 symbols"
            accessoryRight={renderIcon}
            captionIcon={AlertIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={(nextValue) => setPassword(nextValue)}
            style={{
              width: screenWidth * 0.6,
              marginTop: 10,
              borderRadius: 30,
              backgroundColor: "transparent",
            }}
          />
          <View style={styles.loginButton}>
            <TouchableOpacity onPress={() => signIn({ username, password })}>
              <Icon
                width={40}
                height={40}
                fill="#4a4a4c"
                name="log-in-outline"
                style={{
                  alignSelf: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.signInButton}>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Icon
                width={40}
                height={40}
                fill="#fff"
                name="edit-2-outline"
                style={{
                  alignSelf: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  mainContent: {
    height: screenHeight,
    alignItems: "center",
    backgroundColor: "#50a0d5",
  },
  circle: {
    elevation: 10,
    width: 600,
    height: 600,
    borderRadius: 600 / 2,
    borderColor: "#50a0d5",
    borderWidth: 0,
    backgroundColor: "#FFF",
    position: "absolute",
    left: -200,
    top: -30,
  },
  loginButton: {
    elevation: 10,
    marginLeft: 255,
    marginTop: 20,
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderColor: "#50a0d5",
    borderWidth: 0,
  },
  signInButton: {
    elevation: 10,
    marginLeft: 190,
    marginTop: -15 ,
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "",
    backgroundColor: "#50a0d5",
    borderColor: "#FFF",
    borderWidth: 0,
  },
  inputWrapper: {
    elevation: 10,
    alignSelf: "flex-start",
    alignItems: "flex-start",
    marginLeft: 20,
    marginTop: "-15%",
  },
  usernamePlaceHolder: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4a4a4c",
  },
});
