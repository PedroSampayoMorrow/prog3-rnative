import { Text, View } from 'react-native'
import React, { Component } from 'react'
import UserProfilec from '../components/UserProfile'
import { db } from '../firebase/config'
export default class UserProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            posteos : null
          }
    }
    componentDidMount(){
        db.collection('posts').where('owner','==',this.props.route.params.owner).onSnapshot(
          docs => {
              let posts = []
              docs.forEach( doc => {
                  posts.push({
                      id:doc.id,
                      data:doc.data()
                  })
              })
              this.setState({
                  posteos:posts
              })
          }
      )
      }

  render() {
    return (
      <View>
        <UserProfilec email = {this.props.route.params.owner} posteos = {this.state.posteos} navigation = {this.props.navigation}/>
      </View>
    )
  }
}