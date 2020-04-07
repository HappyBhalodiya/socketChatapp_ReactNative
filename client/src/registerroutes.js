import React from "react";
import Register from './register'
import Login from './login'
import Dashboard from './dashboard'
import Chat from './chat'


import { createStackNavigator } from "react-navigation-stack";
import {
	createAppContainer,
	createMaterialTopTabNavigator
} from "react-navigation";

const MainNavigator = createStackNavigator({
	Register: {
		screen: Register,
	},
	Login: {
		screen: Login,
	},
	Dashboard: {
		screen: Dashboard
	},
	Chat:{
		screen:Chat
	},});

const RegisterRoutes = createAppContainer(MainNavigator);
export default RegisterRoutes;