import React, { Component } from 'react';
import {
  Alert,
  BackHandler,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackActions, NavigationActions } from 'react-navigation';

export default class FoodListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likedFood: this.props.navigation.getParam('likedFood'),
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.props.navigation.isFocused()) {
        const reset = () => {
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Location' })],
          });
          this.props.navigation.dispatch(resetAction);
        };

        if (this.state.likedFood.length) {
          Alert.alert(
            '',
            'Are you sure you want to go back? Pressing OK will clear your selections.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'OK', onPress: () => reset() },
            ],
          );
        } else {
          reset();
        }
        return true;
      }
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  itemPressed = food => {
    this.props.navigation.navigate('FoodDetail', { selectedFood: food });
  };

  renderItems = (food, key) => {
    return (
      <TouchableHighlight key={key} onPress={() => this.itemPressed(food)}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#dcdcdc',
            width: '100%',
            borderWidth: 0.5,
            borderRadius: 5,
            elevation: 0,
            shadowOpacity: 0,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 2 },
            borderColor: 'rgba(0,0,0,0.30)',
            padding: 10,
            paddingRight: 0,
          }}>
          <View style={{ flex: 1, width: 100, height: 100 }}>
            <Image
              key={key}
              style={{
                flex: 1,
                borderRadius: 10,
                height: null,
                width: null,
                resizeMode: 'cover',
              }}
              source={food.image}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 2,
              paddingLeft: 10,
            }}>
            <Text>
              <Text style={styles.boldText}>Name: </Text>
              <Text>{food.name}</Text>
            </Text>
            <Text>
              <Text style={styles.boldText}>Rating: </Text>
              <Text>{food.rating}</Text>
            </Text>
            {/*<StarRatingComponent rating={food.rating}/>*/}
            <Text>
              <Text style={styles.boldText}>Address: </Text>
              <Text>
                {food.location.address1}, {food.location.city},{' '}
                {food.location.state}
              </Text>
            </Text>
          </View>
          <View style={{ alignSelf: 'center' }}>
            <Icon style={{}} name="chevron-right" size={30} color="black" />
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    if (this.state.likedFood.length) {
      return (
        <ScrollView>
          {this.state.likedFood.map((food, key) => {
            return this.renderItems(food, key);
          })}
        </ScrollView>
      );
    } else {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            flexWrap: 'wrap',
            padding: 40,
          }}>
          <Text style={{ fontSize: 24 }}>Uh Oh!</Text>
          <Text style={{ fontSize: 16 }}>
            Looks like you did not like any food. Please go back and swipe down
            on an item
          </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 0.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  boldText: {
    fontWeight: 'bold',
  },
});
