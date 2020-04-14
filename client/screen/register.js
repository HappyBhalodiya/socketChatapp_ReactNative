import React, { useState, useEffect } from 'react'
import { View,Text, TouchableOpacity, StyleSheet, ScrollView ,Image, TextInput} from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../service'
import Toast from "react-native-simple-toast";
import ImagePicker from 'react-native-image-picker';
import Config from "../config";
import RNFetchBlob from 'react-native-fetch-blob';


function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [profilePhoto , setProfilePhoto] = useState(null)
  const [profilePhotoName, setProfilePhotoName] = useState('')
  const options = {
    allowsEditing: true,
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: '',
    },
  };
  const AddData =() => {

    let body = {
      email: email,
      password: password,
      username: username
    }
    if(profilePhoto == null) {
      console.log("profilePhoto call if",profilePhoto)
      Api.addUser(body)
      .then((res) =>{
        console.log("=======res====",res)
        Toast.show("successfully Data added.");
        navigation.navigate('Login')
        setUsername('');
        setEmail('');
        setPassword('');

      })
      .catch(err => {
        console.log("errr=====",err)
      });
    }else{
      const url = Config.baseurl + "add";

      console.log("call else", url)
      RNFetchBlob.fetch('POST', url, {
        'Content-Type' : 'multipart/form-data',
      },
      [
      {
        name : 'email',
        data: email
      },
      {
        name : 'password',
        data: password
      },
      {
        name : 'username',
        data: username
      },
      {
        name : 'profileimage',
        filename :profilePhotoName,
        data: RNFetchBlob.wrap(profilePhoto)
      },

      ]).then((res) => {

        var resp = JSON.parse(res.data);
        console.log("yessss   uploaded",resp);
        Toast.show("successfully Data added.");
        navigation.navigate('Login')
        setUsername('');
        setEmail('');
        setPassword('');

      })
      .catch((err) => {
        console.log(err);
      })
    }
  }
  
  
  const pickImage = () => {
    console.log("call pickimage")
    ImagePicker.launchImageLibrary(options, (response) => {


      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } 
      else {
        const source = { uri: response.uri }
        setProfilePhoto(response.uri)
        setProfilePhotoName(response.fileName)
      }
    });
  };
  const profilepicFun = () => {
    if(profilePhoto == null) {
      return(
        <View>
        <Image style={styles.img} source={require('../assets/userpic.jpg')} />
        <TouchableOpacity style={[styles.buttonContainer,styles.ChoosePhotoButton]} onPress={() => pickImage()}>
        <Text style={styles.ChoosePhotoText}>Choose Photo</Text>
        </TouchableOpacity>
        </View> 
        )
    }

    else{
      return(
        <View>
        <Image style={styles.img} source={{uri: profilePhoto}} />
        <TouchableOpacity style={[styles.buttonContainer,styles.ChoosePhotoButton]} onPress={() => pickImage()}>
        <Text style={styles.ChoosePhotoText}>Choose Photo</Text>
        </TouchableOpacity>
        </View> 
        )
    }
  }

  return (
    <View style={{ flex: 1 }}>
    <View
    style={{
      flexDirection: "column",
      flex: 4
    }}
    />
    <View
    style={{
      flexDirection: "column",
      flex: 7,
      justifyContent: "center",
      alignItems: "center"
    }}
    >

    <View style={styles.profilePic}>
    {profilepicFun()}
    
    </View>

    <View style={styles.inputContainer}>
    <Icon name={"lock-outline"} size={20} color="#606060" style={{ margin: 10 }} />
    <TextInput
    style={styles.inputs}
    placeholder="username"
    underlineColorAndroid="transparent"
    onChangeText={text => setUsername(text)}
    />
    </View>
    <View style={styles.inputContainer}>
    <Icon name={"email"} size={20} color="#606060" style={{ margin: 10 }} />

    <TextInput
    style={styles.inputs}
    placeholder="Email"
    keyboardType="email-address"
    underlineColorAndroid="transparent"
    onChangeText={text => setEmail(text)}
    />
    </View>

    <View style={styles.inputContainer}>
    <Icon name={"lock-outline"} size={20} color="#606060" style={{ margin: 10 }} />
    <TextInput
    style={styles.inputs}
    placeholder="Password"
    secureTextEntry={true}
    underlineColorAndroid="transparent"
    onChangeText={text => setPassword(text)}
    />
    </View>

    <View style={styles.inputContainer1}>
    <TouchableOpacity
    style={[styles.buttonContainer, styles.loginButton]}
    onPress={() => AddData()}
    >
    <Text style={styles.signUpText}>Register</Text>
    </TouchableOpacity>
    </View>

    <View style={styles.inputContainer1}>
    <Text
    style={{ fontWeight: "bold", fontSize: 15, color: "silver" }}
    >

    Already have an account.
    </Text>
    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
    Log in
    </Text>
    </TouchableOpacity>
    </View>

    </View>
    <View
    style={{
      flexDirection: "column",
      flex: 4
    }}
    />
    </View>

    );
}

export default Register;
const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: "#000"
  },

  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#e7e7e7",

    width: 280,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
  },
  inputContainer1: {
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 150,

  },
  loginButton: {
    backgroundColor: "#372e5f"
  },
  signupButton: {
    backgroundColor: "#372e5f",
    marginLeft: 10
  },
  signUpText: {
    color: "white"
  },
  text: {
    fontSize: 20,
    color: "white",
    justifyContent: "center",
    marginTop: 40
  },
  profilePic:{
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  img: {
    height: 170,
    width: 170,
    borderRadius: 100,
    alignItems: 'center',
    borderColor: '#e7e7e7',
    borderBottomWidth:5
  },
  ChoosePhotoText: {
    color: 'white'
  },
  ChoosePhotoButton: {
    backgroundColor: "#372e5f",
    justifyContent:'center',
    alignItems:'center'
  },
});
