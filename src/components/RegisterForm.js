import { Text, View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { auth, db, storage } from '../firebase/config'
import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker'

export default class RegisterForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            username:'',
            password:'',
            minibio:'',
            fotoPerfil:'',
            error:null,
            logueado: false
        }
    }
    subirIMG(){
      ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing:true,
        aspect:[4,3],
        quality:1
      })
      .then(img => 
        fetch(img.assets[0].uri)
        .then(res => res.blob())
        .then(img =>{
          const ref = storage.ref(`ProfileImg/${Date.now()}.jpg`)
          ref.put(img)
          .then(()=>{
            ref.getDownloadURL()
            .then(url =>{
              this.setState({fotoPerfil: url},()=>console.log(this.state))
            })
          })
        }))
        
        
        
    }
    onSubmit(email,password,nombreUsuario,minibio,fotoPerfil){
        auth.createUserWithEmailAndPassword(email,password)
        .then(res => {
            db.collection('usuarios').add({
                owner: email,
                createdAt:Date.now(),
                username: nombreUsuario,
                minibio:minibio,
                fotoPerfil:fotoPerfil
              }).then(res =>  console.log(res))
              .catch((e)=>console.log(e))
           
        })
        .then(res => this.props.navigation.navigate('Login'))
        .catch(e=>{if (e.message == "The email address is badly formatted." ) {
            this.setState({
                error: "El mail no tiene el formato correcto"
            })
        }
        if (e.message == 'The password must be 6 characters long or more.') {
            this.setState({
              error: "La contraseña debe tener por lo menos 6 caracteres"
            })
        }
        if (e.message == 'The email address is already in use by another account.') {
            this.setState({
              error: "El mail ya esta en uso"
            })
        }
    })
    }
  render() {
    return (
      <View style = {styles.container}>
        <Text>Registrate!</Text>
              <TouchableOpacity
              style={styles.img}
              onPress={()=> this.subirIMG()}>
                {this.state.fotoPerfil == ``? <Image source={require(`../../assets/FotoPerfilDefault.jpg`)} style={styles.img} resizeMode='contains' />
                 : <Image source={{uri:this.state.fotoPerfil}} style={styles.img} resizeMode='contains'></Image>}
              </TouchableOpacity>
        <TextInput
        style = {styles.input}
        keyboardType='email-adress'
        placeholder='email'
        onChangeText = {(text)=> this.setState({
            email:text
        })}
        value = {this.state.email}
        />
        <TextInput
        style = {styles.input}
        keyboardType='email-adress'
        placeholder='username'
        onChangeText = {(text)=> this.setState({
            username:text
        })}
        value = {this.state.username}
        />
        <TextInput
        style = {styles.input}
        keyboardType='email-adress'
        placeholder='password'
        secureTextEntry = {true}
        onChangeText = {(text)=> this.setState({
            password:text
        })}
        value = {this.state.password}
        />
        <TextInput
        style = {styles.input}
        keyboardType='email-adress'
        placeholder='minibio'
        onChangeText = {(text)=> this.setState({
            minibio:text
        })}
        value = {this.state.minibio}
        />
        {this.state.error !== null ? 
        <View style={styles.errorContainer}>
        <Text style={styles.errorTexto}>{this.state.error}</Text>
      </View> : false}
        <TouchableOpacity
        style={styles.button}
        onPress={() => this.onSubmit(this.state.email,this.state.password,this.state.username,this.state.minibio,this.state.fotoPerfil)
        }>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {this.props.navigation.navigate('Login')
        }}>
        <Text style={styles.buttonText}>Ir a Login</Text>
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
  errorContainer: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  errorTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  img:{
    height: 100,
    width: 100,
    borderRadius: `50%`
  }
});


