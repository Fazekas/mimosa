
import React from 'react';
import {View, Text, PermissionsAndroid, ActivityIndicator} from 'react-native';
import { Input, Button } from 'react-native-elements'

export default class LocationComponent extends React.Component {
    state = { locationText: '', isLoading: false };
    async checkLocationPermission() {
        const granted = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            title: 'TELL ME WHERE YOU LIVE',
            message:
                'I need to know where you live no reason why just tell me',
            buttonNegative: 'Yes',
            buttonPositive: 'Yes',
        },);

        if (granted) {
            console.log('can get location, figure out later');
        }
        else {
            console.log( "ACCESS_FINE_LOCATION permission denied" )
        }
    }

    componentDidMount() {
        this.checkLocationPermission().then(() => {
            console.log("Permission checked");
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        const locationInput = (text) => {
            this.setState({locationText: text});
        };
        const sendLocation = () => {
            this.setState({isLoading: true});
            setTimeout(() => {
                this.setState({isLoading: false});
                navigate('FoodSelection');
            }, 3000)
        };

        const locationForm = () => {
            return (
                <View>
                    <Text>Enter your location</Text>
                    <Text>Location Text: {this.state.locationText}</Text>
                    <Input onChangeText={text => locationInput(text)}/>
                    <Button title="Let's find food!" onPress={() => sendLocation()}/>
                </View>
            )
        };

        const activityIndicator = () => {
            return (
                <View>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        };
        const viewData = !this.state.isLoading ? locationForm() : activityIndicator();

        return (
            <View>
                {viewData}
            </View>
        );
    }
}