import { Text, View, StyleSheet,TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import PostForm from '../components/PostForm'
import CamaraPost from '../components/CamaraPost'


export default class NewPost extends Component {
    constructor(props){
        super(props)
        this.state = {
          descripcion : "",
          urlImg : '' ,
          pasoInicial:true
        }
    }
    onSubmit({descripcion,image}){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            descripcion: descripcion,
            image : image,
            likes : [],
            comments : []
        }).then(res =>this.props.navigation.navigate('Home'))
        .catch((e)=>console.log(e))
    }
    actualizarDescripcion(descripcionActualizada){
      this.setState({
        descripcion : descripcionActualizada
      })
    }
    actualizarImg(url){
      this.setState({
        urlImg : url,
        pasoInicial:false
      })
    }
  render() {
    return (
      <View style = {styles.container}>

        {this.state.pasoInicial ? 
           <CamaraPost actualizarImg = {(url)=>this.actualizarImg(url)}/>
        :
        <View> 
        <PostForm
        actualizarDescripcion = {(descripcionActualizada) => this.actualizarDescripcion(descripcionActualizada)}
        estadoScreenDescripcion = {this.state.descripcion}/>
         <TouchableOpacity
            style = {styles.button}
            onPress = {()=> this.onSubmit({descripcion : this.state.descripcion,image : this.state.urlImg})}
            >
                <Text
                style = {styles.buttonText}
                >Enviar!
                </Text>
            </TouchableOpacity>
            </View>
        }
        
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
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginTop:5,
    marginBottom:5
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})