// ChatContainer.js

import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import Message from "./Message"; // Import your Message component

const ChatContainer= ({ messages }:any) => {
  return (
    <FlatList
      data={messages}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Message
          image={item.image}
          name={item.name}
          lastMessage={item.message}
        />
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10, // Adjust as needed
  },
});

export default ChatContainer;
