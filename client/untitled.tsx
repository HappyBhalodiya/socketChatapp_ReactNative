
					import React, { useState, useEffect } from 'react'
					import { View, Text, TouchableOpacity,PermissionsAndroid, StyleSheet, ScrollView, Image, TextInput } from 'react-native'
					import AudioRecorderPlayer from 'react-native-audio-recorder-player';
					import { Slider } from 'react-native-elements';

					const audioRecorderPlayer = new AudioRecorderPlayer();

					function App () {
						const [recordSecs , setrecordSecs] = useState('');
						const [recordTime, setrecordTime] = useState('');
						const [currentPositionSec, setcurrentPositionSec] = useState('');
						const [currentDurationSec, setcurrentDurationSec] = useState('');
						const [ playTime, setplayTime] = useState('');
						const [duration, setduration] = useState('');
						const [value, setvalue] =useState('');
						const startaudio = async() => {
							if (Platform.OS === 'android') {
								try {
									const granted = await PermissionsAndroid.request(
										PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
										{
											title: 'Permissions for write access',
											message: 'Give permission to your storage to write a file',
											buttonPositive: 'ok',
										},
										);
									if (granted === PermissionsAndroid.RESULTS.GRANTED) {
										console.log('You can use the storage');
									} else {
										console.log('permission denied');
										return;
									}
								} catch (err) {
									console.warn(err);
									return;
								}
							}
							if (Platform.OS === 'android') {
								try {
									const granted = await PermissionsAndroid.request(
										PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
										{
											title: 'Permissions for write access',
											message: 'Give permission to your storage to write a file',
											buttonPositive: 'ok',
										},
										);
									if (granted === PermissionsAndroid.RESULTS.GRANTED) {
										console.log('You can use the camera');
										onStartRecord();
									} else {
										console.log('permission denied');
										return;
									}
								} catch (err) {
									console.warn(err);
									return;
								}
							}
						}
						const onStartRecord = async() => {
							const path = Platform.select({
								ios: 'hello.m4a',
								android: 'sdcard/a.mp3', // should give extra dir name in android. Won't grant permission to the first level of dir.
							});
							const result = await audioRecorderPlayer.startRecorder(path);
							audioRecorderPlayer.addRecordBackListener((e) => {
								setrecordSecs(e.current_position)
								setrecordTime(audioRecorderPlayer.mmssss(
									Math.floor(e.current_position),
									),)
								
								return;
							});
							console.log(result);
						};

						const onStopRecord = async () => {
							const result = await audioRecorderPlayer.stopRecorder();
							audioRecorderPlayer.removeRecordBackListener();
							setrecordSecs(0)
							
							console.log(result);
						};

						

						

						return(
							<View>
							
							<TouchableOpacity style={{justifyContent:'center',alignItems: "center"}} onPress= { () => startaudio()}><Text style={{fontSize:20}}>hiii</Text></TouchableOpacity>
							<TouchableOpacity  style={{justifyContent:'center',alignItems: "center"}} onPress= { () => onStopRecord()}><Text style={{fontSize:20}}>stop</Text></TouchableOpacity>


						

							</View>
							)
					}



					export default App;

