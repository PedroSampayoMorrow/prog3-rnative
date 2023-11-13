import { Text, View, TouchableOpacity , StyleSheet,Flatlist } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

import MyProfilec from '../components/MyProfile'

export default class MyProfile extends Component {
constructor(props){
    super(props)
    this.state = {
      posteos : null
    }
}
componentDidMount(){
  db.collection('posts').where('owner','==',auth.currentUser.email).onSnapshot(
    docs => {
        let posts = []
        docs.forEach( doc => {
            posts.push({
                id:doc.id,
                data:doc.data()
            })
        })
        this.setState({
            posteos:posts
        })
    }
)

}

signOut(){
    auth.signOut()
    .then(()=>this.props.navigation.navigate('Login'))
}
borrarPost(idPosteo){
  db.collection('posts').doc(idPosteo).delete()
  .then((res)=>console.log(res))
  .catch(e=>console.log(e))
  //db.collection('posts').delete(idPosteo)
}
  render() {
    return (
    
        <MyProfilec signOut = {()=>this.signOut()} posteos = {this.state.posteos} navigation = {this.props.navigation} borrarPost = {(idPosteo)=>this.borrarPost(idPosteo)}/>
 
    )
  }
}
const styles = StyleSheet.create({
  container: {
  }
})