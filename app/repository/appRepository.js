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
        console.log(
          "DEBUG : getMyInfo : " + JSON.stringify(response, undefined, 4)
        );
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
  await fetch(address + "dashapi/room/getRoomByID?roomID=" + roomID, {
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
        console.log(
          "DEBUG : getRoomByID : " + JSON.stringify(response, undefined, 4)
        );
        callback(response.appdata);
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

export async function createVisit(
  subs_a,
  subs_g,
  subs_h,
  callback
) {
  var token = await retrieveData("userToken");
  await fetch(address + "api/user/createVisit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      museum: "Museo dei Gessi",
      location:  "Sapienza",
      time: 0,
      musicLink: "",
      createdAt: Date.now(),
      image: "",
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response.status);
      if (response.status == "200") {
        console.log(
          "DEBUG : createVisit : " + JSON.stringify(response, undefined, 4)
        );
        callback(subs_a, subs_g, subs_h, response.data._id);
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

export async function endVisit(
  visitID,
  telemetries,
  subs_a,
  subs_g,
  subs_h,
  callback
) {
  var token = await retrieveData("userToken");
  console.log("====================================");
  console.log(telemetries);
  console.log("====================================");
  await fetch(address + "api/user/endVisit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      telemetries: telemetries,
      token: token,
      visitID: visitID,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response.status);
      if (response.status == "200") {
        console.log(
          "DEBUG : endVisit : " + JSON.stringify(response, undefined, 4)
        );
        callback(telemetries, subs_a, subs_g, subs_h);
      } else {
        console.log(
          "DEBUG : endVisit : " + JSON.stringify(response, undefined, 4)
        );
        Toast.show("Impossibile concludere la visita", Toast.SHORT);
        callback(telemetries, subs_a, subs_g, subs_h);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function upvoteRoom(roomID, value, callback) {
  var token = await retrieveData("userToken");
  await fetch(address + "api/room/upvoteRoom", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      roomID: roomID,
      value: value,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response.status);
      if (response.status == "200") {
        console.log(
          "DEBUG : upvoteRoom : " + JSON.stringify(response, undefined, 4)
        );
        callback(value);
      } else {
        console.log(
          "DEBUG : upvoteRoom : " + JSON.stringify(response, undefined, 4)
        );
        Toast.show(
          "Upvote error please try again in some minutes!",
          Toast.SHORT
        );
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function upvoteArtwork(artworkID, value, callback) {
  var token = await retrieveData("userToken");
  await fetch(address + "/api/room/upvoteArwork", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      artworkID: artworkID,
      value: value,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response.status);
      if (response.status == "200") {
        console.log(
          "DEBUG : upvoteArtwork : " + JSON.stringify(response, undefined, 4)
        );
        //callback(response.data);
        callback(value);
      } else {
        console.log(
          "DEBUG : upvoteArtwork : " + JSON.stringify(response, undefined, 4)
        );
        Toast.show(
          "Upvote error please try again in some minutes!",
          Toast.SHORT
        );
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getMentorDetails(mentorName, callback) {
  console.log("Mentor : " + mentorName);

  await fetch(address + "mentor/getMentorByName?mentorName=" + mentorName, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      console.log("DEBUG : getMentorDetails : ", response.data[0]);
      if (response.status == "200") {
        callback(response.data[0]);
      } else {
        Toast.show("Login Error " + response.status, Toast.SHORT);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
