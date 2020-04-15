import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Image, TextInput, ImageBackground } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-community/async-storage';
import Api from "../service";
import Config from "../config";

import io from "socket.io-client";
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
let value;
let socket;
let theDate;
let profilepic;
function Chat({ route, navigation }) {

  const [chats, setChats] = useState([])
  const [socketId, setSocketId] = useState('')
  const [chatMessage, setChatMessage] = useState('')
  const useMountEffect = (fun) => useEffect(fun, [])

  //   useEffect(() => {
    //   const interval = setInterval(() => {

      //     socket = io.connect("http://192.168.43.176:5000")
      //     socket.on('connect', function () {

        //       setSocketId(socket.id);

        //       socket.emit('join', { id: route.params.userclickid });
        //     });

        //     Api.getchats()
        //       .then((res) => {
          //         setChats(res)
          //         { chatMessages }
          //       })
          //       .catch(err => {
            //       });
            //   }, 10000);
            //   return () => clearInterval(interval);
            // }, []);


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
    })
    .catch(err => {
    });
  }

  const submitChatMessage = async () => {
    value = await AsyncStorage.getItem('userid');
    profilepic = await AsyncStorage.getItem('userprofile');


      socket.emit('chat message', { msg: chatMessage, senderID: value});
    
    const chatMessages = chats.length != null ? chats.map(chatMessage => {

      if(chatMessage.receiver == value && chatMessage.sender == route.params.userclickid ){
        console.log("call=============if=====status")
        socket.emit("msgStatus",  {msgid : chatMessage._id, status:true})
      }
      else{
        console.log("call=============else=====status")

        socket.emit("msgStatus",  {msgid : chatMessage._id, status:false})

      }
    }) : null
    // socket.emit("chat message", array);
    setChatMessage('')
    datarenderfunction()
  }


  const chatMessages = chats.map(chatMessage => {


    theDate = new Date(Date.parse(chatMessage.createdAt));
    theDate.toLocaleTimeString()


    if (chatMessage.receiver == route.params.userclickid && chatMessage.sender == value) {
      console.log("==============", chatMessage.status)
      return (
        <View style={{flexDirection:'row',alignSelf: 'flex-end'}}>

        <View style={styles.sendermsg}>
        
        <Text key={chatMessage} style={{ marginRight: 50, fontSize:16 }}>{chatMessage.message}</Text>
        <View style={{flexDirection:'row'}}>
       <View style={{alignSelf:'flex-start', flexDirection:'column', flex:8}}> 
       <Text key={chatMessage} style={styles.sendertime}>{theDate.toLocaleTimeString().split(':')[0] + ":" + theDate.toLocaleTimeString().split(':')[1]}</Text>
       </View>
       <View style={{alignSelf:'flex-end',flexDirection:'column',flex:1}}>
        <Image style={{width:10, height:10}} source={ chatMessage.status == false ? require('../assets/gray.png') : require('../assets/blue.png') } />
       </View>
        </View>
        </View>
        <Image style={styles.img} source={{ uri: Config.mediaurl + profilepic }} />
        </View>
        )
    } else if (route.params.userclickid == chatMessage.sender && (chatMessage.sender == value || chatMessage.receiver == value)) {

      return (
        <View style={{flexDirection:'row',alignSelf: 'flex-start'}}>
        <Image style={styles.img} source={{ uri: route.params.userclickimg }} />
        <View style={styles.receivermsg}>
        
        <Text key={chatMessage} style={{ marginRight: 50, fontSize:16 }}>{chatMessage.message}</Text>
        <Text key={chatMessage}  style={styles.receivertime}>{theDate.toLocaleTimeString().split(':')[0] + ":" + theDate.toLocaleTimeString().split(':')[1]}</Text>
        </View>
        </View>
        )
    }
  }
  );

  return (
    <View style={styles.container}>
    <Header style={{ backgroundColor: '#306E5E', height: 45 }}>
    <TouchableOpacity style={{ flexDirection: 'column', flex: 1 }} onPress={() => navigation.navigate('Dashboard')} >

    <Icon
    name={"keyboard-backspace"}
    size={30}
    color="#fff"
    style={{ marginLeft: 8, marginTop: 6 }}
    />
    </TouchableOpacity>
    <View style={{ flexDirection: 'column', flex: 2 }}>
    <Image style={styles.img} source={{ uri: route.params.userclickimg }} />
    </View>
    <View style={{ flexDirection: 'column', flex: 10 }}>
    <Text style={styles.headertext}>{route.params.userclickname}</Text>

    </View>
    </Header>
    <ImageBackground style={ styles.imgBackground } 
    resizeMode='cover' 
    source={require('../assets/bg.jpeg')}>

    <View style={{ flex: 6 }}>
    <ScrollView>
    <View>
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
    </ImageBackground>
    </View>
    )
}
export default Chat;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardView: {
    elevation: 3,
    padding: 10,
    margin: 5,
    backgroundColor: "#fff"
  },
  headertext: {
    fontSize: 20,
    color: '#fff',
    marginTop: 10
  },
  footer: {
    flexDirection: 'row',
    height: 'auto',

    paddingHorizontal: 10,
    padding: 5,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 'auto',
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  btnSend: {
    backgroundColor: "#306E5E",
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendermsg: {
    margin: 5,
    elevation: 5,
    padding: 10,
    backgroundColor: '#E0F6C7',
    borderRadius:5,
    flexDirection: 'column',
    alignSelf: 'flex-end'
  },
  receivermsg: {
    margin: 5,
    elevation: 5,
    padding: 10,
    borderRadius:5,
    backgroundColor: '#eeeeee',
    flexDirection: 'column',
    alignSelf: 'flex-start'
  },
  img: {
    height: 35,
    width: 35,
    borderRadius: 50,
    alignItems: 'center',
    borderColor: '#e7e7e7',
    margin: 5
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1 ,
  },
  receivertime:{
    color:'#999999',
    fontSize:12
  },
  sendertime:{
    fontSize:12,
    color:'#859B74'
  }


})
