import React,{useEffect} from "react";
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { Home, Matches, Messages, Profile } from "./screens";
import { PRIMARY_COLOR, DARK_GRAY, BLACK, WHITE } from "./assets/styles";
import TabBarIcon from "./components/TabBarIcon";
import ChatScreen from "./screens/ChatScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import {useDispatch ,useSelector} from 'react-redux';
import Auth from "./service/Auth";
import { setUser } from "./redux/reducer/user";
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
const Index = () => {
  const navigationRef = useNavigationContainerRef(); 
  const currentRoute = navigationRef.getCurrentRoute();
  const theme = useTheme();
theme.colors.secondaryContainer = "transperent"
  // console.log("The current-route is:",route?.name)
    const dispatch=useDispatch()
    const { userData, login } = useSelector((state:any) => state.User);
    console.warn("The user is:",login)
    console.log(login)
    useEffect(() => {
      getUser();
    }, []);
    const getUser=async()=>{
        let data=await Auth.getAccount();
        if(data!=null)
        {
            dispatch(setUser(data))
        }
    }
    return (
    
   <NavigationContainer ref={navigationRef}>
      <Stack.Navigator  initialRouteName={!login?"Login":'Tab'} >
        <Stack.Screen
          name="Tab"
          options={{ headerShown: false,}}
        
        >
          {() => (
            <Tab.Navigator
            theme={{colors:{secondaryContainer:'transparent'}}}
              shifting={true}
              activeColor="#474DEF"
              inactiveColor="#FFFFFF"
              sceneAnimationEnabled={false}
              labeled={false}
              barStyle={{ backgroundColor: '#10172A',

               borderRadius:40,
                marginHorizontal:5,
                marginBottom:10,
                overflow: 'hidden',
                justifyContent:'center',
                alignItems:'center',
                }}
                
              screenOptions={({ route }) => ({
              
                tabBarIcon: ({ focused}) => {
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
                  const tabs = ["Explore", "Matches", "Chat", "Profile"];
                  const isLast = route.name === tabs[tabs.length - 1];
                  return (
                    <TabBarIcon
                      focused={focused}
                      iconName={iconName || ""} // Provide a default value if necessary
                      label={route.name}
                      isLast={isLast}
                    />
                  );
                },
               
              
            
              
          
              })}
             
            >
              
              <Tab.Screen name="Explore" component={Home} options={{tabBarColor:"green"}}/>
              <Tab.Screen name="Matches" component={Matches} />
              <Tab.Screen name="Chat" component={Messages} />
              <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
  
      
        <Stack.Screen name="ChatScreen" component={ChatScreen}  />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false,}}/>
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false,}}/>
      </Stack.Navigator>
      </NavigationContainer>
    
  )
}

export default Index

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    flexDirection: 'row', // Make label and icon horizontally aligned
    alignItems: 'center', // Center label vertically with icon
    marginRight: 8, // Add some space between label and icon (optional)
  },
});