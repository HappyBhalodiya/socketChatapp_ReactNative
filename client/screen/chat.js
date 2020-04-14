import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity,Text, StyleSheet, ScrollView ,Image, TextInput} from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-community/async-storage';
import Api from "../service";
import io from "socket.io-client";

import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
let value ;
let socket;
let theDate;
function Chat({route, navigation }) {

  const [chats, setChats] = useState([])
  const [socketId, setSocketId] = useState('')
  const [chatMessage, setChatMessage] = useState('')



  const useMountEffect = (fun) => useEffect(fun, [])
    /**
  * call first time when screen render
  */
  useMountEffect(() => {

    datarenderfunction()
  })

  datarenderfunction = async () => {

    socket  = io.connect("http://192.168.43.176:5000")
    socket.on('connect', function(){
      console.log(socket.id);
      setSocketId(socket.id);
      console.log("connected=========",)
      socket.emit('join', {id: route.params.userclickid});
    });

    Api.getchats()
    .then((res) =>{
      setChats(res)
      {chatMessages}
    })
    .catch(err => {
    });

  }
  const  submitChatMessage = async() => {
    value = await  AsyncStorage.getItem('userid');

    socket.emit('chat message', {msg: chatMessage , senderID: value});
    // socket.emit("chat message", array);
    setChatMessage('')
    datarenderfunction()
  }


  const chatMessages = chats.map(chatMessage => {


    theDate = new Date( Date.parse(chatMessage.createdAt));
    theDate.toLocaleTimeString()

    if(chatMessage.receiver == route.params.userclickid && chatMessage.sender == value){

      return (
        <View style={styles.sendermsg}>
        <Text key={chatMessage}>{theDate.toLocaleTimeString().split(':')[0] + ":" + theDate.toLocaleTimeString().split(':')[1]}</Text>
        <Text key={chatMessage} style={{ marginLeft:50}}>{chatMessage.message}</Text>
        </View>
        )
    }else if(route.params.userclickid ==  chatMessage.sender && (chatMessage.sender == value || chatMessage.receiver == value)){

      return (
        <View style={styles.receivermsg}>
        <Text key={chatMessage} style={{ marginRight:50}}>{chatMessage.message}</Text>
        <Text key={chatMessage}>{theDate.toLocaleTimeString().split(':')[0] + ":" + theDate.toLocaleTimeString().split(':')[1]}</Text>
        </View>
        )
    }

  }
  );


  return (
    <View style={styles.container}>
    <Header style={{ backgroundColor: '#eeeeee',height:45}}> 
    <TouchableOpacity style={{flexDirection:'column', flex:1}} onPress={() => navigation.navigate('Dashboard')} >
 
    <Icon
        name={"keyboard-backspace"}
        size={30}
        color="#000"
        style={{ marginLeft:8 , marginTop:6}}
        />
    
    </TouchableOpacity>
    <View style={{flexDirection:'column', flex:2}}>
    <Image style={styles.img} source={{uri: route.params.userclickimg}}/>
    </View> 
    <View style={{flexDirection:'column',flex:10}}>
    <Text style={styles.headertext}>{route.params.userclickname}</Text>

    </View>   
    </Header>
    <View style={{flex:6}}>
    <ScrollView>
    <View style={{backgroundColor:'white', flex:1}}>
    {chatMessages}
    </View>
    </ScrollView>
    <View style={styles.footer}>
    <View style={styles.inputContainer}>
    <TextInput
    style={styles.inputs}
    autoCorrect={false}
    value={chatMessage}
    multiline={true}
    onChangeText={chatMessage => {
      setChatMessage(chatMessage);
    }}
    />
    </View>
    <TouchableOpacity style={styles.btnSend}>

    <Icon
    name="send"
    size={25}
    color="white"

    onPress={() => submitChatMessage()}
    />
    </TouchableOpacity>
    </View>

    </View>
    </View>
    )
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
  },
  headertext: {
    fontSize: 20,
    color:'#000',
    marginTop:10
  },
  footer:{
    flexDirection: 'row',
    height:'auto',
    backgroundColor: '#eeeeee',
    paddingHorizontal:10,
    padding:5,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    height:'auto',
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    marginRight:10,
  },
  inputs:{
    height:'auto',
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  btnSend:{
    backgroundColor:"#000",
    width:40,
    height:40,
    borderRadius:360,
    alignItems:'center',
    justifyContent:'center',
  },
  sendermsg:{
    margin:5,
    elevation:5, 
    borderRadius:30, 
    borderBottomWidth: 1,
    borderBottomColor: '#F5FCFF',
    padding: 10,
    backgroundColor:'#eeeeee',
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },
  receivermsg:{
    margin:5,
    elevation:5, 
    borderRadius:30, 
    borderBottomWidth: 1,
    borderBottomColor: '#F5FCFF',
    padding: 10,
    backgroundColor:'#eeeeee',
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
   img: {
    height: 35,
    width: 35,
    borderRadius: 50,
    alignItems: 'center',
    borderColor: '#e7e7e7',
    margin:5
  },

})
