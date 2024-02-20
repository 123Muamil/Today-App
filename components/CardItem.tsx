import React from "react";
import { Text, View, Image, Dimensions, TouchableOpacity,SafeAreaView,ImageBackground} from "react-native";
import Icon from "./Icon";
import { CardItemT } from "../types";
import styles, {
  DISLIKE_ACTIONS,
  FLASH_ACTIONS,
  LIKE_ACTIONS,
  STAR_ACTIONS,
  WHITE,
} from "../assets/styles";

const CardItem = ({
  description,
  hasActions,
  hasVariant,
  image,
  isOnline,
  matches,
  name,
  index,
}: CardItemT) => {
  // Custom styling
  const fullWidth = Dimensions.get("window").width;
  let size = index % 4 === 0 || index % 4 === 3 ? 250 : 290;
  const imageStyle = [
    {
      borderRadius: 40,
      width: hasVariant ? fullWidth / 2 - 15 : fullWidth - 80,
      height: hasVariant ? 170 : 350,
      margin: hasVariant ? 0 : 0,
      backgroundColor:'lightgray',
      
    },
  ];

  const nameStyle = [
    {
      color: "#FFF",
      fontSize: 14,
    },
  ];

  return (
    <SafeAreaView style={[styles.containerCardItem,{height:size}]}>
      {/* IMAGE */}
      <Image source={image} style={[imageStyle,{height:size}]} />
       <View style={styles.matchesContainer}>
       <Text style={nameStyle}>{name}</Text> 
       <View style={styles.status}>
          <View style={isOnline ? styles.online : styles.offline} />
          <Text style={styles.statusText}>
            {isOnline ? "Online" : "Offline"}
          </Text>
        </View>
       </View>
    </SafeAreaView>
  );
};

export default CardItem;
