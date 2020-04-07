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
	Dashboard: {
		screen: Dashboard
	},
	Chat:{
		screen:Chat
	},
	Register: {
		screen: Register,
	},
	Login: {
		screen: Login,
	},

});

const MainRoutes = createAppContainer(MainNavigator);
export default MainRoutes;