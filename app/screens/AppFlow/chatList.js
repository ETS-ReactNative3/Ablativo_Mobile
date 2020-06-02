import React, { useState } from "react";
import { ListRenderItemInfo, View } from "react-native";
import {
  Divider,
  Layout,
  List,
  StyleService,
  useStyleSheet,
  TopNavigation,
  TopNavigationAction,
  OverflowMenu,
  MenuItem,
  Icon,
} from "@ui-kitten/components";
import MessageItem from "../../components/messageItem";

const initialMessages = [
  {
    username: "Costantino",
    message: "Lo sai che nella chiesa ortodossa ono considerato santo?",
    avatar: "https://picsum.photos/300",
    date: new Date(),
    isRead: false,
  },
  {
    username: "Grande Capo",
    message: "Questo è fun art attack",
    avatar: "https://picsum.photos/200",
    date: new Date(),
    isRead: false,
  },
];

const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;

const InfoIcon = (props) => <Icon {...props} name="info" />;

const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

export const ChatList = ({ navigation }) => {
  const styles = useStyleSheet(themedStyles);
  const [menuVisible, setMenuVisible] = useState(false);
  const onItemPress = (index) => {
    navigation.navigate("Chat");
  };

  const renderItem = (message) => (
    <MessageItem
      style={styles.item}
      message={message.item}
      onPress={onItemPress}
    />
  );

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderRightActions = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}
      >
        <MenuItem accessoryLeft={InfoIcon} title="About" />
        <MenuItem accessoryLeft={LogoutIcon} title="Delete and leave group" />
      </OverflowMenu>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Layout style={{ minHeight: 40 }} level="1">
        <TopNavigation
          alignment="center"
          title="Museo dei Gessi"
          subtitle="Sapienza"
          accessoryRight={renderRightActions}
        />
      </Layout>
      <Divider/>
      <List
        style={styles.list}
        data={initialMessages}
        renderItem={renderItem}
      />
    </React.Fragment>
  );
};

const themedStyles = StyleService.create({
  list: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "background-basic-color-3",
  },
});
