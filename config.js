export const address = "http://10.0.2.2:8888/";

export const CONST = {
  MENTOR_AUGUSTO: require("./app/assets/images/Augusto.png"),
  MENTOR_NERONE: require("./app/assets/images/Nerone.png"),
  MENTOR_CESARE: require("./app/assets/images/Cesare.png"),
  ROOM_PLACEHOLDER: require("./app/assets/images/Museum.jpg"),
  HEADER_TYPE: {
    CHATLIST: 0,
    CHAT: 1,
  },
  VISIT_FLAG: {
    END: 0,
    START: 1,

  }
};

export function dateFormatter(date) {
  var today = new Date(date);
  
  var day = today.getDate();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  switch (month) {
    case 1:
      return day + " gen " + year;
    case 2:
      return day + " feb " + year;
    case 3:
      return day + " mar " + year;
    case 4:
      return day + " apr " + year;
    case 5:
      return day + " mag " + year;
    case 6:
      return day + " giu " + year;
    case 7:
      return day + " lug " + year;
    case 8:
      return day + " ago " + year;
    case 9:
      return day + " set " + year;
    case 10:
      return day + " ott " + year;
    case 11:
      return day + " nov " + year;
    case 12:
      return day + " dic " + year;
    default:
      break;
  }
}
