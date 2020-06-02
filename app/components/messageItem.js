import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Button, Icon, ListItem, Avatar } from "@ui-kitten/components";

export default MessageItem = (props) => {
  const { message, ...listItemProps } = props;

  const hours =
    message.date.getHours() + 2 < 10
      ? "0" + message.date.getHours() + 2
      : message.date.getHours() + 2;
  const minutes =
    message.date.getMinutes() < 10
      ? "0" + message.date.getMinutes()
      : message.date.getMinutes();

  const renderMessageDate = (style, index) => (
    <View style={styles.dateContainer}>
      {message.isRead && (
        <Icon
          {...style}
          width={16}
          height={16}
          fill={["color-primary-default"]}
          name="done-all"
        />
      )}
      <Text style={styles.dateText} appearance="hint" category="c1">
        {hours + ":" + minutes}
      </Text>
    </View>
  );

  const renderProfileAvatar = (props) => (
    <Avatar
      style={styles.avatar}
      source={{
        uri: message.avatar,
      }}
    />
  );

  return (
    message.message = message.message.length > 35 ? message.message.substring(0,35 )+'...' :message.message,
    <ListItem
      {...listItemProps}
      title={message.username}
      description={message.message}
      accessoryRight={renderMessageDate}
      accessoryLeft={renderProfileAvatar}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    tintColor: null,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    textAlign: "right",
    minWidth: 64,
  },
});
