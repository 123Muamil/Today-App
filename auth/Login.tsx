// Import necessary dependencies
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image ,Dimensions,ImageBackground} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import {getAuth, signInWithEmailAndPassword } from "firebase/auth";
const Login = ({ navigation }:any) => {
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin =async () => {
       await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            if(user)
            {
                 console.warn("Login Successfully")
                 navigation.navigate('Tab')
            }
            // ...
          })
          .catch((error:any) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.warn("Error while login",errorCode)
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
