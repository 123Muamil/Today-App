import React from "react";
import { Text, TouchableOpacity, ImageBackground, View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation from react-navigation
import { Icon, Message } from "../components";
import DEMO from "../assets/data/demo";
import styles, { DARK_GRAY } from "../assets/styles";

const Messages:React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerMessages}>
        <View style={styles.top}>
          <Text style={styles.title}>Messages</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={DEMO}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ChatScreen", { match: item }); // Navigate to "ChatScreen" with match as a parameter
              }}
            >
              <Message
                image={item.image}
                name={item.name}
                lastMessage={item.message}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default Messages;
