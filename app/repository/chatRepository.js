import Toast from "react-native-rn-toast";
import { address } from "../../config";
import { retrieveData, saveData } from "./utility";

export async function getChatList(roomID, callback) {
  var token = await retrieveData("userToken");

  await fetch(
    address + "api/chat/getChatList?token=" + token + "&roomID=" + roomID,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.status == "200") {
        /*   console.log(
          "DEBUG : getChatList : " + JSON.stringify(response, undefined, 4)
        ); */
        callback(response.data);
      } else {
        /*   console.log(
          "DEBUG : getChatList : " + JSON.stringify(response, undefined, 4)
        ); */
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function createChat(artworkID, callback) {
  var token = await retrieveData("userToken");

  await fetch(
    address + "api/chat/createChat?token=" + token + "&artworkID=" + artworkID,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.status == "200") {
        console.log(
          "DEBUG : createChat : " + JSON.stringify(response, undefined, 4)
        ); 

        console.log(response.questions)
        callback(response.data);
      } else {
       /*    console.log(
          "DEBUG : createChat : " + JSON.stringify(response, undefined, 4)
        ); */
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
