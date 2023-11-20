import React, { Component } from 'react';
import { Text, View,FlatList,StyleSheet, Image } from 'react-native'


class UsuarioBuscador extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() { 
        return(
        <View style={styles.usuarios}>
            {this.props.data.fotoperfil.includes('https://firebasestorage')? <Image source={{uri:this.props.data.fotoperfil}} resizeMode='contains' style={styles.img} /> : <Image source={require('../../assets/FotoPerfilDefault.jpg')} resizeMode='contains' style={styles.img}/>}
            <View style={styles.usuariosDatos}>
            <Text style={styles.textoUsuario}>Nombre: {this.props.data.username}</Text>
            <Text style={styles.textoUsuario}>Email: {this.props.data.email}</Text>
            </View>
        </View>
        );
    }
}
const styles = StyleSheet.create({
    usuarios:{
        flex:1,
        width:"90%",
        height:"100%",
        padding: 10,
        backgroundColor: 'lightgray',
        margin:20,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center'
          
    },
    textoUsuario:{
        color:'black',
        fontSize: 10
      },
      img:{
        height:150,
        width:150,
        borderRadius: `50%`
    },
    usuariosDatos:{
        alignSelf:"flex-start"
    }
})
export default UsuarioBuscador;