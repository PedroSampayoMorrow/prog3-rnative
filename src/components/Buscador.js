import React, { Component } from 'react';
import {Text, TouchableOpacity, View, TextInput, StyleSheet} from 'react-native'

class buscador extends Component {
    constructor(props) {
        super(props);
        this.state = {pBuscada:''}
    }

    render() { 
        return (
            <View style={styles.container}>
                
                <TextInput style={styles.buscador} placeholder='Search' keyboardType='email-adress' onChangeText={busqueda => this.setState({pBuscada: busqueda}, () => this.props.palabraBuscada(this.state.pBuscada))} value={this.state.pBuscada} ></TextInput>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        width:"60%",
        display:'flex'
    },
    buscador:{
        width:'100%',
        alignSelf:'center',
        paddingTop: 2,
        paddingBottom: 2,
        border: "1px solid black",
        borderRadius: 5
    }
})
export default buscador;