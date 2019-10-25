import React, {Component} from "react";
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import emailRegex from './LoginComponent'

export default class CreateUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {firstName: '', lastName: '', email: '', password: '', isDisabled: true};
  }


  isSubmitDisabled = () => {
    return !(this.state.firstName !== '' && this.state.lastName !== '' && emailRegex.test(this.state.email) && this.state.password !== '');
  };

  render() {
    return (
        <View>
          <View>
            <Input label='First Name' placeholder='First Name' onChangeText={(firstName) => this.setState({firstName})}/>
          </View>
          <View>
            <Input label='Last Name' placeholder='Last Name' onChangeText={(lastName) => this.setState({lastName})}/>
          </View>
          <View>
            <Input label='Email' autoCapitalize='none' autoCorrect={false} placeholder='Email@address.com' onChangeText={(email) => this.setState({email})}/>
          </View>
          <View>
            <Input label='Password' autoCapitalize='none' secureTextEntry={true} placeholder='Password' onChangeText={(password) =>this.setState({password})}/>
          </View>
          <Button title='Create User' disabled={this.isSubmitDisabled()} onPress={() => this.props.navigation.navigate('Login')}/>
        </View>
    );
  }
}