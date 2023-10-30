import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { auth, db } from '../firebase/config'
import React, { Component } from 'react'

export default class RegisterForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            username:'',
            password:'',
            minibio:'',
            error:null,
            logueado: false
        }
    }
    onSubmit(email,password,nombreUsuario,minibio){
        auth.createUserWithEmailAndPassword(email,password)
        .then(res => {
            db.collection('usuarios').add({
                owner: email,
                createdAt:Date.now(),
                username: nombreUsuario,
                minibio:minibio
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
        onPress={() => this.onSubmit(this.state.email,this.state.password,this.state.username,this.state.minibio)
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
});


