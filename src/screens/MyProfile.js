import { Text, View, TouchableOpacity , StyleSheet,Flatlist } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class MyProfile extends Component {
constructor(props){
    super(props)
    this.state = {
      posteos : null
    }
}
componentDidMount(){
db.collection('posts')
}

signOut(){
    auth.signOut()
    .then(()=>this.props.navigation.navigate('Login'))
}
  render() {
    return (
      <View style ={styles.container}>
            <Text>MiPerfil</Text>

            <TouchableOpacity
            style={styles.button}
            onPress={() => {this.signOut()
            }}>
            <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: 'blue',
      width:'60%',
      padding: 10,
      borderRadius: 5,
      marginTop:5
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 16,
    },
  });