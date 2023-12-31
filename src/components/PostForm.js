import { Text, View ,StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export default class PostForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            descripcion:' ',
        }
    }
  render() {
    return (
      <View style = {styles.container}>
        <Text>Describe Tu Post</Text>
        <View>
            <TextInput 
            placeholder = 'Descripcion'
            onChangeText = {(text)=>this.props.actualizarDescripcion(text)}
            value = {this.props.estadoScreenDescripcion}
            style = {styles.input}
            multiline = {true}
            numberOfLines = {8}
            />
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