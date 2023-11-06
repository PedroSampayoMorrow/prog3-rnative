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
           <Camera 
           style = {styles.camera}
           type = {Camera.Constants.Type.back}
           ref = {(methods)=>this.methods = methods}
            />
            <TouchableOpacity
            onPress = {()=> this.sacarFoto()}>
                <Text>Sacar foto</Text>
            </TouchableOpacity>
            </>
            : this.state.allow && this.state.showCamera === false ? 
                <View>
                    <Image
                        source = {{uri:this.state.url}}
                        style = {styles.img}
                        resizeMode = {'contain'}
                    />
                        <TouchableOpacity
                        onPress = {()=> this.rechazarFoto()}>
                            <Text>Rechazar Foto </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress = {()=> this.acceptarFoto()}>
                            <Text>Acceptar Foto </Text>
                        </TouchableOpacity>
                </View> : <Text>No diste permisos para usar camara</Text>
        }
         

        
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
        flex:1
    },
    camera : {
        height:200,
        width:200
    },
    img : {
        height:300
    }
})