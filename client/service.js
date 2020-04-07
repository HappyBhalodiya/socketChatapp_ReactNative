import Config from "./config";
import axios from 'axios';

export default {

  addUser: body => {
    const url = Config.baseurl + "add";
    return axios
    .post(url,body)
    .then(response => {
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

};