// Import necessary dependencies
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image ,Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const Signup = ({ navigation }:any) => {
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name,setName]=useState('');
    const handleSignup =async () => {
       await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log("Signup Successfully")
          if(user)
          {
                navigation.navigate('Login')
          }
        //   console.warn("Signup Successfully")
          // ...
        })
        .catch((error:any) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("The error is:",errorCode)
          // ..
        });
    };

    return (
        <View style={styles.container}>
              <Image style={styles.image} source={require('../assets/images/auth.jpg')}/>
            <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                keyboardType="default"
                autoCapitalize="none"
            />
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
            <TouchableOpacity style={styles.loginButton}  onPress={handleSignup}>
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
            <Text style={styles.signupText}>Already have an account?</Text>
            <TouchableOpacity
                 style={styles.loginButton}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.buttonText}>Login</Text>
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
export default Signup;
