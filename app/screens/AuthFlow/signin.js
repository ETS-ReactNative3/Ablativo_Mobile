import React from "react";
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
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

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const MENTOR_NERONE = "https://picsum.photos/200";
const MENTOR_AUGUSTO = "https://picsum.photos/200";
const MENTOR_CESARE = "https://picsum.photos/200";

export const UserTypeItem = (props) => {
  const { image, label, labelColor, selected, ...attributes } = props;
  return (
    <TouchableOpacity {...attributes}>
      <View
        style={[
          styles.userTypeItemContainer,
          selected && styles.userTypeItemContainerSelected,
        ]}
      >
        <Text style={[styles.userTypeLabel, { color: labelColor }]}>
          {label}
        </Text>
        <Image
          source={{
            uri: image,
          }}
          style={[
            styles.userTypeMugshot,
            selected && styles.userTypeMugshotSelected,
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

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
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{
            width: "80%",
            resizeMode: "contain",
          }}
        />
        <View style={styles.userTypesContainer}>
          <UserTypeItem
            label="Cesare"
            labelColor="#ECC841"
            image={MENTOR_CESARE}
            onPress={() => setSelectedType("Cesare")}
            selected={selectedType === "Cesare"}
          />
          <UserTypeItem
            label="Augusto"
            labelColor="#2CA75E"
            image={MENTOR_AUGUSTO}
            onPress={() => setSelectedType("Augusto")}
            selected={selectedType === "Augusto"}
          />
          <UserTypeItem
            label="Nerone"
            labelColor="#36717F"
            image={MENTOR_NERONE}
            onPress={() => setSelectedType("Nerone")}
            selected={selectedType === "Nerone"}
          />
        </View>
        <Layout
          style={{
            flex: 0.7,
            alignItems: "center",
            width: "60%",
            marginTop: 10,
          }}
        >
          <Input
            placeholder="Username"
            value={username}
            onChangeText={(nextValue) => setUsername(nextValue)}
          />
          <Input
            value={password}
            placeholder="Password"
            caption="Should contain at least 8 symbols"
            accessoryRight={renderIcon}
            captionIcon={AlertIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={(nextValue) => setPassword(nextValue)}
            style={{ marginTop: 10 }}
          />
          <Button
            onPress={() => signIn({ username, password })}
            status="primary"
            style={{ marginTop: 10, width: "100%" }}
          >
            Login
          </Button>
          <Button
            onPress={() => signUp({ username, password })}
            status="primary"
            style={{ marginTop: 5, width: "100%" }}
          >
            Register
          </Button>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userTypesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  userTypeItemContainer: {
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
  },
  userTypeItemContainerSelected: {
    opacity: 1,
  },
  userTypeMugshot: {
    margin: 4,
    height: 70,
    width: 70,
    borderRadius: 40,
  },
  userTypeMugshotSelected: {
    height: 100,
    width: 100,
    borderRadius: 50,

  },
  userTypeLabel: {
    color: "yellow",
    fontFamily: "UbuntuBold",
    fontSize: 11,
  },
});
