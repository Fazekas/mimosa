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
      renderedArray: [],
    };
  }

  state = { locationText: '', isLoading: false };

  componentDidMount() {
    let foodArray = yelpData.map((foodItem, index) => {
      foodItem['id'] = index;
      foodItem['image'] = foodItem.photos[0];
      return foodItem;
    });

    let arrayToRender = [];
    if (foodArray.length > 10) {
      arrayToRender = foodArray.slice(0, 10);
      foodArray = foodArray.slice(10);
    } else {
      arrayToRender = foodArray;
      foodArray = [];
    }

    this.setState({ foodArray: foodArray , renderedArray: arrayToRender});
  }

  likedFood(id) {
    this.setState(prevState => {
      return {
        likedFood: prevState.likedFood.concat(prevState.renderedArray[prevState.renderedArray.findIndex(item => item.id === id)]),
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
      renderedArray: prevState.renderedArray.filter(foodItem => foodItem.id !== id),
    }));
    this.addToRenderedList();
  }

  // feeds the food array to the renderedList to fix performance
  addToRenderedList() {
    if (this.state.renderedArray.length <= 5) {
      let renderedArray = this.state.renderedArray;
      let foodArray = this.state.foodArray;

      if (this.state.foodArray.length > 5) {
        renderedArray = renderedArray.concat(foodArray.slice(0, 5));
        foodArray = foodArray.slice(5);
        this.setState({renderedArray: renderedArray, foodArray: foodArray});
      } else {
        renderedArray.concat(foodArray);
        foodArray = [];
        this.setState({renderedArray: renderedArray, foodArray: foodArray});
      }
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, backgroundColor: '#dcdcdc'}}>
        {this.state.renderedArray
          .map(item => (
            <FoodCardComponent
              item={item}
              key={item.id}
              likedFood={this.likedFood.bind(this)}
              removeFood={this.removeFood.bind(this)}
            />
          )).reverse()}
      </View>
    );
  }
}
