import { StyleSheet, Text, View,Dimensions,SafeAreaView,Platform,StatusBar,TouchableOpacity,ScrollView } from 'react-native'
import React,{useState} from 'react'
import { Entypo } from '@expo/vector-icons';
const screenWidth=Dimensions.get('window').width;
const {height}=Dimensions.get('window')
const headerHeight=height*0.1;
const Interests = ({ navigation }:any) => {
    const [selectedInterests, setSelectedInterests] = useState([]) as any;

    const interests = [
      "Harry Potter",
      "90s Kid",
      "SoundCloud",
      "Spa",
      "Self-care",
      "Heavy mental",
      "House parties",
      "Gin & tonic",
      "Gymnastics",
      "Hot yoga",
      "Meditation",
      "Spotify",
      "Sushi",
      "Hockey",
      "Basketball",
      "Stam Poetry",
      "Home workouts",
      "Theatre",
      "Trainers",
      "Instagram",
      "Hot springs",
      "Walking"
    ];
    const handleInterestToggle = (interest:any) => {
        const index = selectedInterests.indexOf(interest);
        if (index === -1) {
          setSelectedInterests([...selectedInterests, interest]);
        } else {
          const updatedInterests = [...selectedInterests];
          updatedInterests.splice(index, 1);
          setSelectedInterests(updatedInterests);
        }
      };
    
  return (
    <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="red" translucent={true} />
          <View style={styles.header}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
      <Entypo name="chevron-left" size={24} color="#d6d9ec" style={styles.headerIcon} />
      </TouchableOpacity>
      <TouchableOpacity>
      <Text style={styles.headerText}>skip</Text>
     
      </TouchableOpacity>
      </View>

      {/* Your content */}
      <ScrollView style={styles.content}>
       <Text style={styles.heading}>
        Interests
       </Text>
       <Text style={styles.paragraph}>Let everyone know what you're interested in by adding to your profile</Text>
       <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 }}>
        {interests.map((interest, index) => (
          <TouchableOpacity
            key={index}
            style={{
              padding: 10,
              backgroundColor: '#FFF',
              borderRadius: 30,
              margin: 5,
              borderWidth:2,
              borderColor:selectedInterests.includes(interest) ? '#f9c4cd' : 'grey'
            }}
            onPress={() => handleInterestToggle(interest)}
          >
            <Text style={{ color: selectedInterests.includes(interest) ? '#f9c4cd' : 'grey', }}>{interest}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
       
          <TouchableOpacity style={styles.selectButton} onPress={()=>navigation.navigate('add_photos')}>
          <Text style={{color:"#FFF"}}>CONTINUE {selectedInterests.length}/22</Text>
          </TouchableOpacity>
      </View>
    </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Interests

const styles = StyleSheet.create({
   container:{
     flex:1,
     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
   },
   header:{
    width:screenWidth,
    height:headerHeight,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#FFF'
   },
   headerIcon:{
        padding:'5%',
   },
   headerText:{
    padding:'5%',
   },
   content: {
    flex: 1, 
    backgroundColor: 'white', 
  },
  heading:{
        color:'black',
        fontSize:24,
        marginLeft:'10%',
        fontWeight:'bold',
  },
  paragraph:{
    marginHorizontal:'10%',
  },
  selectButton:{
    backgroundColor:"#d53a3f",
    padding:16,
    borderRadius:40,
    justifyContent:'center',
    alignItems:'center'
  }
})