import React from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity

} from "react-native";
import Api from "../service";
import AsyncStorage from '@react-native-community/async-storage';

let value;
class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      allUser: [],

    };
  }
  componentDidMount = async() => {
    value = await  AsyncStorage.getItem('userid');

    Api.getAllUser()
    .then((res) =>{
      this.setState({allUser: res})
    })
    .catch(err => {
    });
  }
  render() {
    const { navigate } = this.props.navigation;


    const allusers = this.state.allUser.map((res,index) => {
      if(res._id != value){
        return (

          <TouchableOpacity  style={styles.cardView} onPress={() => navigate("Chat",{id:res._id})}>
          <Text>{res.username}</Text>
          </TouchableOpacity>
          )
      }
    })

    return (
      <View style={styles.container}>
      {allusers}
      </View>
      );
  }
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
