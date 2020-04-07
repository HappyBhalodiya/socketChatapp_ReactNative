

// import React, { Component } from "react";
// import { TextInput, StyleSheet, Text, View } from "react-native";
// import io from "socket.io-client";

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       chatMessage: "",
//       chatMessages: []
//     };
//   }

//   componentDidMount() {
//     this.socket = io("http://192.168.43.176:5000");
//      this.socket.on('connect', function(){
//       console.log("connected=========")
//     });
//     this.socket.on("chat message", msg => {
//       console.log("=======",msg)
//       this.setState({ chatMessages: [...this.state.chatMessages, msg] });
//     });
//   }

//   submitChatMessage() {
//     this.socket.emit("chat message", this.state.chatMessage);
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


import React, {Component} from "react";

import RegisterRoutes from "./src/registerroutes";
import MainRoutes from "./src/mainRouts";

import AsyncStorage from '@react-native-community/async-storage';
export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      value: [],

    };
  }
  componentDidMount= async()=>{
  
    const value = await  AsyncStorage.getItem('userid');
    if (value !== null) {
      console.log("appjs  ==",value);
      this.setState({value: value});       
    }  

  }
  render() {
  console.log(this.state.value == '')
  if(this.state.value == ''){
    return(
      <>
      <RegisterRoutes />
      </>
    )
     
    }else{
      return(
        <>
          <MainRoutes />
        </>
        )
    }
  }
}