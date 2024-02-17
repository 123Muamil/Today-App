import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { MessageT } from "../types";
import styles from "../assets/styles";

const Message: React.FC<MessageT> = ({ image, lastMessage, name }) => (
  <View style={Styles.messageContainer}>
    <Image source={require('../assets/images/02.jpg')} style={styles.avatar} />
    <View style={Styles.contentContainer}>
      <View style={Styles.lastMessageContainer}>
        <Text style={Styles.name}>{name}</Text>
        <Text style={Styles.message}>{lastMessage}Hello Every One</Text>
      </View>
    </View>
    <Text style={Styles.time}>10:30 AM</Text>
  </View>
);

const Styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
   marginHorizontal:10,
  },
  contentContainer: {
    flex: 1,
  },
  lastMessageContainer: {
    marginTop: 10,
  },
  message: {
    color: '#D0D9F9',
    fontFamily: '',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    paddingTop: 5,
  },
  time: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: '#D0D9F9',
    fontFamily: '',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    marginTop: 10,
  },
  name: {
    color: '#FFF',
    fontFamily: '',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
  
  },
});

export default Message;
