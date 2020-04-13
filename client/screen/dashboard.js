import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity,Text, StyleSheet, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-community/async-storage';
import Api from "../service";

let userid ;
function Dashboard({ navigation }) {

    const [allUSer, setAllUSer] = useState([])
    const useMountEffect = (fun) => useEffect(fun, [])
     /**
   * call first time when screen render
   */
   useMountEffect(() => {
       datarenderfunction()
   })
   datarenderfunction = async () => {
       userid = await  AsyncStorage.getItem('userid');
       Api.getAllUser()
       .then((res) =>{
           setAllUSer(res)
       })
       .catch(err => {
       });
   }
    const allusers = allUSer.map((res,index) => {
      if(res._id != userid){
        return (

          <TouchableOpacity  style={styles.cardView} onPress={() => navigation.navigate('Chat', { userclickid: res._id, userclickname: res.username})}>
          <Text>{res.username}</Text>
          </TouchableOpacity>
          )
      }
    })

   
   return (
      <View style={styles.container}>
      {allusers}
      </View>
       )
}
export default Dashboard;
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