import React, { Component } from 'react';
import {
  PermissionsAndroid,
  View,
  Button,
  ImageBackground,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const LocationEnum = {
  RETRIEVING_LOCATION: 0,
  HAS_LOCATION: 1,
  LOCATION_DENIED: 2,
};

export default class LocationComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationValue: LocationEnum.RETRIEVING_LOCATION,
      longitude: null,
      latitude: null,
    };
  }

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Allow Mimosa to access your location?',
          message:
            "I would have to pay to use Google's location dropdown, and this is a free app...",
          buttonNegative: "Don't Allow",
          buttonPositive: 'Allow',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            this.setState({
              locationValue: LocationEnum.HAS_LOCATION,
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            });
          },
          error => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      } else {
        this.setState({ locationValue: LocationEnum.LOCATION_DENIED });
      }
    } catch (err) {
      console.warn(err);
    }
  }

  componentDidMount() {
    this.requestLocationPermission().then(() => {});
  }

  useCurrentPosOnPress = () => {
    this.props.navigation.navigate('FoodSelection', {
      longitude: this.state.longitude,
      latitude: this.state.latitude,
    });
  };

  renderUseCurrentPosButton() {
    if (this.state.locationValue === LocationEnum.HAS_LOCATION) {
      return (
        <Button
          title={'Use Current Location'}
          onPress={this.useCurrentPosOnPress}
        />
      );
    } else {
      return null;
    }
  }

  retryInProvidingPermission = () => {
    this.requestLocationPermission();
  };

  renderRetryPermission() {
    if (this.state.locationValue === LocationEnum.LOCATION_DENIED) {
      return (
        <Button
          title={'Request Permission'}
          onPress={this.retryInProvidingPermission}
        />
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/img/location-background.jpg')}
          style={{
            flex: 1,
            width: null,
            height: null,
            justifyContent: 'center',
          }}>
          <View style={{ alignSelf: 'center' }}>
            {this.renderUseCurrentPosButton()}
            {this.renderRetryPermission()}
          </View>
        </ImageBackground>
      </View>
    );
  }
}
