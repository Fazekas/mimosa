// Used https://moduscreate.com/blog/animated_drag_and_drop_with_react_native/ for animations
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';
import { Image, Card } from 'react-native-elements';
import { Query } from 'react-apollo';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';
import { searchQuery } from './GraphQLQueries';
import FoodCardComponent from './FoodCardComponent';
import { yelpData } from './SampleData';

export default class FoodSelectionComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      showNoMoreCardsView: false,
      likedFood: [],
      foodArray: [],
    };
  }

  componentDidMount() {
    const foodArray = yelpData.map((foodItem, index) => {
      foodItem['id'] = index;
      foodItem['image'] = foodItem.photos[0];
      return foodItem;
    });

    this.setState({ foodArray: foodArray });
  }

  state = { locationText: '', isLoading: false };

  likedFood(id) {
    this.setState(prevState => {
      return {
        likedFood: prevState.likedFood.concat(prevState.foodArray[prevState.foodArray.findIndex(item => item.id === id)]),
      };
    });
    this.removeFood(id);
    if (this.state.likedFood.length >= 10) {
      this.props.navigation.navigate('FoodList', {
        likedFood: this.state.likedFood,
      });
    }
  }

  removeFood(id) {
    this.setState(prevState => ({
      foodArray: prevState.foodArray.filter(foodItem => foodItem.id !== id),
    }));
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        {this.state.foodArray
          .map(item => (
            <FoodCardComponent
              item={item}
              key={item.id}
              likedFood={this.likedFood.bind(this)}
              removeFood={this.removeFood.bind(this)}
            />
          ))}
      </View>
    );
  }
}
