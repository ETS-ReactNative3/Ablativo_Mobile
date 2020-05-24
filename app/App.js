import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Button, IconRegistry, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation/appNavigation';
import { AuthNavigator } from './navigation/authNavigation';
import { SplashScreen } from './screens/splashScreen';
import { default as theme } from './styles/custom-theme'; // <-- Import app theme
import { default as mapping } from './styles/mapping.json'; // <-- Import app mapping

export const AuthContext = React.createContext();

export default function App({ navigation }) {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        if (userToken) console.log("Token successfully retrieved");
        else console.log("Token unavailable")
      } catch (e) {
        // Restoring token failed
        console.log("Cannot restore Token!");
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        console.log(data);

        dispatch({ type: 'SIGN_IN', token: '' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        
        console.log(data);
        dispatch({ type: 'SIGN_IN', token: '' });
      },
    }),
    []
  );

  // STATE
  // 1) isLoading => true when trying to check if token is saved on AsyncStorage
  // 2) userToken => if not null then the user is logged in
  return (
    <AuthContext.Provider value={authContext}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...theme }}
        customMapping={mapping}
      >
        {state.isLoading
          ? <SplashScreen />   // App is Loading then splash screen
          : state.userToken == null
            ? <AuthNavigator /> // !Token User is not signed in
            : <AppNavigator /> // Token then user is signed in
        }
      </ApplicationProvider>
    </AuthContext.Provider>
  );
}