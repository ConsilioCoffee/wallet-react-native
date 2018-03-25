import React, {Component} from 'react'
import {
    View,
    Alert,
    AsyncStorage,
    ScrollView,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableHighlight,
    Text,
    Image
} from 'react-native'
import Colors from './../../config/colors'

export default class InitialScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('./../../../assets/icons/app.png')}
                        resizeMode="contain"
                        style={styles.image}/>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate("Login")}>
                        <Text style={styles.buttonText}>
                            Sign In
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={[styles.button, {marginLeft: 25}]}
                        onPress={() => this.props.navigation.navigate("Signup")}>
                        <Text style={styles.buttonText}>
                            Sign Up
                        </Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        By tapping Sign in or Sign up, I agree to Terms of Service and Privacy Policy
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    imageContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    image: {
        maxWidth: 250,
        height: 150,
    },
    buttonsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 25,
        justifyContent: 'center',
        paddingVertical:25,
    },
    button: {
        backgroundColor: Colors.mediumbrown,
        height: 50,
        borderRadius:25,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    },
    textContainer: {
        backgroundColor: Colors.lightgray,
        paddingHorizontal: 25,
        height: 80,
        justifyContent:'center',
        alignItems:'center'
    },
    text: {
        fontSize: 12,
        color: Colors.mediumbrown
    }
})