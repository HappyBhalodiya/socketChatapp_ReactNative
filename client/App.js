import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screen/login'
import Register from './screen/register'
import Dashboard from './screen/dashboard'
import Chat from './screen/chat'
import AsyncStorage from '@react-native-community/async-storage';
import Profile from './screen/profile'

const Stack = createStackNavigator();
let userid;
function App () {
	const useMountEffect = (fun) => useEffect(fun, [])
	useMountEffect(() => {
		datarenderfunction()
	})
	datarenderfunction = async () => {
		
		userid = await  AsyncStorage.getItem('userid');
		console.log("==================", userid)
	}
	if(userid == '' || userid == undefined){
		console.log("ifffff")
		return (
			<NavigationContainer>
			<Stack.Navigator  initialRouteName="Dashboard">
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Register" component={Register} />
			<Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
			
			<Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }}/>
			<Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
			</Stack.Navigator>
			</NavigationContainer>
			);
	}else{
		console.log("call else")
console.log("================else==", userid)
		return (
			<NavigationContainer>
			<Stack.Navigator  initialRouteName="Dashboard">
			<Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
			<Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }}/>
			<Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Register" component={Register} />
			

			</Stack.Navigator>
			</NavigationContainer>
			);
	}

}

export default App;

 
  