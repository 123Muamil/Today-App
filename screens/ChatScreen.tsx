import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Platform,TouchableWithoutFeedback, Modal, Pressable } from "react-native";
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
import { getStorage, ref as ref1,uploadBytes,getDownloadURL } from "firebase/storage";
import { Audio } from 'expo-av';
// import Modal from "react-native-modal";
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
  const [isRecording, setIsRecording] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [recordings, setRecordings] = useState([]) as any;
  const [recordingFile, setRecordingFile] = useState() as any;

  // console.log("The image is:",image)
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
    });

    return () => {
      unsubscribe();
    };
  }, [currentUserId, guestUserId]);

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
      <View style={{ flex: 1 }}>
        <View style={chatStyles.header}>
          <Text style={chatStyles.title}>{match.displayName}</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
          </TouchableOpacity>
        </View>

        <ChatContainer messages={allMessages} />

        <View style={chatStyles.inputContainer}>
          <TouchableOpacity style={chatStyles.cameraButton} onPress={handleImageUpload}>
            <Icon name="camera" color={DARK_GRAY} size={20} />
          </TouchableOpacity>
          <TextInput
            style={chatStyles.input}
            placeholder="Type a message..."
            value={message}
            onChangeText={handleTyping}
            onSubmitEditing={sendMessage1}
          />
         {/* <TouchableOpacity style={chatStyles.sendButton} onPress={isTyping ? sendMessage1 : handleVoiceMessage} >
            {isTyping ? (
              <Ionicons name="send"  style={{color:'#FFF'}} size={20} />
            ) : (
              <FontAwesome name="microphone" style={{color:'#FFF'}} size={20} />
            )}
          </TouchableOpacity> */}
          {
              isTyping?<TouchableOpacity style={chatStyles.sendButton} onPress={sendMessage1}>
 <Ionicons name="send"  style={{color:'#FFF'}} size={20} />
              </TouchableOpacity>:<TouchableOpacity style={chatStyles.sendButton} onPressIn={startRecording} onPressOut={stopRecording}>
              <FontAwesome name="microphone" style={{color:'#FFF'}} size={20} />
              </TouchableOpacity>
          }
        </View>
      </View>
    
    </KeyboardAvoidingView>
  );
};

const chatStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderRightWidth:1,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    marginLeft:-7,
  },
  sendButton:{
    width:50,
    height:50,
    backgroundColor:'#24CC63',
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center'
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
  enteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    width: '100%',
    height: 214,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 0, // Position the modal at the bottom of the screen
    left: 0,
    right: 0,
    overflow:'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  logoutText: {
    color: '#000',
    fontFamily: 'PT Sans', 
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  horizontalLine: {
    width: 370,
    height: 1,
    backgroundColor: 'rgba(152, 152, 152, 0.27)',
    marginTop:10,
  },
  Text: {
    color: 'rgba(0, 0, 0, 0.88)',
    fontFamily: 'PT Sans',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  buttonCotainer1:{
    display:'flex',
    flexDirection:'row',
    marginTop:30,
  }
  ,
  button1: {
    width: 160,
    height: 40,
    flex: 0,
    borderRadius: 10,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:20,
  },
  buttonText: {
    color: '#A1A1A1',
   
 
  },
  buttonText1:{
    color:'#F00',
    textAlign: 'center',
    fontFamily: 'PT Sans',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
  }
});

export default ChatScreen;
