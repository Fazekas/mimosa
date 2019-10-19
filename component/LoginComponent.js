import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import {Input} from 'react-native-elements';
export default class LoginComponent extends Component {
    render() {
        return (
          <View>
              <Text>Hello world</Text>
              <TextInput></TextInput>
              <form><input type="text"/></form>

          </View>
        );
    }
}