import React, { Component } from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialIcons";

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', isLogin: false};
  }

  isSubmitDisabled() {
    return !(this.state.password !== '' && emailRegex.test(this.state.email));
  }

  render() {
    return (
        <View style={styles.container}>
          <View>
            <Input autoCapitalize='none' autoCorrect={false} label='Email' placeholder='email@address.com'
                   leftIcon={<Icon name='email' size={24} color='black'/>}
                   errorMessage='Please enter a valid email address' onChangeText={(email) => this.setState({email})}/>
          </View>
          <View>
            <Input label='Password' autoCapitalize='none' autoCorrect={false} secureTextEntry={true}
                   leftIcon={<Icon name='lock' size={24} color='black'/>}
                   containerStyle={styles.inputContainer}
                   onChangeText={(password) => this.setState({password})} placeholder='Password'/>
          </View>
          <View style={styles.submitBtn}>
            <Button title='Submit'
                    buttonStyle={styles.btnStyle}
                    onPress={() => this.props.navigation.navigate('Location')}
                    disabled={this.isSubmitDisabled()} type='solid'/>
          </View>
        </View>
    );
  }
}

const window = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        width: window.width,
        height: window.height,
    },
    inputContainer: {
        marginTop: 10,
    },
    submitBtn: {
        marginTop: 20,
        // width: 200,
    },
    btnStyle: {
        borderRadius: 20,
        marginLeft: 40,
    }
});
