import Toast from "react-native-rn-toast";
import { address } from "../../config";
import { retrieveData, saveData } from "./utility";

export async function getMyInfo(callback) {
  var token = await retrieveData("userToken");
  console.log(token);
  await fetch(address + "api/user/getMyInfo" + "?token=" + token, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response.status);
      if (response.status == "200") {
        /*console.log(
          "DEBUG : getMyInfo : " + JSON.stringify(response, undefined, 4)
        );*/
        callback(response.data);
      } else {
        /*       console.log(
          "DEBUG : getMyInfo : " + JSON.stringify(response, undefined, 4)
        ); */
        Toast.show("Username non disponibile", Toast.SHORT);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getMyVisits(callback) {
  var token = await retrieveData("userToken");
  await fetch(address + "api/user/getMyVisit" + "?token=" + token, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response.status);
      if (response.status == "200") {
        /* console.log(
          "DEBUG : getMyVisits : " + JSON.stringify(response, undefined, 4)
        ); */
        callback(response.data);
      } else {
        console.log(
          "DEBUG : getMyVisits : " + JSON.stringify(response, undefined, 4)
        );
        Toast.show("Visita non disponibile", Toast.SHORT);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getRoomByID(roomID, callback) {
  await fetch(
    address + "dashapi/room/getRoomByID?roomID=" + roomID,
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
      console.log(response.status);
      if (response.status == "200") {
        console.log(
          "DEBUG : getRoomByID : " + JSON.stringify(response, undefined, 4)
        );
        callback(response.data);
      } else {
        console.log(
          "DEBUG : getRoomByID : " + JSON.stringify(response, undefined, 4)
        );
        Toast.show("Stanza non disponibile", Toast.SHORT);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getStatueByID(statueID, callback) {
  var token = await retrieveData("userToken");
  await fetch(
    address +
      "api/user/getRoomByID" +
      "?token=" +
      token +
      "&statueID=" +
      statueID,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        statueID: statueID,
      }),
    }
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response.status);
      if (response.status == "200") {
        console.log(
          "DEBUG : getStatueByID : " + JSON.stringify(response, undefined, 4)
        );
        callback(response.data);
      } else {
        console.log(
          "DEBUG : getStatueByID : " + JSON.stringify(response, undefined, 4)
        );
        Toast.show("Statua non disponibile", Toast.SHORT);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function createVisit(museum, location, image, callback) {
  var token = await retrieveData("userToken");
  await fetch(address + "api/user/createVisit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      museum: museum,
      location: location,
      time: 0,
      musicLink: "",
      createdAt: Date.now(),
      image: image,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response.status);
      if (response.status == "200") {
        console.log(
          "DEBUG : createVisit : " + JSON.stringify(response, undefined, 4)
        );
        //callback(response.data);
      } else {
        console.log(
          "DEBUG : createVisit : " + JSON.stringify(response, undefined, 4)
        );
        Toast.show("Impossibile creare la visita", Toast.SHORT);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
