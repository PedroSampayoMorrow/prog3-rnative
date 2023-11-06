import { Text, View,FlatList,StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'
import PostHome from '../components/PostHome'
export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataHome : []
        }
    }
    componentDidMount(){
        db.collection('posts').onSnapshot(
            docs => {
                let posts = []
                docs.forEach( doc => {
                    posts.push({
                        id:doc.id,
                        data:doc.data()
                    })
                })
                this.setState({
                    dataHome:posts
                })
            }
        )
    }
  render() {
    return (
    <View style = {styles.container}>
        {this.state.dataHome.length !==0 ? <FlatList 
        style = {styles.flatlist}
        data = {this.state.dataHome}
        keyExtractor = {item => item.id.toString()}
        renderItem = { ({item}) => <PostHome data = {item.data} id = {item.id} navigation = {this.props.navigation}/>}
        />:<Text>Todavia no cargamos info</Text>}
    </View>
    )
  }
}
const styles = StyleSheet.create({
    flatlist: {
        flex:1,
        height:100
    },
    container: {
        flex:1,
    }
})