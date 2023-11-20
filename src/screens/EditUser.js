import React, { Component } from 'react';
import EditUserForm from '../components/EditUserForm';


class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <EditUserForm/>);
    }
}
 
export default EditUser;