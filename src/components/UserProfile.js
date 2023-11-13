import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'
import PostProfile from './PostProfile'


export default class UserProfile extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View>
                        <Text>{this.props.email}</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <FlatList
                        style={styles.flatlist}
                        data={this.props.posteos}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <PostProfile data={item.data} id={item.id} navigation={this.props.navigation}
                            numColumns={3}
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
});