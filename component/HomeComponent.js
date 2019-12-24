import {Component} from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import {Button, Text} from "react-native-elements";
import React from "react";

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.loginBtn}>
            <Button title='Login' onPress={() => this.props.navigation.navigate('Login')}/>
          </View>
            <Text style={styles.newUserText} onPress={() => this.props.navigation.navigate('CreateUser')}>Create A New User</Text>
        </View>
    )
  }
}
let window = Dimensions.get('window');
const styles =  StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: window.height,
        width: window.width,
    },
    loginBtn: {
        display: 'flex',
        width: 200,
    },
    newUserText: {
        color: 'blue',
        marginTop: 10,
    }
});
