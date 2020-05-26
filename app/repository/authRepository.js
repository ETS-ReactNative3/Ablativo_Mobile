import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-rn-toast';
import { address } from '../../config';

const saveData = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, data)

    } catch (error) {
        console.log("Error storing token " + error)
    }
}

export async function login(username, pwd, dispatch) {
  
    console.log('Username : ' + username + ' Pwd : ' + pwd);
    await fetch(address + 'user/authenticate', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            pwd: pwd,
        }),
    })
        .then(response => response.json())
        .then(response => {
            console.log(response.status);
            if (response.status == '200') {
                dispatch({ type: 'SIGN_IN', token: response.token });
                saveData('userToken', response.token);
                saveData('userName', username);
            } else {
                Toast.show(
                    'Login Error ' + response.status,
                    Toast.SHORT,
                );
            }
        })
        .catch(error => {
            console.error(error);
        });
}

export async function register(username, pwd, dispatch) {
    console.log('Username : ' + username + ' Pwd : ' + pwd);
    await fetch(address + 'user/register', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            pwd: pwd,
        }),
    })
        .then(response => response.json())
        .then(response => {
            console.log(response.status);
            if (response.status == '200') {
                dispatch({ type: 'SIGN_IN', token: response.token });
                saveData('userToken', response.token);
                saveData('userName', username);
            } else {
                Toast.show(
                    'Login Error ' + response.status,
                    Toast.SHORT,
                );
            }
        })
        .catch(error => {
            console.error(error);
        });
   
}