import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-community/async-storage';
import Api from "../service";
import Config from "../config";

let userid;
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
    userid = await AsyncStorage.getItem('userid');
    Api.getAllUser()
      .then((res) => {
        setAllUSer(res)
      })
      .catch(err => {
      });
  }
  const allusers = allUSer.map((res, index) => {
    if (res._id != userid) {
      return (

        <TouchableOpacity style={styles.cardView} onPress={() => navigation.navigate('Chat', { userclickid: res._id, userclickname: res.username, userclickimg: Config.mediaurl + res.path })}>
          <View style={{ flexDirection: 'column', flex: 2 }}>
            <Image style={styles.img} source={{ uri: Config.mediaurl + res.path }} />
          </View>
          <View style={{ flexDirection: 'column', flex: 11 }}>
            <Text style={styles.username}>{res.username}</Text>
          </View>
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
  container: {
    flex: 1,
    backgroundColor: '#e7e7e7'
  },
  cardView: {
    elevation: 3,
    padding: 5,
    margin: 5,
    backgroundColor: "#fff",
    flexDirection: 'row'
  },
  img: {
    height: 35,
    width: 35,
    borderRadius: 50,
    alignItems: 'center',
    borderColor: '#e7e7e7',
    borderBottomWidth: 5
  },
  username: {
    fontSize: 18,
    alignItems: 'center',
  }
})