import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import PostForm from '../components/PostForm'

export default class NewPost extends Component {
    constructor(props){
        super(props)
    }
    onSubmit({descripcion}){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            descripcion: descripcion,
            likes : []
        }).then(res =>this.props.navigation.navigate('Home'))
        .catch((e)=>console.log(e))
    }
  render() {
    return (
      <View style = {styles.container}>
        <Text>PosteNuevo</Text>
        <PostForm onSubmit = {(descripcion)=>this.onSubmit(descripcion)}/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})