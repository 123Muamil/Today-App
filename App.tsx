import React,{useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Matches, Messages, Profile } from "./screens";
import { PRIMARY_COLOR, DARK_GRAY, BLACK, WHITE } from "./assets/styles";
import TabBarIcon from "./components/TabBarIcon";
import ChatScreen from "./screens/ChatScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import app from "./config/firebaseConfig";
import { getFirestore,collection, getDocs } from 'firebase/firestore';
import Login from "./auth/Login";
import Signup from "./auth/Signup";
const db = getFirestore(app);
const App:React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'pakistan'));
      console.warn(querySnapshot)
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        
      });
    };

    fetchData();
  }, []);
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Tab"
        options={{ headerShown: false,}}
      >
        {() => (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused }) => {
                let iconName;
                if (route.name === "Explore") {
                  iconName = "search";
                } else if (route.name === "Matches") {
                  iconName = "heart";
                } else if (route.name === "Chat") {
                  iconName = "chatbubble";
                } else if (route.name === "Profile") {
                  iconName = "person";
                }
                return (
                  <TabBarIcon
                    focused={focused}
                    iconName={iconName || ""} // Provide a default value if necessary
                  />
                );
              },
              tabBarStyle: {
                backgroundColor: WHITE,
                borderTopWidth: 0,
                marginBottom: 0,
                shadowOpacity: 0.05,
                shadowRadius: 10,
                shadowColor: BLACK,
                shadowOffset: { height: 0, width: 0 },
              },
              tabBarActiveTintColor: PRIMARY_COLOR,
              tabBarInactiveTintColor: DARK_GRAY,
              tabBarShowLabel: false,
            })}
          >
            <Tab.Screen name="Explore" component={Home} />
            <Tab.Screen name="Matches" component={Matches} />
            <Tab.Screen name="Chat" component={Messages} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        )}
      </Stack.Screen>

    
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Signup" component={Signup}/>
    </Stack.Navigator>
    </NavigationContainer>

  )
}

export default App

