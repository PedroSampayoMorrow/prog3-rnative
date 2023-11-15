import { Text, View, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { Component } from 'react'
import { db, auth, } from '../firebase/config'
import PostProfile from './PostProfile'

export default class MyProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datos: {}
        }
    }
    componentDidMount(){
        db.collection(`usuarios`)
        .where('owner',`==`, auth.currentUser.email)
        .onSnapshot(
            data =>{    
                console.log(data.docs[0].data())
                this.setState({datos:data.docs[0].data()})
            }
        )
    }
    render() {
        return (
            <View style={styles.container}>

                    <View style={styles.perfil}>
                        <Image style={styles.img} source={{uri:this.state.datos.fotoPerfil}} resizeMode='contains' />
                        <Text>{auth.currentUser.email}</Text>
                        <Text>{this.state.datos.username}</Text>
                        <Text>{this.state.datos.minibio}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.props.signOut()
                        }}>
                        <Text style={styles.buttonText}>Sign Out</Text>
                    </TouchableOpacity>

                <View style={styles.container}>
                    <FlatList
                        style={styles.flatlist}
                        data={this.props.posteos}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <PostProfile data={item.data} id={item.id} navigation={this.props.navigation} borrarPost = {(idPosteo)=>this.props.borrarPost(idPosteo)}
                        />
                        }
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'blue',
        width: '60%',
        padding: 10,
        borderRadius: 5,
        marginTop: 5
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    flatlist: {
        flex: 1
    },
    img:{
        height:150,
        width:150,
        borderRadius: `50%`
    },
    perfil:{
        display:`flex`,
        flexDirection: `column`,
        height: `max-content`,
        paddingTop: 30
    }
});