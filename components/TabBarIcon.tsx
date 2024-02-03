import React from "react";
import { Text, View } from "react-native";
import Icon from "./Icon";
import styles, { DARK_GRAY, PRIMARY_COLOR } from "../assets/styles";
import { TabBarIconT } from "../types";

const TabBarIcon = ({ focused, iconName }: TabBarIconT) => {
  const iconColor = focused ? PRIMARY_COLOR : DARK_GRAY;

  return (
    <View style={styles.iconMenu}>
      <Icon name={iconName} size={16} color={iconColor} />
    </View>
  );
};

export default TabBarIcon;
