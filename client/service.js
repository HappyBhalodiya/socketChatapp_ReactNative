import Config from "./config";
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default {

  addUser: body => {

    const url = Config.baseurl + "add";
    console.log("body===", body, url)
    return axios
    .post(url,body)
    .then(response => {
      console.log("+++++++++++++++++++",response)
      return JSON.stringify(response);
    })
    .catch(err => {
      console.log("err====",err);
    });
  },
  login: body => {
    const url = Config.baseurl + "login";
    return  axios.post(url, body)
    .then(response => {
      return response;
    })
    .catch({ status: 500, message: "Internal Serevr Error" });
  },
  getAllUser : () => {
    const url = Config.baseurl + "getUser";
    return  axios.get(url)
    .then(response => {
      let getUsers = response.data.result;
      return getUsers;
    })
    .catch({ status: 500, message: "Internal Serevr Error" });
  },

  getchats : () => {
    const url = Config.baseurl + "chats";
    return  axios.get(url)
    .then(response => {
      
      return response.data;
    })
    .catch({ status: 500, message: "Internal Serevr Error" });
  },

  getuserbyid : (id) => {
    const url = Config.baseurl + "getUserById/" + id;
    return  axios.get(url)
    .then(response => {
      
      return response.data;
    })
    .catch({ status: 500, message: "Internal Serevr Error" });

  },
 updatebyid : async(body) => {
   console.log(body)
 const  userid = await AsyncStorage.getItem('userid');
    const url = Config.baseurl + "updateData/" + userid;
    
    return  axios.put(url,body)
    .then(response => {
      return response.data;
    })
    .catch({ status: 500, message: "Internal Serevr Error" });

  }
  
};