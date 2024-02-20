import React from "react";
import { FlatList, View, StyleSheet, Text, Image, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { Video, ResizeMode } from 'expo-av';
import AudioSlider from "../audio/AudioSlider";
const screenWidth=Dimensions.get('window');
const ChatContainer = ({ messages }: any) => {
  const { userData } = useSelector((state: any) => state.User);
  const currentUserId = userData.uid;
  const video = React.useRef(null) as any;
  const [status, setStatus] = React.useState({}) as any;

  const renderItem = ({ item }: any) => {
    const isCurrentUser = item.message.sender === currentUserId;
    const messageAlignment = isCurrentUser ? 'flex-end' : 'flex-start';
    const backgroundColor = isCurrentUser ? '#1B1E43' : '#1B1E43';
    
    return (
      <View style={[styles.messageContainer, { alignSelf: messageAlignment }]}>
        <View style={[styles.messageBubble, { backgroundColor }]}>
          {item.message.msg !== '' && (
            <Text style={styles.message}>{item.message.msg}</Text>
          )}
          {item.message.image !== '' && (
            <View style={styles.imageContainer}>
              <Image source={{uri:item.message.image}} style={styles.image} />
            </View>
          )}
          {item.message.video !== '' && (
            <Video
              ref={video}
              source={{ uri: item.message.video }}
              useNativeControls
              resizeMode={ResizeMode.COVER}
              isLooping
              onPlaybackStatusUpdate={setStatus}
              style={styles.video}
            />
          )}
          {item.message.audio !== '' && (
            <View style={styles.audioContainer}>
              <AudioSlider audio={item.message.audio} />
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
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  messageContainer: {
    marginVertical: 5,
    maxWidth: '80%',
    flexDirection: 'row',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: '#2A2F5C',
    maxWidth: '80%',
  },
  message: {
    color: '#FFF',
    fontFamily: 'Geometria',
    fontSize: 14,
    fontWeight: '500',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 5,
  
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 28,
    objectFit:'cover',
  },
  video: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 5,
  },
  audioContainer: {
   
   
    
    width: 250,
  
  },
});

export default ChatContainer;
