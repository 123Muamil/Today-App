// ChatContainer.js

import React from "react";
import { FlatList, View, StyleSheet,Dimensions ,Text,Image} from "react-native";
import { useSelector } from "react-redux";
import { Video, ResizeMode } from 'expo-av';
import AudioSlider from "../audio/AudioSlider";
const ChatContainer= ({ messages }:any) => {
  // console.log("The message are in:",messages)
  const { userData } = useSelector((state: any) => state.User);
  const currentUserId = userData.uid;
  const video = React.useRef(null) as any;
  const [status, setStatus] = React.useState({}) as any;
  const renderItem = ({ item}:any) => {
    const isCurrentUser = item.message.sender ===  currentUserId; // Update with current user's ID
    const messageAlignment = isCurrentUser ? 'flex-end' : 'flex-start';
    const backgroundColor = isCurrentUser ? '#DCF8C6' : '#FFFFFF';
    const textColor = isCurrentUser ? '#000000' : '#000000';
   
    return (
      <View style={styles.messageContainer}>
        <View style={[styles.messageBubble, { backgroundColor }]}>
        {item.message.msg !== '' && (
            <Text style={{ color: textColor }}>{item.message.msg}</Text>
          )}
          {item.message.image !== '' && (
           <View>
           <Image source={{ uri: item.message.image }} style={{width:'100%',height:200,objectFit:'cover',borderRadius:10}} />
           <Text style={{ fontSize: 12,position:'absolute',bottom:5,right:5 }}>{item.time}</Text>
       </View>
          )}
          {item.message.video !== '' && (
               <Video
               ref={video}
               style={{width:'100%',height:200,borderRadius:10}}
               source={{uri:item.message.video}}
               useNativeControls
               resizeMode={ResizeMode.COVER}
               isLooping
               onPlaybackStatusUpdate={setStatus}
             />
          )}
           {item.message.audio !== '' && (
           <View style={{flex:1,justifyContent:'center',marginTop:15,}}>
        <AudioSlider audio={item.message.audio}/>
    </View>
          )}
        </View>
      </View>
    );
  };
  return (
    <FlatList
      data={messages}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10, // Adjust as needed
  },
  messageContainer: {
    marginVertical: 5,
    flex:1,
    marginHorizontal:10,
    
  },
  messageBubble: {
    borderRadius: 10,
    padding: 10,
    maxWidth: '100%', // Adjust the maximum width as needed
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Set background color to black
  },
  videoContainer: {
    width: Dimensions.get('window').width / 2 + 10,
    height: 150,
    borderRadius: 30,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%', // Set video height as needed
  },
});

export default ChatContainer;
