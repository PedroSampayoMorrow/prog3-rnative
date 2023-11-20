import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput, Image, ActivityIndicator
} from "react-native";
import { auth, db, storage } from '../firebase/config'
import * as ImagePicker from 'expo-image-picker'



class EditUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoUsuario:{},
      idUsuario:null,
      usuario: "",
      fotoPerfil: "",
      minibio: "",
    };
  }
  componentDidMount(){
    db.collection("usuarios").where("owner","==", auth.currentUser.email).onSnapshot(user=>{
        this.setState({
            infoUsuario: user.docs[0].data(),
            idUsuario: user.docs[0].id
        })
    })
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
  Editar(){
    if(this.state.usuario != ""){
      db.collection("usuarios").doc(this.state.idUsuario).update({username:this.state.usuario}).then(()=> alert("Username actualizado"))
    }
    if(this.state.minibio != ""){
      db.collection("usuarios").doc(this.state.idUsuario).update({minibio:this.state.minibio}).then(()=> alert("Bio actualizada"))
    }
    if(this.state.fotoPerfil != ""){
      db.collection("usuarios").doc(this.state.idUsuario).update({fotoPerfil:this.state.fotoPerfil}).then(()=> alert("Foto de perfil actualizada"))
    }
  }
  render() {
    return (
      <View style={styles.divGral}>
        <TouchableOpacity
        style={styles.img}
        onPress={()=> this.subirIMG()}>
              {this.state.fotoPerfil == "" ? <Image source={require(`../../assets/FotoPerfilDefault.jpg`)} style={styles.img} resizeMode='contains' />
                 : <Image source={{uri:this.state.fotoPerfil}} style={styles.img} resizeMode='contains'/>}
        </TouchableOpacity>
        <TextInput
        style={styles.input}
        keyboardType="email-adress"
        placeholder={this.state.infoUsuario.username}
        onChangeText={text =>
          this.setState({
            usuario: text
          })
        }
        value={this.state.usuario}
        />
        <TextInput
        style={styles.input}
        keyboardType="email-adress"
        placeholder={this.state.infoUsuario.minibio}
        onChangeText={text =>
          this.setState({
            minibio: text
          })
        }
        value={this.state.minibio}
        />
        <TouchableOpacity onPress={()=>this.Editar()}><Text>Confirmar</Text></TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  divGral:{
    flex:1,
    width:"100%",
    justifyContent:"center",
    alignItems:"center"
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  img:{
    height: 100,
    width: 100,
    borderRadius: `50%`
  },
});
export default EditUserForm;