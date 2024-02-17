import React, { useState,useRef,forwardRef } from "react";
import { View, ImageBackground ,Text,Image,TouchableOpacity,SafeAreaView} from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { City, Filters, CardItem } from "../components";
import styles from "../assets/styles";
import DEMO from "../assets/data/demo";
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const Home = () => {
  const [swiper, setSwiper] = useState<CardStack | null>(null);

  return (
    <SafeAreaView >
      <View style={styles.containerHome}>
        <View style={styles.top}>
          <View><Text style={styles.explorerText}>Explore</Text></View>
           <TouchableOpacity style={styles.iconContainer}><Image source={require('../assets/match.png')}/></TouchableOpacity>
        </View>

        
        {/* <CardStack
          loop
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          
          ref={(newSwiper:any): void => setSwiper(newSwiper)}
        >
          {DEMO.map((item) => (
            <Card key={item.id}>
              <CardItem
                hasActions
                image={item.image}
                name={item.name}
                description={item.description}
                matches={item.match}
              />
            </Card>
          ))}
        </CardStack> */}
      <View style={{marginHorizontal:10}}>
      <Image source={require('../assets/images/explorer.png')} style={styles.explorerImage}/>
        <View style={styles.explorerInnerContainer}>
         <View style={styles.matchContainer}> 
               <Text style={styles.NameStyle}>Brandy Kautzer</Text>
               <View style={styles.MATCHContainer}>
               <Text style={styles.matchText}>80% Match</Text>
               </View>
         </View>
         <View style={{flexDirection:'row',marginLeft:20,}}>
      <EvilIcons name="location" size={24} color="#FFFFFF" style={{marginRight:5,marginTop:4,}} />
        <Text style={styles.text}>New York</Text>
       
      </View>
      <View style={styles.line}></View>
      <View style={styles.Container}>
            <View style={styles.Row}>
            <Image source={require('../assets/traveler.png')} style={styles.iconImage}/>
             <Text style={styles.icon}>Traveler</Text>
            </View>
            <View  style={styles.Row}>
            <Image source={require('../assets/singer.png')} style={styles.iconImage}/>
             <Text style={styles.icon}>Singer</Text>
            </View> 
            <View style={styles.Row}>
            <Image source={require('../assets/painter.png')} style={styles.iconImage}/>
             <Text style={styles.icon}>Painter</Text>
            </View>
           
      </View>
        </View>
        <View style={styles.crossContainer}>
        <Entypo name="cross" size={20} color="#FFFFFF" />
        </View>
        <View style={styles.heartContainer}>
        <AntDesign name="heart" size={20} color="#FFFFFF" />
        </View>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
