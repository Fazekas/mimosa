import React, {Component} from "react";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class TouchableButtonComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight style={{padding: 10}} onPress={this.props.action}>
                <View style={styles.buttonContainer}>
                    <Icon style={styles.buttonIcon} name={this.props.iconName} size={this.props.size}/>
                    <Text style={styles.buttonText}>{this.props.text}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center'
    },
    buttonText: {
        color: 'blue'
    },
    buttonIcon: {
        borderWidth: 1,
        borderRadius: 50,
        borderColor: 'blue',
        color: 'blue',
        textAlign: 'center',
        padding: 5
    }
});
