import React, { Component } from 'react';
import { View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', isLogIn: false};
  }

  setEmail(email) {
    console.log('email');
    console.log(email);
    this.setState({email});
    console.log('state');
  }

  setPassword(password) {
    this.setState({password})
  }

  setIsLogin() {
    this.setState({isLogIn: true});
  }

  isSubmitDisabled() {
    console.log('submitdisabled', this.state);
    if (this.state.password !== undefined) {
      return false
    }
    return true;
  }

  showLogin() {
    return (
      <View>
        <View>
          <Input onChangeText={(email) => this.setEmail(email)} label='Email' placeholder='email@address.com' errorMessage='Please enter a valid email address'/>
        </View>
        <View>
          <Input label='Password' onChangeText={(password) => this.setPassword(password)} placeholder='Password'/>
        </View>
        <View>
          <Button title='Submit' onPress={() => this.tappedSubmit()} disabled={this.isSubmitDisabled()} type='solid'/>
        </View>
      </View>
    );
  }

  showLoginButton() {
    return (
      <View>
        <View>
          <Button title='Login' onPress={() => this.setIsLogin()}/>
        </View>
        <View>
          <Text>Create A New User</Text>
        </View>
      </View>
    )
  }

  tappedSubmit() {
    console.log('tapped button');
    console.log(this.state);
  }

  render() {
    let shouldLogin;
    if (this.state.isLogIn) {
      shouldLogin = this.showLogin();
    } else {
      shouldLogin = this.showLoginButton();
    }
    return (
        <View>
          {shouldLogin}
        </View>
      );
  }
}