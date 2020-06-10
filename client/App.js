import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screen/login'
import Register from './screen/register'
import Dashboard from './screen/dashboard'
import Chat from './screen/chat'
import AsyncStorage from '@react-native-community/async-storage';
import Profile from './screen/profile'
console.disableYellowBox = true;
const Stack = createStackNavigator();
let userid;
function App() {
	const useMountEffect = (fun) => useEffect(fun, [])
	useMountEffect(() => {
		datarenderfunction()
	})
	datarenderfunction = async () => {
		
		userid = await AsyncStorage.getItem('userid');
		console.log("==================", userid)
	}
	if (userid == '' || userid == undefined) {
		console.log("ifffff")
		return (
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Dashboard">
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Register" component={Register} />
					<Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
					<Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
					<Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	} else {
		console.log("call else")
		console.log("================else==", userid)
	return (
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Dashboard">
					<Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
					<Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
					<Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Register" component={Register} />


				</Stack.Navigator>
			</NavigationContainer>	
		);
	}

}

export default App;


					// import React, { useState, useEffect } from 'react'
					// import { View, Text, TouchableOpacity,PermissionsAndroid, StyleSheet, ScrollView, Image, TextInput } from 'react-native'
					// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
					// import { Slider } from 'react-native-elements';

					// const audioRecorderPlayer = new AudioRecorderPlayer();

					// function App () {
					// 	const [recordSecs , setrecordSecs] = useState('');
					// 	const [recordTime, setrecordTime] = useState('');
					// 	const [currentPositionSec, setcurrentPositionSec] = useState('');
					// 	const [currentDurationSec, setcurrentDurationSec] = useState('');
					// 	const [ playTime, setplayTime] = useState('');
					// 	const [duration, setduration] = useState('');
					// 	const [value, setvalue] =useState('');
					// 	const startaudio = async() => {
					// 		if (Platform.OS === 'android') {
					// 			try {
					// 				const granted = await PermissionsAndroid.request(
					// 					PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
					// 					{
					// 						title: 'Permissions for write access',
					// 						message: 'Give permission to your storage to write a file',
					// 						buttonPositive: 'ok',
					// 					},
					// 					);
					// 				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					// 					console.log('You can use the storage');
					// 				} else {
					// 					console.log('permission denied');
					// 					return;
					// 				}
					// 			} catch (err) {
					// 				console.warn(err);
					// 				return;
					// 			}
					// 		}
					// 		if (Platform.OS === 'android') {
					// 			try {
					// 				const granted = await PermissionsAndroid.request(
					// 					PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
					// 					{
					// 						title: 'Permissions for write access',
					// 						message: 'Give permission to your storage to write a file',
					// 						buttonPositive: 'ok',
					// 					},
					// 					);
					// 				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					// 					console.log('You can use the camera');
					// 					onStartRecord();
					// 				} else {
					// 					console.log('permission denied');
					// 					return;
					// 				}
					// 			} catch (err) {
					// 				console.warn(err);
					// 				return;
					// 			}
					// 		}
					// 	}


					

					// 	const onStartRecord = async() => {
							

					// 		const path = Platform.select({
					// 			android: 'sdcard/Record'+Math.floor(Math.random() * 10000000000) + '.mp3',
					// 		});
					// 		console.log(path)
					// 		const result = await audioRecorderPlayer.startRecorder(path);
					// 		audioRecorderPlayer.addRecordBackListener((e) => {
					// 			setrecordSecs(e.current_position)
					// 			setrecordTime(audioRecorderPlayer.mmssss(
					// 				Math.floor(e.current_position),
					// 				),)

					// 			return;
					// 		});
					// 		console.log(result);
					// 	};

					// 	const onStopRecord = async () => {
					// 		const result = await audioRecorderPlayer.stopRecorder();
					// 		audioRecorderPlayer.removeRecordBackListener();
					// 		setrecordSecs(0)

					// 		console.log(result);
					// 	};





					// 	return(
					// 		<View>

					// 		<TouchableOpacity style={{justifyContent:'center',alignItems: "center"}} onPressIn= { () => startaudio()} onPressOut={() => onStopRecord()}><Text style={{fontSize:20}}>hiii</Text></TouchableOpacity>





					// 		</View>
					// 		)
					// }



					// export default App;

