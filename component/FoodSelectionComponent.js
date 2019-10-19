
import React from 'react';
import {View, Text} from 'react-native';
import { Input, Button } from 'react-native-elements'

export default class FoodSelectionComponent extends React.Component {
    state = { locationText: '', isLoading: false };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>Select Food</Text>
            </View>
        );
    }
}