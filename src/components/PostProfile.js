import { Text, View,Image,StyleSheet,TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

export default class PostProfile extends Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
      <View style = {styles.container}>
        <TouchableOpacity
        onPress={()=>this.props.navigation.navigate('DetailPost',{id : this.props.id})}
        >
            <Image 
            style = {styles.image}
            source = {{uri: this.props.data.image}}
            resizeMode = 'contain'
            />
        </TouchableOpacity>
        {auth.currentUser.email == this.props.data.owner?
        <TouchableOpacity
        onPress={(idPosteo)=>this.props.borrarPost(this.props.id)}
        >
          <Text>Borrar Posteo</Text>
        </TouchableOpacity> :
        <Text> </Text>
        }
        
      </View>
    )
  }
}
const styles = StyleSheet.create({
    image: {
        width: 75,
        height: 200,
        borderRadius: 10,
      },
    container : {
        backgroundColor: 'lightgray',
        width:100,
        marginBottom:20,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
  });