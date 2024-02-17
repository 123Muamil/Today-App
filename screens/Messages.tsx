import React,{useEffect, useState} from "react";
import { Text, TouchableOpacity, View, FlatList,SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import { Icon, Message } from "../components";
import styles, { DARK_GRAY } from "../assets/styles";
import { getDatabase, ref, child, get} from "firebase/database";
import { DataT } from "../types";
import app from "../config/firebaseConfig";
import { useSelector } from "react-redux";

const Messages:React.FC = () => {
  const navigation = useNavigation<any>();
  const [users, setUsers] = useState<DataT[] | undefined>(undefined);
  const { userData} = useSelector((state:any) => state.User);
  // console.log("The Current user data is:",userData)

useEffect(() => {
 getAllUsers()
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
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.containerMessages}>
        <View style={styles.top}>
        <TouchableOpacity>
              <Text style={styles.topIconLeft}>Chat</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.circle}>
            <Icon name="ellipsis-vertical" color={'#FFFFFF'} size={20} />
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
    </SafeAreaView>
  );
};

export default Messages;
