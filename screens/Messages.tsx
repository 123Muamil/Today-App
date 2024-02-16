import React,{useEffect, useState} from "react";
import { Text, TouchableOpacity, ImageBackground, View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation from react-navigation
import { Icon, Message } from "../components";
import DEMO from "../assets/data/demo";
import styles, { DARK_GRAY } from "../assets/styles";
import { getDatabase, ref, child, get,update,onValue } from "firebase/database";
import { DataT } from "../types";
import app from "../config/firebaseConfig";
import uuid from 'react-native-uuid';
import { useSelector } from "react-redux";

const Messages:React.FC = () => {
  const navigation = useNavigation<any>();
  const [users, setUsers] = useState<DataT[] | undefined>(undefined);
  const { userData} = useSelector((state:any) => state.User);
  const Database=getDatabase(app)
  const roomId = uuid.v4();
  // console.log("The Current user data is:",userData)

useEffect(() => {
 getAllUsers()
//  getChatlist()
}, [])
const getAllUsers = async () => {
  const dbRef = ref(getDatabase(app));
  get(child(dbRef, `users/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const usersArray: DataT[] = Object.keys(snapshot.val()).map((userId) => ({
          id: userId,
          ...snapshot.val()[userId]
        }));
        const updatedData=usersArray.filter(item=>item.id!==userData.uid)
        setUsers(updatedData);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

// const createChatList = (data:any, userData:any) => {
//     // console.log("The data is:",data)
//     // console.log("The id1 is:",userData.uid)
//   const chatlistRef = ref(Database, `/chatlist/${userData.uid}/${data.uid}`);

// get(chatlistRef)
//       .then(snapshot => {
//           // console.log('User data: ', snapshot.val());
//           if (snapshot.val() === null) {
             
//               let myData = {
//                   roomId,
//                   id: userData.uid,
//                   displayName: userData.displayName,
//                   // img: userData.img,
//                   email: userData.email,
//                   // about: userData.about,
//                   lastMsg: '',
//               };
//               const receiverChatlistRef = ref(Database, `/chatlist/${data.uid}/${userData.uid}`);
//               update(receiverChatlistRef, myData)
//                   .then(() => console.log('Data updated.'));
//               data.lastMsg = 'this is data message';
//               data.roomId = roomId;
//               update(chatlistRef, data)
//                   .then(() => {
//                       console.log('Data updated.');
//                       // Navigation.navigate('SingleChat', { receiverData: data });
//                       navigation.navigate("ChatScreen", { match: data}); 
                      
//                   })
//                   .catch(error => {
//                       console.error('Error updating data:', error);
//                   });
//           } else {
//               // Navigation.navigate('SingleChat', { receiverData: snapshot.val() });
//               console.log("The value is:",snapshot.val())
//               navigation.navigate("ChatScreen", { match: snapshot.val() }); 
//           }
//       })
//       .catch(error => {
//           console.error('Error retrieving chatlist data:', error);
//       });
// };
// const getChatlist = async () => {
//   const userRef = ref(Database, '/chatlist/'+userData?.uid);
//   const onDataChange = (snapshot:any) => {
//     const usersArray: DataT[] = Object.keys(snapshot.val()).map((userId) => ({
//       id: userId,
//       ...snapshot.val()[userId]
//     }));
//     setUsers(usersArray);
//   };
//   onValue(userRef, onDataChange);
// }
  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerMessages}>
        <View style={styles.top}>
          <Text style={styles.title}>Messages</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={users}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
            onPress={() => {
              navigation.navigate("ChatScreen", { match: item }); 
            }}
            >
              <Message
                image={item.image}
                name={item.displayName}
                lastMessage={item.message}
              />
            </TouchableOpacity>
          )}
          ListEmptyComponent={()=>(
            <View>
              <Text>No User is Available</Text>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default Messages;
