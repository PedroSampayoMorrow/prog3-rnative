
import React, { Component } from 'react'

import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import Login from '../screens/Login'
import Register from '../screens/Register'
import TabNavigation from "./TabNavigation"
import DetailPost from '../screens/DetailPost'
import UserProfile from '../screens/UserProfile'
const Stack = createNativeStackNavigator()

export default class MainNavigation extends Component {
  render() {
    return (
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name = 'Login' component = {Login} options = {{headerShown:false}}/>
            <Stack.Screen name = 'Register' component = {Register} options = {{headerShown:false}} />
            <Stack.Screen name = 'TabNavigation' component = {TabNavigation} options = {{headerShown:false}} />
            <Stack.Screen name = 'DetailPost' component = {DetailPost}  />
            <Stack.Screen name = 'UserProfile' component = {UserProfile}  />
          </Stack.Navigator>
      </NavigationContainer>
    )
  }
}