import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from "react-native";
import { CardItem, Icon } from "../components";
import DEMO from "../assets/data/demo";
import styles from "../assets/styles";



const Matches = () => {
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.containerMatches}>
      <View style={styles.top}>
        <Text style={styles.title}>Matches</Text>
        <TouchableOpacity style={styles.circle}>
          <Icon name="ellipsis-vertical" color={'#FFFFFF'} size={20} />
        </TouchableOpacity>
      </View>

      <FlatList
        numColumns={2}
        data={DEMO}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item,index }) => (
         
          <TouchableOpacity >
            <CardItem
              image={item.image}
              name={item.name}
              isOnline={item.isOnline}
              hasVariant
              index={index}
            />
          </TouchableOpacity>
        )}
      />
    </View>

    </SafeAreaView>
  )
}

export default Matches


