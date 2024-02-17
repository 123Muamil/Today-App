import React from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from "react-native";
import { Icon, ProfileItem } from "../components";
import { EvilIcons } from '@expo/vector-icons';
import DEMO from "../assets/data/demo";
import styles, { WHITE } from "../assets/styles";
import { LinearGradient } from 'expo-linear-gradient';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const halfScreenHeight = height * 0.5;
const Profile = () => {
  const {
    age,
    image,
    info1,
    info2,
    info3,
    info4,
    location,
    match,
    name,
  } = DEMO[7];

  return (
    <SafeAreaView style={{flex:1}}>
   
        <View>
      
         <ImageBackground
         source={require('../assets/images/profile.png')}
        style={{width:width,height:halfScreenHeight}}
        resizeMode="cover"
        
         >
     
              <View style={styles.top}>
            <TouchableOpacity>
              <Text style={styles.topIconLeft}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.circle}>
              <Icon
                name="ellipsis-vertical"
                size={20}
                color={WHITE}
                style={styles.topIconRight}
              />
            </TouchableOpacity>
          </View>
          <LinearGradient
        colors={['rgba(1, 5, 16, 0.00)', '#010510']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1}}
      >
          <View style={styles.profile}>
      <View>
        <Image source={require('../assets/images/profile1.png')} />
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={styles.text}>Julio Mitchell</Text>
        <Text style={styles.text}>26</Text>
      </View>
      <View style={{flexDirection:'row'}}>
      <EvilIcons name="location" size={16} color="#FFFFFF" style={{marginRight:5,marginTop:7,}} />
        <Text style={styles.text}>New York</Text>
       
      </View>
    </View>
  </LinearGradient>
         </ImageBackground>
     
        </View>
        <View   style={{width:width,height:halfScreenHeight,backgroundColor:'#010510'}}>
          <View style={{flexDirection:'row',justifyContent:'center',width:width}}>
            <View style={styles.likeContainer}>
              <Text style={styles.topText}>80%</Text>
              <Text style={styles.bottomText}>Matches</Text>
            </View>
            <View style={styles.likeContainer}>
            <Text style={styles.topText}>150</Text>
              <Text style={styles.bottomText}>Likes</Text>
            </View>
            <View style={styles.likeContainer}>
            <Text style={styles.topText}>75</Text>
              <Text style={styles.bottomText}>Dislikes</Text>
            </View>
          </View>
          <View style={{marginHorizontal:10}}>
         <View style={styles.aboutContainer}>
            
            <Text style={styles.about}>About</Text>
            <View style={styles.flexContainer1}>
            <View style={styles.justifyRow}>
            <Image source={require('../assets/traveler.png')} style={styles.iconImage}/>
             <Text style={styles.icon}>Traveler</Text>
            </View>
            <View style={styles.Row}>
            <Image source={require('../assets/bikeRider.png')} style={styles.iconImage}/>
             <Text style={styles.icon}>Bike Rider     </Text>
            </View>
            <View  style={styles.Row}>
            <Image source={require('../assets/singer.png')} style={styles.iconImage}/>
             <Text style={styles.icon}>Singer</Text>
            </View>
            </View>
            <View  style={styles.flexContainer2}>
            <View style={styles.justifyRow}>
            <Image source={require('../assets/teaLover.png')} style={styles.iconImage}/>
             <Text style={styles.icon}>Tea lover</Text>
            </View>
            <View style={styles.Row}>
            <Image source={require('../assets/photographer.png')} style={styles.iconImage}/>
             <Text style={styles.icon}>Photographer</Text>
            </View>
            <View style={styles.Row}>
            <Image source={require('../assets/painter.png')} style={styles.iconImage}/>
             <Text style={styles.icon}>Painter</Text>
            </View>
            </View>
          
          </View>
          </View>
        </View>

       
     
    </SafeAreaView>
  );
};

export default Profile;
