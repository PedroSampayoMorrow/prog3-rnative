import { Text, View, StyleSheet , TouchableOpacity, Image} from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera'
import { storage } from '../firebase/config'

export default class CamaraPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            showCamera : true,
            allow : false,
            url : ''
        }
        this.methods = null
    }
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then((resp)=> this.setState({
            allow : true
        }))
        .catch((e) => console.log(e))
    }
    sacarFoto(){
        this.methods.takePictureAsync()
        .then(url => this.setState({url : url.uri, showCamera : false}))
        .catch(e=>console.log(e))
    }

    rechazarFoto(){
        this.setState({
            url: '',
            showCamera: true
        })
    }
    acceptarFoto(){
        fetch(this.state.url)
        .then(res=>res.blob())
        .then(image => {
            const ref = storage.ref(`Images/${Date.now()}.jpg`)
            ref.put(image)
            .then(res => {
                ref.getDownloadURL()
                .then(url => this.props.actualizarImg(url))
            })
            .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
    }
  render() {
    return (
      <View style = {styles.container}>
          {this.state.allow && this.state.showCamera ?
            <> 
            <View style = {styles.camaraCorregir}>
                <Camera 
                style = {styles.camera}
                type = {Camera.Constants.Type.back}
                ref = {(methods)=>this.methods = methods}
                />
                <TouchableOpacity
                onPress = {()=> this.sacarFoto()}
                style = {styles.button}>
                <Text style = {styles.buttonText}>Sacar foto</Text>
                </TouchableOpacity>
            </View>
            </>
            : this.state.allow && this.state.showCamera === false ? 
                <View style = {styles.camaraCorregir}>
                    <Image
                        source = {{uri:this.state.url}}
                        style = {styles.img}
                        resizeMode = {'contain'}
                    />
                        <TouchableOpacity
                        onPress = {()=> this.rechazarFoto()}
                        style = {styles.button}>
                            <Text style = {styles.buttonText}>Rechazar Foto </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress = {()=> this.acceptarFoto()}
                        style = {styles.button}>
                            <Text style = {styles.buttonText}>Acceptar Foto </Text>
                        </TouchableOpacity>
                </View> : <Text>No diste permisos para usar camara</Text>
        }
         

        
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignContent:'center',
        justifyContent:'center'
    },
    camera : {
        height:'50%',
        width:300
    },
    img : {
        height:'50%',
        width:300
    },
    camaraCorregir : {
        height:'70%',
        width: '100%',
        backgroundColor: 'lightgray',
        borderRadius:10,
        padding:10,

    },
    button: {
        backgroundColor: 'blue',
        width:'70%',
        padding: 10,
        borderRadius: 5,
        marginTop:5,
        alignSelf:'center'
      },
    buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    },
})