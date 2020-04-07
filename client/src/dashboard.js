import React from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity

} from "react-native";
import Api from "../service";


class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      allUser: [],

    };
  }
  componentDidMount = () => {

    Api.getAllUser()
    .then((res) =>{
      this.setState({allUser: res})
    })
    .catch(err => {
    });
  }
  render() {
      const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      {
        this.state.allUser.map((res,index) =>
          <TouchableOpacity  style={styles.cardView} onPress={() => navigate("Chat",{id:res._id})}>
          <Text>{res.username}</Text>
          </TouchableOpacity>
          )
      }
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