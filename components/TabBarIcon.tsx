import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from "./Icon";
const TabBarIcon = ({ focused, iconName, label, isLast }: any) => {
  const iconColor = focused ? '#FFFFFF' : "#B3C0EB";
  const backgroundColor = focused ? { backgroundColor: '#474DEF', borderRadius: 15, width:95, height:52, marginTop:-15, marginLeft: isLast ? 0 : 20, marginRight: isLast ? 30 : 0 } : { backgroundColor: 'transparent' };
  return (
    <View style={[styles.iconContainer, backgroundColor]}>
      <Icon name={iconName} size={16} color={iconColor} />
      {focused && <Text style={styles.label}>{label}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  label: {
    color: '#FFF',
    marginLeft: 5,
    fontSize:16,
  },
});

export default TabBarIcon;
