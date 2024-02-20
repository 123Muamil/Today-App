import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Platform,PanResponder, Animated,Dimensions,Image} from "react-native";
import { Icon } from "../components";
import styles, { DARK_GRAY } from "../assets/styles";
import ChatContainer from "../components/ChatContainer";
import { RouteProp } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { SendMessage, ReceiveMessage } from '../auth/SendMessage';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import * as ImagePicker from 'expo-image-picker';
import app from '../config/firebaseConfig';
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { getStorage, ref as ref1,uploadBytes,getDownloadURL } from "firebase/storage";
import { Audio } from 'expo-av';
const {height}=Dimensions.get('window')
const chatHeight=height*0.15;
const windowWidth = Dimensions.get('window').width;
type RootStackParamList = {
  ChatScreen: {
    match: {
      uid: any;
      roomId: any;
      displayName: any;
      name: string;
      messages: string[];
    };
  };
};

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'ChatScreen'>;

const ChatScreen = ({ route }: { route: ChatScreenRouteProp }) => {
  const [message, setMessage] = useState('');
  const { userData } = useSelector((state: any) => state.User);
  const [allMessages, setAllMessages] = useState([]) as any;
  const [image, setImage] = useState(null) as any;
  const [isTyping, setIsTyping] = useState(false);
  const [recording, setRecording] = useState() as any;
  const [permissionResponse, requestPermission] = Audio.usePermissions() as any;
  const pan = useRef(new Animated.ValueXY()).current;
  const match = route.params?.match;
  const database = getDatabase(app);
  const storage= getStorage(app)
  const currentUserId = userData.uid;
  const guestUserId = match.uid;
  useEffect(() => {
    const messageRef = ref(database, `messages/${currentUserId}/${guestUserId}`);
    const unsubscribe = onValue(messageRef, (snapshot) => {
      const messageData = snapshot.val() || {};
      const messages = Object.values(messageData).map((message: any) => ({
        ...message,
      }));
      setAllMessages(messages);
      console.log("The messages are:",messages)
    });

    return () => {
      unsubscribe();
    };
  }, [currentUserId, guestUserId]);
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        startRecording(); 
        return true;
        
      },
      onPanResponderGrant: () => {
      startRecording();
    },
      onPanResponderMove: (_, gestureState) => {
        Animated.event(
          [
            null,
            { dx: pan.x, dy: pan.y }
          ],
          { useNativeDriver: false }
        )(_, gestureState);
      },
      onPanResponderRelease: (_, gestureState) => {
        // Snap back to the original position
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false
        }).start(() => {
          // Check if the view has returned to its original position
          if (gestureState.dx === 0 && gestureState.dy === 0) {
            // If it's at the original position, stop recording
            stopRecording();
          } else {
            // If it's not at the original position, consider it a cancellation
            console.log('Recording canceled');
          }
        });
      }
    })
  ).current;
  const sendMessage1 = async () => {
    if (message === '') {
      console.warn('Please enter text');
      return;
    }

    await SendMessage(currentUserId, guestUserId, message, '','','')
      .then(() => {
        setMessage('');
        setIsTyping(false);
      })
      .catch((error: any) => {
        console.log('Error while sending message', error);
      });

    await ReceiveMessage(currentUserId, guestUserId, message, '','','')
      .then(() => {
        setMessage('');
        setIsTyping(false);
      })
      .catch((error: any) => {
        console.log('Error while sending message', error);
      });
  };


  const handleImageUpload = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log("The image result is:",result);

    if (!result.canceled) {
      console.log("The result is:",result)
      if(result.assets[0].type==='image')
      {
        const imageUri = result.assets[0].uri;
        // Convert the URI to Blob
        const response = await fetch(imageUri);
        const blob = await response.blob();
          // Create a reference to the storage location where you want to upload the image
       const storageRef = ref1(storage, 'images/' + result.assets[0].fileName);
        // Upload the image to Firebase Storage
        const snapshot = await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(snapshot.ref);
       //  console.log('Image uploaded successfully. Download URL:', downloadURL);
     //  for vedios
     
       await SendMessage(currentUserId, guestUserId, '',downloadURL,'','')
       .then(() => {
         setImage('');
       })
       .catch((error: any) => {
         console.log('Error while sending message', error);
       });
 
     await ReceiveMessage(currentUserId, guestUserId, '',downloadURL,'','')
       .then(() => {
         setImage('');
       })
       .catch((error: any) => {
         console.log('Error while sending message', error);
       });
 
      }
       else if(result.assets[0].type='video')
       {
        const videoUri = result.assets[0].uri

        // Convert the video URI to Blob
        const response = await fetch(videoUri);
        const blob = await response.blob();
  
        // Create a reference to the storage location where you want to upload the video
        const storageRef = ref1(storage, 'videos/' + result.assets[0].fileName);
  
        // Upload the video to Firebase Storage
        const snapshot = await uploadBytes(storageRef, blob);
  
        // Retrieve the download URL asynchronously
        const downloadURL = await getDownloadURL(snapshot.ref);
        await SendMessage(currentUserId, guestUserId, '','',downloadURL,'')
        .then(() => {
          setImage('');
        })
        .catch((error: any) => {
          console.log('Error while sending message', error);
        });
  
      await ReceiveMessage(currentUserId, guestUserId, '','', downloadURL,'')
        .then(() => {
          setImage('');
        })
        .catch((error: any) => {
          console.log('Error while sending message', error);
        });
       }
       return
    }
        

      
  };
  const handleTyping = (text: string) => {
    setMessage(text);
    setIsTyping(text.length>0);
  };

    async function startRecording() {
      console.log("Recording Started")
      try {
        if (permissionResponse.status !== 'granted') {
          console.log('Requesting permission..');
          await requestPermission();
        }
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
  
        console.log('Starting recording..');
        const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
        console.log('Recording started');
      } catch (err) {
        console.error('Failed to start recording', err);
      }
    }
 

    async function stopRecording() {
      console.log('Stopping recording..');
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync(
        {
          allowsRecordingIOS: false,
        }
      );
  const audioUri = recording.getURI();
  const response = await fetch(audioUri);
  const blob = await response.blob();
  try {
    const storageRef = ref1(storage, 'audios/' + generateUniqueFileName());
    const snapshot = await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('Download URL:', downloadURL);
    await SendMessage(currentUserId, guestUserId, '','','',downloadURL)
    .then(() => {
      setImage('');
    })
    .catch((error: any) => {
      console.log('Error while sending message', error);
    });

  await ReceiveMessage(currentUserId, guestUserId, '','', '',downloadURL)
    .then(() => {
      setImage('');
    })
    .catch((error: any) => {
      console.log('Error while sending message', error);
    });
  } catch (error) {
    console.error('Error uploading audio:', error);
  }
    }
    function generateUniqueFileName() {
      return 'audio_' + Date.now() + '.mp3';
    }
 
  return (
    <KeyboardAvoidingView
      style={{ flex: 1}}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -100}
    >
      <View style={chatStyles.container}>
        <View style={chatStyles.header}>
           <View style={chatStyles.headerContent}>
           <TouchableOpacity style={styles.circle}>
        <AntDesign name="arrowleft" color={'#FFFFFF'} size={20} />
          </TouchableOpacity>
          <Image source={require('../assets/images/chatProfile.png')} style={chatStyles.chatImage}/>
            <View>
            <Text style={chatStyles.title}>{match.displayName}</Text>
          <Text style={chatStyles.lastScene}>Last Seen at 10:00 AM</Text>
            </View>
           </View>
          <TouchableOpacity style={styles.circle}>
            <Icon name="ellipsis-vertical" color={'#FFFFFF'} size={20} />
          </TouchableOpacity>
        </View>

        <ChatContainer messages={allMessages} />

        <View style={chatStyles.inputContainer}>
        <View style={chatStyles.input}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <TouchableOpacity onPress={handleImageUpload}>
    <SimpleLineIcons name="camera" size={20} color="#FFFFFF" />
    </TouchableOpacity>
    <TextInput
      style={{ flex: 1, marginLeft: 8, color: '#FFF' }}
      placeholder="Type Something..."
      value={message}
      onChangeText={handleTyping}
      onSubmitEditing={sendMessage1}
      placeholderTextColor='#757A8D'
    />
  </View>
