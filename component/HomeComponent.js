import {Component} from "react";
import {View} from "react-native";
import {Button, Input, Text} from "react-native-elements";
import React from "react";

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <View>
          <View>
            <Button title='Login' onPress={() => this.props.navigation.navigate('Login')}/>
          </View>
          <View>
            <Text style={{color: 'blue'}} onPress={() => this.props.navigation.navigate('CreateUser')}>Create A New User</Text>
          </View>
        </View>
    )
  }
}