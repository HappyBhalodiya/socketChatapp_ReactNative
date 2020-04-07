
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import Toast from "react-native-simple-toast";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Api from "../service";
import AsyncStorage from '@react-native-community/async-storage';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
    };
  }
  AddData =(body) => {
    console.log("call", body)
    Api.addUser(body)
      .then((res) =>{
        Toast.show("successfully Data added.");
        this.props.navigation.navigate("Login");
         
      })
      .catch(err => {
      });
  }

  render() {
    const { navigate } = this.props.navigation;
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
              ref={input => {
                this.password = input;
              }}
              placeholder="username"
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ username: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name={"email-outline"} size={20} color="#606060" style={{ margin: 10 }} />

            <TextInput
              style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ email: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name={"lock-outline"} size={20} color="#606060" style={{ margin: 10 }} />
            <TextInput
              style={styles.inputs}
              ref={input => {
                this.password = input;
              }}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ password: text })}
            />
          </View>

          <View style={styles.inputContainer1}>
            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.AddData(this.state)}
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
            <TouchableOpacity onPress={() => navigate("Login")}>
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
