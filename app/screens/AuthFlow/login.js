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
import Toast from "react-native-rn-toast";
import { checkUsername } from "../../repository/authRepository";
import { Divider, Icon, Layout, Input, Button } from "@ui-kitten/components";
import { AuthContext } from "../../App";

const screenWidth = Math.round(Dimensions.get("screen").width);
const screenHeight = Math.round(Dimensions.get("screen").height);

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

export const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [check, setCheck] = React.useState(false);

  const { signIn } = React.useContext(AuthContext);
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

  const renderStatus = (type) => {
    if (check) {
      if (type == "") return "danger";
    } else return "";
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
            status={renderStatus(username)}
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
            placeholder="*******"
            value={password}
            status={renderStatus(password)}
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
            <TouchableOpacity
              onPress={() => {
                setCheck(true);
                signIn({ username, password });
              }}
            >
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

          <View style={styles.signUpButton}>
            <TouchableOpacity
              onPress={() => {
                setCheck(true);
                if (username == "" || password == "") {
                  Toast.show(
                    "Inserisci tutti i campi per procedere!",
                    Toast.SHORT
                  );
                }
                else if(username.length < 6 || password.length < 8 ) {
                  Toast.show(
                    "Password o Username non validi",
                    Toast.SHORT
                  );
                }
                else
                  checkUsername(username, password, navigation.navigate);
            
              }}
            >
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
    elevation: 5,
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
  signUpButton: {
    elevation: 5,
    marginLeft: 190,
    marginTop: -15,
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
