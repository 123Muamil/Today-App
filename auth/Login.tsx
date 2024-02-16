// Import necessary dependencies
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image ,Dimensions,ImageBackground} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../config/firebaseConfig';
import Toast from 'react-native-simple-toast';
import { UseDispatch, useDispatch } from 'react-redux';
import { setUser } from '../redux/reducer/user';
import Auth from '../service/Auth';
const Login = ({ navigation }:any) => {
    // Initialize Firebase Realtime Database
const db = getDatabase(app);
// Initialize Firebase Authentication
const auth = getAuth(app);
const dispatch=useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 
    
  // Function for handling login
 const handleLogin =async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User successfully logged in
        const user = userCredential.user;
        console.log('User logged in:', user.uid);
      
        // Fetch user data from the database
        fetchUserData(user.uid);
      
      })
      .catch((error) => {
        // An error occurred during login
        console.error('Error logging in:', error.message);
      });
  };
  
  // Function to fetch user data from the database
  const fetchUserData = async (userId:string) => {
    const userRef = await ref(db, 'users/' + userId);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      console.log('User data:', userData);
       dispatch(setUser(userData))
        Auth.setAccount(userData)
        Toast.show('User Logged In Successfully',2000);
        navigation.navigate('Tab')
    });
  };
    return (
        <View style={styles.container}>
              <Image style={styles.image} source={require('../assets/images/auth.jpg')}/>
            <View style={styles.inputContainer}>
          
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.loginButton}  onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity
                 style={styles.loginButton}
                onPress={() => navigation.navigate('Signup')}
            >
                <Text style={styles.buttonText}> Sign Up</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
     
      
    },
    inputContainer: {
       paddingHorizontal:10,
    },
    input: {
        width:"100%",
        padding: 10,
        height: 40,
        margin: 12,
          borderWidth:1,
          borderRadius:10,
          borderColor:'green'
    },
    signupText: {
        marginTop: 20,
    },
    loginButton:{
        width:"100%",
        padding: 10,
        height: 40,
        margin: 12,
          borderWidth:1,
          borderRadius:10,
          textAlign:'center',
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:'green',
          borderColor:'#FFF'
      },
      buttonText:{
           
color:"#FFF"
      },
      image:{
          
           width:windowWidth,
            height:200,
      }
});
export default Login;
