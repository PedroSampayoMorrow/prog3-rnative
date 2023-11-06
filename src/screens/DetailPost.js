import { Text, View , ActivityIndicator,FlatList,StyleSheet,Image} from 'react-native'
import React, { Component } from 'react'
import { auth,db } from '../firebase/config'
import firebase from 'firebase';

import PostDescription from '../components/PostDescription'
import CommentForm from '../components/CommentForm'

export default class DetailPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            idPost:this.props.route.params.id,
            post : null
        }
    }
    onSubmit({descripcion}){
        db.collection('posts').doc(this.state.idPost).update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                    owner: auth.currentUser.email,
                    descripcion : descripcion,
                    createdAt : Date.now()
            })
        }).then(res => console.log(res))
        .catch((e)=>console.log(e))
    }
    componentDidMount(){
        db.collection('posts').doc(this.state.idPost).onSnapshot(
            post => {
                this.setState({
                    post : post.data()
                })
            }
        )
    }
  render() {
    return (
      <View>
        <Text>Posteo con id : {this.state.idPost}</Text>
        {this.state.post == null ? <ActivityIndicator size = 'small' color='blue'/>:<Text style = {styles.texto}>{this.state.post.owner}</Text> }

        <Image 
        style = {styles.image}
        source = {{uri: this.state.post != null ? this.state.post.image : ' '}}
        resizeMode = 'contain'
        />

        {this.state.post == null ? <ActivityIndicator size = 'large' color='blue'/> : <PostDescription data = {this.state.post} id = {this.state.idPost}/>}
        { this.state.post !== null && this.state.post.comments.length !== 0? 
        <FlatList 
        style = {styles.flatlist}
        data = {this.state.post.comments}
        keyExtractor = {item => item.createdAt.toString()}
        renderItem = { ({item}) => <Text>{item.descripcion}</Text>}
        />
        
        :<Text>Todavia no hay comentarios</Text>     
        
        
        }

        
        <CommentForm  onSubmit = {(descripcion)=>this.onSubmit(descripcion)} /> 
      </View>
    )
  }
}


const styles = StyleSheet.create({
    flatlist: {
        flex:1,
        height:100
    },
    texto: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'blue',
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 10,
    }
})