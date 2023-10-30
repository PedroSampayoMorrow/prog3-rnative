import LoginForm from "../components/LoginForm"
import React,{ Component } from "react"
import { auth } from '../firebase/config'

export default class Login extends Component {
    constructor(props){
        super(props)
        }
    componentDidMount(){
        auth.onAuthStateChanged((user) =>{
            user !== null ? this.props.navigation.navigate('TabNavigation'):console.log(user)
        })
    }
    render() {
        return (
      <LoginForm navigation = {this.props.navigation}/>
    )
  }
}