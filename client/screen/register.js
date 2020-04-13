import React, { useState, useEffect } from 'react'
import { View,Text, TouchableOpacity, StyleSheet, ScrollView , TextInput} from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../service'
import Toast from "react-native-simple-toast";
function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

 const AddData =() => {
    
     let body = {
         email: email,
         password: password,
         username: username
     }
    Api.addUser(body)
      .then((res) =>{
        Toast.show("successfully Data added.");
        navigation.navigate('Login')
        setUsername('');
        setEmail('');
        setPassword('');
         
      })
      .catch(err => {
          console.log("errr=====",err)
      });
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
        <Text
        style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Registration
        </Text>
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
        <Icon name={"email-outline"} size={20} color="#606060" style={{ margin: 10 }} />

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
  }
});
