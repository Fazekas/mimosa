import React, { Component } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Button,
  Alert,
} from 'react-native';
import StarRatingComponent from './StarRatingComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TouchableButtonComponent from './TouchableButtonComponent';
import { NavigationActions, StackActions } from 'react-navigation';

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
export default class FoodDetailComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFood: this.props.navigation.getParam('selectedFood'),
      showHours: false,
    };
  }

  restart = () => {
    Alert.alert(
      '',
      'Are you sure you want to restart? Pressing OK will clear your selections.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Location' })],
            });
            this.props.navigation.dispatch(resetAction);
          },
        },
      ],
    );
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  openMap = () => {
    const address = this.state.selectedFood.location.address1;
    const name = this.state.selectedFood.name;
    const url = Platform.select({
      ios: () => `http://maps.apple.com/maps?daddr=${name} ${address}`,
      android: () => `http://maps.google.com/maps?daddr=${name} ${address}`,
    });

    Linking.canOpenURL(url()).then(canOpen => {
      if (canOpen) {
        Linking.openURL(url());
      }
    });
  };

  call = () => {
    const phoneNumber = this.state.selectedFood.display_phone;
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).then(canOpen => {
      if (canOpen) {
        Linking.openURL(url);
      }
    });
  };

  openYelp = () => {
    const url = this.state.selectedFood.url;
    Linking.canOpenURL(url).then(canOpen => {
      if (canOpen) {
        Linking.openURL(url);
      }
    });
  };

  toggleDisplayHours = () => {
    this.setState(prevState => ({ showHours: !prevState.showHours }));
  };

  displayPrice = () => {
    if (this.state.selectedFood.price) {
      return (
        <Text style={{ fontSize: 30 }}>·{this.state.selectedFood.price}</Text>
      );
    }
  };

  formatTime = time => {
    let hours24 = parseInt(time.substring(0, 2));
    let hours = ((hours24 + 11) % 12) + 1;
    let amPm = hours24 > 11 ? 'pm' : 'am';
    let minutes = time.substring(2);

    return hours + ':' + minutes + amPm;
  };

  handleTimeStr = isOpen => {
    const todaysDate = new Date();
    const weekDayEnum = (todaysDate.getDay() - 1) % 6;

    if (isOpen) {
      return this.formatTime(
        this.state.selectedFood.hours[0].open[weekDayEnum].end,
      );
    } else {
      return this.formatTime(
        this.state.selectedFood.hours[0].open[weekDayEnum].start,
      );
    }
  };

  hasHours = () => {
    if (this.state.selectedFood.hours.length > 0) {
      return (
        <View style={[styles.card, styles.businessHourCard]}>
          <TouchableWithoutFeedback onPress={this.toggleDisplayHours}>
            <View style={styles.hoursContainer}>{this.renderHours()}</View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
  };

  renderHours = () => {
    if (this.state.showHours) {
      return (
        <View>
          {this.state.selectedFood.hours[0].open.map(day => (
            <View key={day.day} style={{ flexDirection: 'row' }}>
              <Text>{DAYS_OF_WEEK[day.day]}: </Text>
              <Text>
                {this.formatTime(day.start)} - {this.formatTime(day.end)}
              </Text>
            </View>
          ))}
        </View>
      );
    } else {
      let isOpenStr;
      let timeTillStr;
      if (this.state.selectedFood.hours[0].is_open_now) {
        isOpenStr = 'Open';
        timeTillStr = ` · Closes at ${this.handleTimeStr(true)}`;
      } else {
        isOpenStr = 'Closed';
        timeTillStr = ` · Opens at ${this.handleTimeStr(false)}`;
      }
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'red' }}>{isOpenStr}</Text>
          <Text>{timeTillStr}</Text>
          <Icon name="arrow-drop-down" size={24} />
        </View>
      );
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#dcdcdc' }}>
        <View style={[styles.restartContainer]}>
          <Icon name="arrow-back" size={32} onPress={this.goBack} />
          <Button title="Restart" onPress={this.restart} />
        </View>
        <View style={[styles.card, styles.informationCard]}>
          <View style={{ flex: 1 }}>
            <Image
              source={this.state.selectedFood.image}
              style={styles.foodImage}
            />
          </View>
          <View style={{ flex: 0.5, alignItems: 'center' }}>
            <Text style={{ fontSize: 25 }}>{this.state.selectedFood.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <StarRatingComponent
                rating={this.state.selectedFood.rating}
                size={24}
              />
              {this.displayPrice()}
            </View>
            <Text>{this.state.selectedFood.display_phone}</Text>
            <Text>
              <Text>
                {this.state.selectedFood.location.address1},{' '}
                {this.state.selectedFood.location.city},{' '}
                {this.state.selectedFood.location.state}
              </Text>
            </Text>
          </View>
        </View>
        <View style={[styles.card, styles.actionCard]}>
          <TouchableButtonComponent
            size={36}
            text={'Directions'}
            iconName={'directions'}
            action={this.openMap.bind(this)}
          />
          <TouchableButtonComponent
            size={36}
            text={'Call'}
            iconName={'call'}
            action={this.call.bind(this)}
          />
          <TouchableButtonComponent
            size={36}
            text={'Yelp'}
            iconName={'public'}
            action={this.openYelp.bind(this)}
          />
        </View>
        {this.hasHours()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  restartContainer: {
    backgroundColor: 'white',
    padding: 10,
    alignContent: 'center',
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 3,
  },
  informationCard: {
    margin: 10,
    marginBottom: 8,
    flex: 1,
    padding: 20,
  },
  actionCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
    marginTop: 0,
  },
  businessHourCard: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginTop: 0,
  },
  foodImage: {
    flex: 1,
    borderRadius: 10,
    height: null,
    width: null,
    resizeMode: 'cover',
  },
  hoursContainer: {
    flexDirection: 'row',
    padding: 20,
  },
});
