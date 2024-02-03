import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Icon } from "../components";
import styles, { DARK_GRAY } from "../assets/styles";
import ChatContainer from "../components/ChatContainer"; // Import the ChatContainer component
type ChatScreenRouteProp = {
  params: {
    match: {
      name: string;
      messages: string[]; 
    };
  };
};
const ChatScreen = ({ route }: { route: ChatScreenRouteProp }) => {
  const [message, setMessage] = useState("");
  const { match } = route.params;

  const sendMessage = () => {
    // Handle sending the message logic here
    // You can use state or a state management library like Redux to manage the chat messages
    // Update the chat messages state with the new message
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -100}
    >
      <View >
        <View style={chatStyles.header}>
          <Text style={chatStyles.title}>{match.name}</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
          </TouchableOpacity>
        </View>

        {/* Use the ChatContainer component to display messages */}
        <ChatContainer messages={match.messages} />

        <View style={chatStyles.inputContainer}>
          <TextInput
            style={chatStyles.input}
            placeholder="Type a message..."
            value={message}
            onChangeText={(text) => setMessage(text)}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Icon name="send" color={DARK_GRAY} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const chatStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
  },
});

export default ChatScreen;
