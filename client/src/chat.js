import React from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity

} from "react-native";



class Chat extends React.Component {
  
  componentDidMount = () => {
   console.log("idd in chat app=====", this.props.navigation.state.params.id)
  }
  render() {
    return (
      <View style={styles.container}>
      <Text>hiiiii</Text>
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