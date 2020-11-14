import Toast from "react-native-rn-toast";
import { address } from "../../config";
import { retrieveData, saveData } from "./utility";

export async function login(username, pwd, dispatch) {
  console.log("Username : " + username + " Pwd : " + pwd);
  await fetch(address + "user/authenticate", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      pwd: pwd,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response.status);
      if (response.status == "200") {
        console.log(
          "DEBUG : login : " + JSON.stringify(response, undefined, 4)
        );

        dispatch({ type: "SIGN_IN", token: response.token });
        saveData("userToken", response.token);
        saveData("userName", username);
        saveData("userMentor", response.mentor);
      } else {
        Toast.show("Login Error " + response.status, Toast.SHORT);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function register(username, pwd, mentor, dispatch) {
  console.log("Username : " + username + " Pwd : " + pwd);
  await fetch(address + "user/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      pwd: pwd,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response.status);
      if (response.status == "200") {
        dispatch({ type: "SIGN_IN", token: response.token });
        saveData("userToken", response.token);
        saveData("userName", username);
        saveData("userMentor", mentor);
      } else {
        Toast.show("Login Error " + response.status, Toast.SHORT);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function checkUsername(username, password, navigation) {
  console.log("Username : " + username);
  await fetch(address + "user/checkUsername", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response.status);
      if (response.status == "200") {
        navigation("SignUp", {
          username: username,
          password: password,
        });
      } else {
        Toast.show("Username non disponibile", Toast.SHORT);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
