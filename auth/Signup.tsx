import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image ,Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import uuid from 'react-native-uuid';
import { getDatabase, ref, set } from "firebase/database";
import app from '../config/firebaseConfig';
import Toast from 'react-native-simple-toast';
const Signup = ({ navigation }:any) => {
    const auth = getAuth();
    const database=getDatabase(app)
    const userId = uuid.v4();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name,setName]=useState('');
   
    const handleSignup =async () => {
       
       await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setName('')
          setEmail('')
          setPassword('')
          if(user)
          {
            const data={
                uid:user.uid,
                email: user.email,
                displayName: name, 
            }
            set(ref(database, `users/${user.uid}`), data)
          .then(() => {
            Toast.show('Registered Successfully',2000);
            navigation.navigate('Login')
          })
          .catch((error) => {
            console.error('Error storing user data:', error.message);
          });
          }
      
        })
        .catch((error:any) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
          Toast.show('Error While Registration',2000);
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
