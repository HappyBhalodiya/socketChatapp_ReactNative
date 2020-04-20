import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Api from "../service";
import Config from "../config";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';


let userid;
function Profile({ navigation }) {
	const [user, setUser] = useState([])
	const useMountEffect = (fun) => useEffect(fun, [])
	const [profilePhoto, setProfilePhoto] = useState(null)
	const [profilePhotoName, setProfilePhotoName] = useState('')
	const [visible, setVisible] = useState(false)
	const [visibleabout,setVisibleabout] =useState(false)
	const [username, setUsername] = useState('')
	const [about, setAbout] = useState('')

	const options = {
		allowsEditing: true,
		title: 'Select Avatar',
		customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
		storageOptions: {
			skipBackup: true,
			path: '',
		},
	};

	useMountEffect(() => {
		datarenderfunction()
	})
	datarenderfunction = async () => {
		userid = await AsyncStorage.getItem('userid');
		Api.getuserbyid(userid)
		.then((res) => {
			setUser(res)

		})
		.catch(err => {
		});
	}
	const profilepicFun = (filepath) => {

		return (
			<View>
			<Image style={styles.img} source={profilePhoto ? {uri :profilePhoto} : filepath ? {uri : Config.mediaurl + filepath } : require('../assets/userpic.jpg')} />
			<TouchableOpacity style={styles.choosephoto} onPress={() => pickImage()}>
			<Icon
			name="camera-alt"
			size={30}
			color="#fff"
			style={{justifyContent:'center',textAlign:'center'}}
			/>

			</TouchableOpacity>
			</View>
			)
	}
	const pickImage = () => {
		console.log("call pickimage")
		ImagePicker.launchImageLibrary(options, (response) => {


			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			}
			else {
				const source = { uri: response.uri }
				setProfilePhoto(response.uri)
				setProfilePhotoName(response.fileName)
				uploadprofileimage(response.fileName, response.uri)
			}
		});
	};
	const uploadprofileimage = async(fileName, filePath) => {
		userid = await AsyncStorage.getItem('userid');
		const url = Config.baseurl + "updateProfile/" +userid ;

		console.log("call else", url)
		RNFetchBlob.fetch('PUT', url, {
			'Content-Type': 'multipart/form-data',
		},
		[
		{
			name: 'profileimage',
			filename: fileName,
			data: RNFetchBlob.wrap(filePath)
		},

		]).then(async(res) => {

			var resp = JSON.parse(res.data);
			console.log("yessss   uploaded", resp);

			datarenderfunction()
			await AsyncStorage.setItem('userprofile', resp.path)
			const img = await AsyncStorage.getItem('userprofile')
				console.log("img",img)


		})
		.catch((err) => {
			console.log(err);
		})
	}
	const updateData = () => {

		const body = {
			username:username,
			about: about
		}
		
		Api.updatebyid(body)
		.then((res) => {
			console.log("==============,",res)
			setVisible(false)
			setVisibleabout(false)
			datarenderfunction()
		})
		.catch(err => {
		});

	}
	const getUserDetails = user.map((user) => {
		return(

			<View
			style={{
				flexDirection: "column",
				flex:1
			}}>

			<View style={styles.profilePic}>
			{profilepicFun(user.path)}
			</View>
			<View style={styles.mainCard}>
			<View style={{flex:2}}>
			<Icon
			name="person"
			size={30}
			color="#6BB3A7"
			style={{ margin:5 }}
			/>
			</View>
			<View style={{flex:8}}>
			<Text style={styles.mainText}>Name:</Text>
			{
				visible == true ?
				<View>
				<View style={styles.inputContainer}>
				<TextInput
				style={styles.inputs}
				placeholder={user.username}
				underlineColorAndroid="transparent"
				onChangeText={text => setUsername(text)}
				autoFocus={true}
				// value = {user.username}
				/>

				</View> 
				<View style={{alignSelf:'flex-end', flexDirection:'row'}}>
				<TouchableOpacity style={{marginRight:10}} onPress={ () => setVisible(false)}><Text style={styles.dialogbuttontext}>Cancle</Text></TouchableOpacity>
				<TouchableOpacity style={{marginLeft:10}} onPress={ () => updateData()}><Text style={styles.dialogbuttontext}>Save</Text></TouchableOpacity>
				
				</View>
				</View> :

				<View style={{flexDirection:'row'}}>
				<View style={{ flexDirection:'column', flex:9}}>

				<Text style={styles.text}>{user.username}</Text>

				</View>
				<View style={{ flexDirection:'column', flex:1}}>
				<Icon
				name="edit"
				size={20}
				color="#BCC0C3"
				style={{ margin:5 }}
				onPress={ () => setVisible(true)}
				/>

				</View>
				</View>

			}


			</View>
			</View>

			<View style={styles.mainCard}>
			<View style={{flex:2}}>
			<Icon
			name="info"
			size={30}
			color="#6BB3A7"
			style={{ margin:5 }}
			/>
			</View>
			<View style={{flex:8}}>
			<Text style={styles.mainText}>About:</Text>

			{
				visibleabout == true ?
				<View>
				<View style={styles.inputContainer}>
				<TextInput
				style={styles.inputs}
				placeholder={user.about}
				underlineColorAndroid="transparent"
				onChangeText={text => setAbout(text)}
				// value = {user.username}
				/>

				</View> 
				<View style={{alignSelf:'flex-end', flexDirection:'row'}}>
				<TouchableOpacity style={{marginRight:10}} onPress={ () => setVisibleabout(false)}><Text style={styles.dialogbuttontext}>Cancle</Text></TouchableOpacity>
				<TouchableOpacity style={{marginLeft:10}} onPress={ () => updateData(about)}><Text style={styles.dialogbuttontext}>Save</Text></TouchableOpacity>
				</View>
				</View> :

				<View style={{flexDirection:'row'}}>
				<View style={{ flexDirection:'column', flex:9}}>

				<Text style={styles.text}>{user.about}</Text>

				</View>
				<View style={{ flexDirection:'column', flex:1}}>
				<Icon
				name="edit"
				size={20}
				color="#BCC0C3"
				style={{ margin:5 }}
				onPress={ () => setVisibleabout(true)}
				/>

				</View>
				</View>

			}


			</View>
			</View>

			<View style={styles.mainCard}>
			<View style={{flex:2}}>
			<Icon
			name="email"
			size={30}
			color="#6BB3A7"
			style={{ margin:5 }}
			/>
			</View>
			<View style={{flex:8}}>
			<Text style={styles.mainText}>Email:</Text>
			<View style={{flexDirection:'row'}}>
			<View style={{ flexDirection:'column', flex:9}}>
			<Text style={styles.text}>{user.email}</Text>
			</View>
			<View style={{ flexDirection:'column', flex:1}}>
			<Icon
			name="edit"
			size={20}
			color="#BCC0C3"
			style={{ margin:5 }}
			/>
			</View>
			</View>

			</View>
			</View>

			</View>



			)
	})
	return (
		<View style={{ flex: 1 }}>
		<Header style={{ backgroundColor: '#255E55', height: 50 ,padding:5}}>
		<TouchableOpacity style={{ flexDirection: 'column', flex: 1 }} onPress={() => navigation.navigate('Dashboard')} >

		<Icon
		name={"keyboard-backspace"}
		size={30}
		color="#fff"
		style={{ marginLeft: 8, marginTop: 6 }}
		/>
		</TouchableOpacity>
		<View style={{ flexDirection: 'column', flex: 10 }}>
		<Text style={styles.headertext}>Profile</Text>

		</View>
		</Header>
		{getUserDetails}
		</View>

		);
}

