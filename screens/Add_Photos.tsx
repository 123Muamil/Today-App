import { StyleSheet, Text, View,SafeAreaView,StatusBar,TouchableOpacity,Dimensions,Platform,ScrollView,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Entypo } from '@expo/vector-icons';
const screenWidth=Dimensions.get('window').width;
const {height}=Dimensions.get('window')
const headerHeight=height*0.1;
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
const Add_Photos = ({ navigation }:any) => {
    const [selectedPhotos, setSelectedPhotos] = useState([]) as any;
    const maxPhotos = 6;
    useEffect(() => {
        (async () => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            console.warn('Permission required', 'Please allow access to your photo library to select photos.')
          }
        })();
      }, []);
      const selectPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          if (selectedPhotos.length < maxPhotos) {
            setSelectedPhotos([...selectedPhotos, result.assets[0].uri]);
          } else {
            console.warn('Maximum photos reached', `You can only select up to ${maxPhotos} photos.`)
          }
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
      <ScrollView style={styles.content}>
      <Text style={styles.heading}>
        Add photos
       </Text>
       <Text style={styles.paragraph}>Add at least 2 photos to continue</Text>
      <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '45%' }}>
        {[...Array(maxPhotos)].map((_, index) => (
          <TouchableOpacity key={index} style={{width:'30%',height:150,backgroundColor:'#edeef3',borderRadius:10,marginBottom:10,}}>
            {index < selectedPhotos.length ? (
              <Image source={{ uri: selectedPhotos[index] }} style={{ flex: 1,borderRadius:10 }} resizeMode="cover" />
            ) : (
              <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={selectPhoto} style={styles.addButton}>
              <MaterialIcons name="add" size={20} color="#FFF" />
              </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View>
       
       <TouchableOpacity style={styles.selectButton}>
       <Text style={{color:"#FFF"}}>CONTINUE</Text>
       </TouchableOpacity>
   </View>
    </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Add_Photos

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
      buttonContainer:{
         backgroundColor:'#edeef3',
         width:'100%',
         height:150,
         borderRadius:10,

      },
      addButton:{
        backgroundColor:'#cf505b',
        borderRadius:50,
     
        position:'absolute',
        bottom:0,
        right:0,
        width:25,
        height:25,
        justifyContent:'center',
        alignItems:'center'
      },
      heading:{
        color:'black',
        fontSize:24,
        marginLeft:'10%',
        fontWeight:'bold',
  },
  paragraph:{
    marginHorizontal:'10%',
  }
  ,
  selectButton:{
    backgroundColor:"#d53a3f",
    padding:16,
    borderRadius:40,
    justifyContent:'center',
    alignItems:'center'
  }
})