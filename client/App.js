
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