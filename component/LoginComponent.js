import React, { Component } from 'react';
import { View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    console.log('hello');
    this.state = {email: '', password: '', isLogin: false};
  }

  isSubmitDisabled() {
    return !(this.state.password !== '' && emailRegex.test(this.state.email));
  }

  render() {
    return (
        <View>
          <View>
            <Input autoCapitalize='none' autoCorrect={false} label='Email' placeholder='email@address.com'
                   errorMessage='Please enter a valid email address' onChangeText={(email) => this.setState({email})}/>
          </View>
          <View>
            <Input label='Password' autoCapitalize='none' autoCorrect={false} secureTextEntry={true}
                   onChangeText={(password) => this.setState({password})} placeholder='Password'/>
          </View>
          <View>
            <Button title='Submit' onPress={() => this.props.navigation.navigate('Location')}
                    disabled={this.isSubmitDisabled()} type='solid'/>
          </View>
        </View>
    );
  }
}