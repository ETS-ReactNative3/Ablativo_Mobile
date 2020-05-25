import React, {useState} from 'react';
import { SafeAreaView, Image, View, StyleSheet } from 'react-native';
import { Divider, Icon, Layout, Text, Tab, TabView, TopNavigationAction, ViewPager } from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const ProfileScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 0.15 }}></View>
      <View style={{
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 75,
        marginBottom: 20,
      }}>

        <Image
          source={require('../../assets/images/sticker2.png')}
          style={{
            width: 200,
            height: 200,
            borderRadius: 75,
          }} />
      </View>
      <TabView
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <Tab title='QUESTION'>
          <Layout style={styles.tabContainer}>
          </Layout>
        </Tab>
        <Tab title='VISIT'>
          <Layout style={styles.tabContainer}>
          </Layout>
        </Tab>
        <Tab title='UPVOTES'>
          <Layout style={styles.tabContainer}>
          </Layout>
        </Tab>
      </TabView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  tabContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});