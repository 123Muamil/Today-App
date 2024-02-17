import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image ,Dimensions,ImageBackground,SafeAreaView,ScrollView} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import uuid from 'react-native-uuid';
import { getDatabase, ref, set } from "firebase/database";
import app from '../config/firebaseConfig';
import Toast from 'react-native-simple-toast';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
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
        <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent} nestedScrollEnabled={true}>
            <LinearGradient
                colors={['#010510', '#010510']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <ImageBackground source={require('../assets/images/login.png')} style={styles.imageContianer}>
                    <Image source={require('../assets/images/logo.png')} style={styles.logoImage} />
                    <Text style={styles.welcomeText}>Welcome!</Text>
                    <Text style={styles.LOGOText}>LOGO</Text>
                </ImageBackground>
                <View style={styles.authContianer}>
                <Text style={styles.authText}>Name</Text>
                    <View style={styles.inputContainer1}>
                        <Image source={require('../assets/email.png')} style={styles.icon}/>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Name"
                            placeholderTextColor="#757A8D"
                            onChangeText={setEmail}
                            keyboardType='default'
                        />
                    </View>
                    <Text style={styles.authText}>Email Id</Text>
                    <View style={styles.inputContainer1}>
                        <Image source={require('../assets/email.png')} style={styles.icon}/>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Email Address"
                            placeholderTextColor="#757A8D"
                            onChangeText={setEmail}
                            keyboardType='email-address'
                        />
                    </View>
                    <Text style={styles.authText}>Password</Text>
                    <View style={styles.inputContainer}>
                        <Image source={require('../assets/password.png')} style={styles.icon}/>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Password"
                            placeholderTextColor="#757A8D"
                            onChangeText={setPassword}
                            keyboardType="default"
                            secureTextEntry={true}
                        />
                        <Image source={require('../assets/hideshow.png')} style={styles.icon}/>
                    </View>
                  
                    <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
                        <Text style={styles.buttonText}>Sing Up</Text>
                    </TouchableOpacity>
                    <View style={styles.dividerContainer}>
                        <View style={styles.line}></View>
                        <Text style={styles.orText}>Or</Text>
                        <View style={styles.line}></View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.authButton}>
                            <AntDesign name="apple1" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.authButton}>
                            <AntDesign name="google" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.accountContainer}>
                      <Text style={styles.account}>Already have an account?</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                       <Text style={styles.register}>Login</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </ScrollView>
</SafeAreaView>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    scrollViewContent: {
        flexGrow: 1,
      
    },
  imageContianer:{
    width:windowWidth,
   
    resizeMode:'cover',
    justifyContent:'center',
    alignItems:'center',
    opacity: 0.8,
    borderRadius:0,
  },
  logoImage:{
    marginTop:90,
  },
  welcomeText: {
    color: '#FFF',
    fontFamily: 'Geometria',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  LOGOText: {
    position: 'absolute',
    left: 150,
    top: 140,
    color: '#D0D9F9',
    textAlign: 'center',
    fontFamily: 'Geometria',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500', 
},
authContianer:{
  width:windowWidth,
  backgroundColor:'#050B1A',
  borderTopRightRadius:40,
  borderTopLeftRadius:40,
  borderWidth:1,
  position: 'relative',
  borderColor:'#434978',
   padding:20,
},
authText: {
  color: '#D0D9F9',
  fontFamily: 'Geometria',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: 20, 
   marginTop:10,
},
inputContainer1: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  borderRadius: 48,
  borderWidth: 1,
  borderColor: '#283455',
  backgroundColor: '#0D152B',
  padding:16,
  marginTop:10,
},
inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  borderRadius: 48,
  borderWidth: 1,
  borderColor: '#283455',
  backgroundColor: '#0D152B',
  padding:16,
  marginTop:10,
},
icon: {
  marginRight: 8,
},
input: {
  flex: 1,
  color: 'white',
  fontSize: 16,
 
},
forgotContainer:{
   alignItems:'flex-end',
   marginTop:10,
}
,
forgotPasswordText: {
  color: '#FFF',
  fontFamily: 'Geometria',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: 20,
  textDecorationLine: 'underline',
},
loginButton: {
  padding: 16,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 32,
  backgroundColor: '#474DEF',
  marginTop:30,
},
buttonText: {
  color: '#FFF',
  fontFamily: 'Geometria', 
  fontSize: 18,
  fontWeight: '700',
  lineHeight: 24,
},
 dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop:20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#757A8D',
    marginHorizontal: 10,
  },
  orText: {
    color: '#757A8D',
    fontFamily: 'Geometria',
    fontSize: 14,
    fontWeight: '400',
    marginHorizontal: 10,
  },
   authButton: {
    display: 'flex',
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#434978',
    backgroundColor: 'rgba(12, 20, 40, 0.40)',
    width:60,
  },
  buttonContainer:{
       flexDirection:'row',
       gap:16,
       justifyContent:'center',
       alignItems:'center',
       marginTop:20,
       marginBottom:30,
  },
   account: {
    color: '#757A8D',
    fontFamily: 'Geometria',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 14,
  },
   register: {
    color: '#FFF',
    fontFamily: 'Geometria',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 14,
    textDecorationLine: 'underline',
  },
  accountContainer:{
     flexDirection:'row',
     gap:5,
     justifyContent:'center',
     alignItems:'center',
     marginBottom:20,
  }
});

export default Signup;