</View>

          {
              isTyping?<TouchableOpacity style={chatStyles.sendButton} onPress={sendMessage1}>
 <Ionicons name="send"  style={{color:'#FFF'}} size={20} />
              </TouchableOpacity>:   <Animated.View
        style={{
          display: 'flex',
          padding:20,
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'flex-start',
         gap: 8,
         borderRadius: 50,
         backgroundColor: '#474DEF',
         marginBottom:40,
         marginLeft:5,
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }}
        {...panResponder.panHandlers}
      >
      <FontAwesome name="microphone" style={{color:'#FFF'}} size={20} />
      </Animated.View>
          }
        </View>
      </View>
    
    </KeyboardAvoidingView>
  );
};

const chatStyles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor: "#0D152B",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#2D335E",
    height:chatHeight,
    width:windowWidth,
    overflow:'hidden',
    marginTop:10,

  },
  headerContent:{
     flexDirection:'row',
     gap:20,
  },
  chatImage:{
   width:48,
   height:48,
   flexShrink:0,
   borderRadius:48,
   marginTop:4,
  },
  title: {
    color: '#FFF',
    fontFamily: '',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    marginTop:2,
  },
  lastScene: {
    color: '#D0D9F9',
    fontFamily: 'Geometria',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',

  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",

  },
  input: {
    display: 'flex',
    width: 301,
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 8,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: '#283455',
    backgroundColor: '#0D152B',
     marginBottom:40,
   
  },
  sendButton: {
    display: 'flex',
     padding:20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 8,
    borderRadius: 50,
    backgroundColor: '#474DEF',
    marginBottom:40,
    marginLeft:5,
    
  },
  cameraButton:{
    width:40,
    height:40,
    backgroundColor:'#FFF',
    borderRadius: 5,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#ccc',
    borderLeftWidth:1,
    borderTopWidth:1,
    borderBottomWidth:1,
    
  },
});

export default ChatScreen;
