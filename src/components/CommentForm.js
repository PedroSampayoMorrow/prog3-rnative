import { Text, View ,StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export default class CommentForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            descripcion:null,
        }
    }
  render() {
    return (
      <View style = {styles.container}>
        <Text>Escribe un comentario!</Text>
        <View>
            <TextInput 
            placeholder = 'Comentario'
            onChangeText = {(text)=>this.setState({
                descripcion:text
            })}
            value = {this.state.descripcion}
            style = {styles.input}
            multiline = {true}
            numberOfLines = {8}
            />
            <TouchableOpacity
            style = {styles.button}
            onPress = {()=>this.state.descripcion ==  null ? alert('No puedes comentar un texto vacio') : this.props.onSubmit({descripcion : this.state.descripcion})}
            >
                <Text
                style = {styles.buttonText}
                >Enviar!
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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