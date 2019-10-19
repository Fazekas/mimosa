import React, { Component } from 'react';
import {Text, View, TextInput} from 'react-native';
import {Button} from "react-native-elements";
export default class LoginComponent extends Component {
    render() {

        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>Hello world</Text>
                <TextInput></TextInput>

                <Button
                    title="Move To Location"
                    onPress={() => navigate('Location')}
                />
            </View>
        );
    }
}
