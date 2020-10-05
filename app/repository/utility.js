import AsyncStorage from "@react-native-community/async-storage";

export const saveData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    console.log("Error storing token " + key + " " + error);
  }
};

export const retrieveData = async (key) => {
  try {
    var token = await AsyncStorage.getItem(key);
    return token;
  } catch (error) {
    console.log("Error getting data key " + key);
  }
};


//TODO: GET() AND POST() FUNCTION TO AVOID CODE WASTE