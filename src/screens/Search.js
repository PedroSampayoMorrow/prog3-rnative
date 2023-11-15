import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Buscador from '../components/Buscador'
import { db } from '../firebase/config'
import { View } from 'react-native';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pBuscada:'',
            users:[]
    }
    }
    palabraBuscada(texto){
        this.setState({pBuscada:texto},()=> console.log(this.state.pBuscada))
    }
    buscar(){
        db.collection('usuarios')
          .onSnapshot(
            users => {
                let usuarios = []
                let usuariosBuscados = []
                users.forEach(
                    user => {
                        let info = user.data()
                        usuarios.push({
                            username: info.username,
                            fotoperfil: info.fotoPerfil,
                            email: info.owner
                        })
                    }
                )
            usuarios.filter(user=>{
                if (user.username.toLowerCase().includes(this.state.pBuscada.toLowerCase()) || user.email.toLowerCase().includes(this.state.pBuscada.toLowerCase())) {
                    usuariosBuscados.push(user)
                }
            })
            this.setState({users:usuariosBuscados},()=> console.log(this.state.users))
            }
          )
    }
    render() { 
        return ( 
        <View style={styles.contenedor}>
        
        <View>
        
        <Buscador style={styles.buscador} palabraBuscada={texto => this.palabraBuscada(texto)}/>
        <TouchableOpacity style={styles.button} onPress={()=> this.buscar()}><Text style={styles.texto}>Buscar</Text></TouchableOpacity>
        
        </View>
        {this.state.users.forEach(user =>{
            <View>
            {user.fotoperfil.includes('https://firebasestorage') ? <Image source={{uri:user.fotoPerfil}} resizeMode='contains' style={styles.img} /> : <Image source={require('../../assets/FotoPerfilDefault.jpg')} resizeMode='contains' style={styles.img}/>}
            <Text style={styles.textoUsuario}>{user.username}</Text>
            <Text style={styles.textoUsuario}>{user.email}</Text>
            </View>
        })}
        </View>
        );
    }
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue',
        width:'60%',
        padding: 10,
        borderRadius: 5,
        marginTop:5
      },
      texto:{
        color:'white'
      },
      textoUsuario:{
        color:'black',
        fontSize: 10
      },
      contenedor:{
        height: 'max-content',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        paddingTop:20
      },
      buscador:{
        alignSelf:'center'
      },
      img:{
        height:150,
        width:150,
        borderRadius: `50%`
    }
})
export default Search;