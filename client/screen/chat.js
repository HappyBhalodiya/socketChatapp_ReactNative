import React, { useState, useEffect, useRef } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Image, TextInput, ImageBackground } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-community/async-storage';
import Api from "../service";
import Config from "../config";
import RBSheet from "react-native-raw-bottom-sheet";
import io from "socket.io-client";
import ImagePicker from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import RNFetchBlob from 'react-native-fetch-blob';

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
  const refRBSheet = useRef();
  const [profilePhoto, setProfilePhoto] = useState('')
  const [profilePhotoName, setProfilePhotoName] = useState('')

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
    setChatMessage('')
    datarenderfunction()
  }
const uploadFile = async(imageName,imageuri) =>{
  value = await AsyncStorage.getItem('userid');
  console.log("upload file hear");
   const url = Config.baseurl + "sendFile";

      console.log("call else", url)
      RNFetchBlob.fetch('POST', url, {
        'Content-Type': 'multipart/form-data',
      },
        [
          {
            name: 'sender',
            data: value
          },
          {
            name: 'receiver',
            data:  route.params.userclickid
          },
          {
            name: 'sendfile',
            filename: imageName,
            data: RNFetchBlob.wrap(imageuri)
          },

        ]).then((res) => {

          var resp = JSON.parse(res.data);
          console.log("yessss   uploaded", resp);
          submitChatMessage()
        })
        .catch((err) => {
          console.log(err);
        })
}

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, async(response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        
        console.log("response.uri========",response.fileName)
      await  setProfilePhoto(response.uri)
       await setProfilePhotoName(response.fileName)
       await uploadFile(response.fileName,response.uri)
      }
    });
  }

  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        setProfilePhoto(response.uri)
        setProfilePhotoName(response.fileName)
      }
    });

  }

  const chatMessages = chats.map(chatMessage => {
    theDate = new Date(Date.parse(chatMessage.createdAt));
    theDate.toLocaleTimeString()
    if (chatMessage.receiver == route.params.userclickid && chatMessage.sender == value) {
      console.log("==============", chatMessage.status)
      if(chatMessage.sendfile){
         return (
        <View style={{flexDirection:'row',alignSelf: 'flex-end'}}>
        <View style={styles.sendermsg}>      
        <Image key={chatMessage} source={{uri:Config.mediaurl + chatMessage.path}} style={{width:100, height:100}}/>
        <View style={{flexDirection:'row'}}>
        <View style={{alignSelf:'flex-start', flexDirection:'column'}}> 
        <Text key={chatMessage} style={styles.sendertime}>{theDate.toLocaleTimeString().split(':')[0] + ":" + theDate.toLocaleTimeString().split(':')[1]}</Text>
        </View>
        <View style={{alignSelf:'flex-end',flexDirection:'column',marginLeft:'auto'}}>
        <Icon name={"done-all"} 
        size={18}
        color= {chatMessage.status == false ? "#95AD89" : "#46B6DB" }
        />
        </View>
        </View>
        </View>
        <Image style={styles.img} source={{ uri: Config.mediaurl + profilepic }} />
        </View>
        )
      }else{
      return (
        <View style={{flexDirection:'row',alignSelf: 'flex-end'}}>
        <View style={styles.sendermsg}>      
        <Text key={chatMessage} style={{ marginRight: 50, fontSize:16 }}>{chatMessage.message}</Text>
        <View style={{flexDirection:'row'}}>
        <View style={{alignSelf:'flex-start', flexDirection:'column'}}> 
        <Text key={chatMessage} style={styles.sendertime}>{theDate.toLocaleTimeString().split(':')[0] + ":" + theDate.toLocaleTimeString().split(':')[1]}</Text>
        </View>
        <View style={{alignSelf:'flex-end',flexDirection:'column',marginLeft:'auto'}}>
        <Icon name={"done-all"} 
        size={18}
        color= {chatMessage.status == false ? "#95AD89" : "#46B6DB" }
        />
        </View>
        </View>
        </View>
        <Image style={styles.img} source={{ uri: Config.mediaurl + profilepic }} />
        </View>
        )
    }
    } else if (route.params.userclickid == chatMessage.sender && (chatMessage.sender == value || chatMessage.receiver == value)) {
      if(chatMessage.path){
        return (
        <View style={{flexDirection:'row',alignSelf: 'flex-start'}}>
        <Image style={styles.img} source={{ uri: route.params.userclickimg }} />
        <View style={styles.receivermsg}>
       
      <Image key={chatMessage} source={{uri:Config.mediaurl + chatMessage.path}} style={{width:100, height:100}}/>
        <Text key={chatMessage}  style={styles.receivertime}>{theDate.toLocaleTimeString().split(':')[0] + ":" + theDate.toLocaleTimeString().split(':')[1]}</Text>
        </View>
        </View>
        )
      }
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
    <Header style={{ backgroundColor: '#255E55', height: 50 ,padding:5}}>
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
    source={require('../assets/bg.jpg')}>

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
    <TouchableOpacity style={styles.btnSend} onPress={() => refRBSheet.current.open()} >

    <Icon
    name="attach-file"
    size={25}
    color="white"    
    />
    </TouchableOpacity>
    <TouchableOpacity style={styles.btnSend} onPress={() => submitChatMessage()}>

    <Icon
    name="send"
    size={25}
    color="white"    
    />
    </TouchableOpacity>

    </View>

    <View>
    <RBSheet
    ref={refRBSheet}
    height={200}
    duration={50}
    closeOnDragDown={true}
    customStyles={{
      container: {
        justifyContent: "center",
        alignItems: "center",
      }
    }}
    >
    <View style={{flexDirection:'row'}}>
    <TouchableOpacity
    style={[styles.bottomBtn, {backgroundColor:'purple'}]}
    onPress={ () => launchImageLibrary()} >
    <Icon
    name="insert-photo"
    size={45}
    color="white"    
    />
    </TouchableOpacity>
    <TouchableOpacity 
    style={[styles.bottomBtn, {backgroundColor:'orange'}]}
    onPress={ () => launchCamera()} >

    <Icon
    name="photo-camera"
    size={45}
    color="white"    
    />
    </TouchableOpacity>
    <TouchableOpacity style={[styles.bottomBtn, {backgroundColor:'blue'}]}>

    <Icon
    name="insert-drive-file"
    size={45}
    color="white"    
    />
    </TouchableOpacity>
    </View>
    </RBSheet>  
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
    margin:5
  },
  sendermsg: {
    margin: 5,
    elevation: 5,
    padding: 10,
    backgroundColor: '#E0F6C7',
    borderRadius:5,
    flexDirection: 'column',
    alignSelf: 'flex-end',
    maxWidth: '75%',
    position:'relative'
  },
  receivermsg: {
    margin: 5,
    elevation: 5,
    padding: 10,
    borderRadius:5,
    backgroundColor: '#eeeeee',
    flexDirection: 'column',
    alignSelf: 'flex-start',
    maxWidth: '75%',
    position:'relative'
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
    fontSize:12,
    alignItems:'center',
    justifyContent:'center',
    // position:'absolute',
    // bottom:0,
    // right:10
  },
  sendertime:{
    fontSize:12,
    color:'#859B74',
    alignItems:'center',
    justifyContent:'center',
    // position:'absolute',
    // bottom:0,
    // right:30
  },
  status:{
    position:'absolute',
    bottom:0,
    right:5
  },
  bottomBtn:{
    flexDirection:'column',
    width: 70,
    height: 70,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
    margin:5
  }


})

