import React, { Component } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'
const Tab = createBottomTabNavigator()

import Home from '../screens/Home'
import MyProfile from '../screens/MyProfile'
import NewPost from '../screens/NewPost'
import Search from "../screens/Search"
export default class NestedNavigation extends Component {
  render() {
    return (
      <Tab.Navigator>
          <Tab.Screen name = "Home" component={Home} options = {{headerShown:false, tabBarIcon:()=> <FontAwesome name="home" size={24} color="black" />}}/>
          <Tab.Screen name = "MyProfile" component={MyProfile} options = {{headerShown:false , tabBarIcon:()=> <FontAwesome name="user" size={24} color="black" />}}/>
          <Tab.Screen name = "Search" component={Search} options = {{headerShown:false , tabBarIcon:()=> <FontAwesome name="search" size={24} color="black" />}}/>
          <Tab.Screen name = "NewPost" component={NewPost} options = {{headerShown:false , tabBarIcon:()=> <FontAwesome name="plus" size={24} color="black" />}}/>
      </Tab.Navigator>
    )
  }
}