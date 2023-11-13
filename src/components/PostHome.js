import { Text, View, StyleSheet,TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { FontAwesome } from '@expo/vector-icons'; 

import firebase from 'firebase';
import { db, auth } from '../firebase/config';

export default class PostHome extends Component {
    constructor(props){
        super(props)
        this.state = {
            likeado : false
        }
    }
    componentDidMount(){
        this.setState({
            likeado:this.props.data.likes.includes(auth.currentUser.email)
        })
        
    }
    sacarLike(){
        db.collection('posts').doc(this.props.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then((res) =>{this.setState({
                likeado:false
            })
        })
        .catch((err) => console.log(err))
    }
    agregarLike(){
        db.collection('posts').doc(this.props.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then((res) =>{this.setState({
                likeado:true
            })
        })
        .catch((err) => console.log(err))
    }
  render() {
    return (
      <View style = {styles.container}>
        <TouchableOpacity
        onPress={()=>this.props.navigation.navigate('UserProfile',{owner:this.props.data.owner})}
        >
          <Text style = {styles.texto}>{this.props.data.owner}</Text>
        </TouchableOpacity>
        <Image 
        style = {styles.image}
        source = {{uri: this.props.data.image != undefined ? this.props.data.image : ' '}}
        resizeMode = 'contain'
        />

        <Text style = {styles.texto}>{this.props.data.descripcion}</Text>
        {this.state.likeado ?
        <TouchableOpacity onPress = {()=>this.sacarLike()}> <FontAwesome name="heart" size={24} color="red" /> </TouchableOpacity>: 
        <TouchableOpacity onPress = {()=>this.agregarLike()}> <FontAwesome name="heart-o" size={24} color="red" /> </TouchableOpacity> 
        }
        <Text style = {styles.texto}> Cantidad de likes : {this.props.data.likes.length}</Text>
        <TouchableOpacity
        style={styles.button}
        onPress={() => {this.props.navigation.navigate('DetailPost',{id : this.props.id})
        }}>
            <Text style={styles.buttonText}>Ir a Detalle</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'lightgray',
        margin:20,
        borderRadius:10,
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      texto: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue',
      },button: {
        backgroundColor: 'blue',
        width:'20%',
        padding: 10,
        borderRadius: 5,
        marginTop:5
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 10,
      },
      image: {
        width: 200,
        height: 200,
        borderRadius: 10,
      }

})
