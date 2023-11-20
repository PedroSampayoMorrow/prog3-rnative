import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import Buscador from '../components/Buscador'
import { db } from '../firebase/config'
import { View } from 'react-native';
import UsuarioBuscador from '../components/UsuarioBuscador';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pBuscada:'',
            users:[],
            usersBuscados:[],
            err:""
    }
    }
    componentDidMount(){
        db.collection('usuarios')
        .onSnapshot(
          users => {
              let usuarios = []
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
                  this.setState({users:usuarios})
              })
    }
    palabraBuscada(texto){
        this.setState({pBuscada:texto},()=> console.log(this.state.pBuscada))
    }
    buscar(){
        let usuariosBuscados = []
            this.state.users.forEach(user=>{
                if (user.username.toLowerCase().includes(this.state.pBuscada.toLowerCase()) || user.email.toLowerCase().includes(this.state.pBuscada.toLowerCase())) {
                    usuariosBuscados.push(user)
                }
            })
            if(usuariosBuscados.toString() == []){
                this.setState({err: "No hay resultados"})
            }
            else{
                this.setState({usersBuscados:usuariosBuscados, err: ""})
            }
            }
    
    render() { 
        return ( 
        <View style={styles.contenedor}>
        <View style={styles.input}>
        <Buscador style={styles.buscador} palabraBuscada={texto => this.palabraBuscada(texto)}/>
        <TouchableOpacity style={styles.button} onPress={()=> this.buscar()}><Text style={styles.texto}>Buscar</Text></TouchableOpacity>
        
        </View>

        {this.state.err == "" ?(this.state.usersBuscados.toString() == [] ? <Text>Aqui aparecera lo que busque</Text>
        :
            <FlatList style={styles.flatList} data={this.state.usersBuscados} keyExtractor={item => item.email} renderItem={({item})=> <UsuarioBuscador data={item}/>}/>
        ): <Text>{this.state.err}</Text>}
        </View>
        );
    }
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue',
        width:'100%',
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
        flex: 1,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingTop:20
      },
      buscador:{
        alignSelf:'center'
      },
      img:{
        height:150,
        width:150,
        borderRadius: `50%`
    },
    usuarios:{
        padding: 10,
        height:"max-content"
    },
    flatList:{
        width:"100%"
    },
    input:{
        width:"80%"
    }

})
export default Search;