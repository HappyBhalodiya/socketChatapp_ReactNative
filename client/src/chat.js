import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert

} from "react-native";
import io from "socket.io-client";
import AsyncStorage from '@react-native-community/async-storage';
import Api from "../service";

let array  = []
let value ;
let socket;
let socketId ;
class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: [],
      chats:[]

    };
  }
  componentDidMount = () => {
    socket  = io.connect("http://192.168.43.176:5000")
    let id = this.props.navigation.state.params.id;
    socket.on('connect', function(){
      console.log(socket.id);
      socketId = socket.id;
      console.log("connected=========",)
      socket.emit('join', {id: id});
    });

    // socket.on("message", function(data) {
    //   console.log("=message====", data);

    //   this.setState(prevState =>({
    //     chatMessages: [...prevState.chatMessages, data.msg]
    //   }))
    // });
    // socket.on("chat message", msg => {
      //   console.log("====>>>>>===",msg)
      //   this.setState({ chatMessages : [...this.state.chatMessages, msg]});
      // });

      Api.getchats()
      .then((res) =>{
        this.setState({chats: res})
      })
      .catch(err => {
      });

    }

    submitChatMessage = async() => {
      console.log("submitChatMessage=>>>>>>>>>>>>>>>>>>>",this.state.chatMessage,socketId)
      value = await  AsyncStorage.getItem('userid');

      socket.emit('chat message', {msg: this.state.chatMessage , senderID: value});
      // socket.emit("chat message", array);
      this.setState({ chatMessage: "" });

    }

    render() {


      const chatMessages = this.state.chats.map(chatMessage => {

        if(chatMessage.receiver == this.props.navigation.state.params.id && chatMessage.sender == value){
          console.log("call=====ifff========")
          return (<Text key={chatMessage} style={{ alignSelf: 'flex-end'}}>{chatMessage.message}</Text>)
        }else if(this.props.navigation.state.params.id ==  chatMessage.sender ){
          console.log("call=====elsee========")
          return (<Text key={chatMessage} style={{ alignSelf: 'flex-start'}}>{chatMessage.message}</Text>)
        }
      
      
      }
      );

      // console.log("=============",this.state.chatMessages)
      // const chatMessages = this.state.chatMessages.map(chatMessage => 
      //   <Text key={chatMessage} style={{ alignSelf: 'flex-start'}}>{chatMessage}</Text>
      //   )

      return (
        <View style={styles.container}>
        <View style={{backgroundColor:'yellow',left:0}}>
        <TextInput
        style={{ height: 40, borderWidth: 2 }}
        autoCorrect={false}
        value={this.state.chatMessage}
        onSubmitEditing={() => this.submitChatMessage()}
        onChangeText={chatMessage => {
          this.setState({ chatMessage });
        }}
        />
        </View>
        <View style={{backgroundColor:'pink',flex:1, height:'auto'}}>
        {chatMessages}
        </View>
        </View>
        );
    }
  }

  export default Chat;
  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:'#e7e7e7'
    },
    cardView : {
      elevation :3,
      padding: 10, 
      margin:5, 
      backgroundColor:"#fff"
    }
  })



  // import React, { Component } from "react";
  // import { TextInput, StyleSheet, Text, View } from "react-native";
  // import io from "socket.io-client";

  // let array  = []
  // export default class App extends Component {
    //   constructor(props) {
      //     super(props);
      //     this.state = {
        //       chatMessage: "",
        //       chatMessages: [],

        //     };
        //   }

        //   componentDidMount() {
          //     this.socket = io("http://192.168.43.176:5000");
          //      this.socket.on('connect', function(){
            //       console.log("connected=========")
            //     });
            //     this.socket.on("chat message", msg => {
              //       console.log("=======",msg)
              //       this.setState({ chatMessages: [...this.state.chatMessages, "msg"] });
              //     });
              //   }

              //   submitChatMessage() {
                //     console.log("submitChatMessage=>>>>>>>>>>>>>>>>>>>",this.state.chatMessage)

                //     array.push({
                  //       msg:this.state.chatMessage,
                  //       id :'111'
                  //     })
                  //     this.socket.emit("chat message", array);

                  //     // this.socket.emit("chat message", this.state.chatMessage);
                  //     this.setState({ chatMessage: "" });
                  //   }

                  //   render() {
                    //     const chatMessages = this.state.chatMessages.map(chatMessage => (
                    //       <Text key={chatMessage} >{chatMessage}</Text>
                    //     ));

                    //     return (
                    //       <View style={styles.container}>
                    //       <View style={{backgroundColor:'yellow',left:0}}>
                    //         <TextInput
                    //           style={{ height: 40, borderWidth: 2 }}
                    //           autoCorrect={false}
                    //           value={this.state.chatMessage}
                    //           onSubmitEditing={() => this.submitChatMessage()}
                    //           onChangeText={chatMessage => {
                      //             this.setState({ chatMessage });
                      //           }}
                      //         />
                      //         </View>
                      //         <View style={{backgroundColor:'pink',right:0,alignItem:'flex-end'}}>
                      //         {chatMessages}
                      //         </View>
                      //       </View>
                      //     );
                      //   }
                      // }

                      // const styles = StyleSheet.create({
                        //   container: {
                          //     flex: 1,
                          //     backgroundColor: "#F5FCFF"
                          //   }
                          // });
