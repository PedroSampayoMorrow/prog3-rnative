import RegisterForm from '../components/RegisterForm'
import React, { Component } from 'react'

export default class Register extends Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
      <RegisterForm navigation = {this.props.navigation}/>
    )
  }
}