import React from 'react';
import {
    SafeAreaView,
    TouchableWithoutFeedback,
    StyleSheet,
    View,
    Image,
    ImageBackground,
} from 'react-native';

import { Divider, Icon, Layout, Text, Input, Button } from '@ui-kitten/components';
import { AuthContext } from '../../App';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
);

const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline' />
);

export const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { signIn } = React.useContext(AuthContext);
    const { signUp } = React.useContext(AuthContext);
    const [value, setValue] = React.useState('');
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    const navigateBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <Layout style={{ flex: 1, alignItems: 'center', }}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={{
                        width: '80%',
                        resizeMode: 'contain'
                    }} />

                <Layout style={{ flex: 0.7, alignItems: 'center', width: '60%', marginTop: 10 }}>
                    <Input
                        placeholder='Username'
                        value={username}
                        onChangeText={nextValue => setUsername(nextValue)}
                    />
                    <Input
                        value={password}
                        placeholder='Password'
                        caption='Should contain at least 8 symbols'
                        accessoryRight={renderIcon}
                        captionIcon={AlertIcon}
                        secureTextEntry={secureTextEntry}
                        onChangeText={nextValue => setPassword(nextValue)}
                        style={{ marginTop: 10 }}
                    />
                    <Button onPress={() => signIn({ username, password })} status='primary' style={{ marginTop: 10, width: '100%' }}>
                        Login
                    </Button>
                    <Button onPress={() => signUp({ username, password })} status='primary' style={{ marginTop: 5, width: '100%' }}>
                        Register
                    </Button>
                </Layout>
            </Layout>
        </SafeAreaView>
    );
};