export default Profile;
const styles = StyleSheet.create({
	container: {

		flex: 1,
		backgroundColor: "#000"
	},
	buttonContainer: {
		height: 45,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
		width: 150,

	},
	profilePic: {
		alignItems: 'center',
		justifyContent: 'center',

	},
	img: {
		height: 150,
		width: 150,
		borderRadius: 100,
		alignItems: 'center',
		borderColor: '#e7e7e7',
		borderBottomWidth: 5,
		marginTop:15
	},
	
	headertext: {
		fontSize: 20,
		color: '#fff',
		marginTop: 10,
		marginLeft:10
	},
	mainCard:{
		margin:10,
		flexDirection:'row',
		borderBottomWidth:1,
		borderBottomColor:'#e7e7e7'
	},
	mainText:{
		color:'#6F7579',
		fontSize:14
	},
	text:{
		fontSize:18,
		color:'#000'
	},
	inputContainer: {
		borderBottomColor: "#368377",
		width: 280,
		height: 45,
		marginBottom: 20,
		flexDirection: 'row',
	},
	inputs: {
		height: 45,
		borderBottomWidth:3,
		marginLeft: 16,
		borderBottomColor: "#368377",
		flex: 1
	},
	choosephoto:{
		justifyContent:'center',
		backgroundColor:'#38887A',
		borderRadius:50,
		height:50,
		width:50,
		position: 'absolute',
		right:15,
		bottom:0 
	},
	dialogbuttontext:{
		color:'#38887B',
		fontSize:18
	}
});
