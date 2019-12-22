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
      foodArray: [
        {
          id: 0,
          image:
            'https://media.gettyimages.com/photos/different-types-of-food-on-rustic-wooden-table-picture-id861188910?s=612x612',
        },
        {
          id: 1,
          image:
            'https://assets.myfoodandfamily.com/adaptivemedia/rendition/159271_3000x2000.jpg?id=bc8c1bbde9e3bf467a31ddbd3e33c26581215205&ht=650&wd=1004&clid=pim',
        },
        {
          id: 2,
          image:
            'https://assets.myfoodandfamily.com/adaptivemedia/rendition/159271_3000x2000.jpg?id=bc8c1bbde9e3bf467a31ddbd3e33c26581215205&ht=650&wd=1004&clid=pim',
        },
        {
          id: 3,
          image:
            'https://assets.myfoodandfamily.com/adaptivemedia/rendition/159271_3000x2000.jpg?id=bc8c1bbde9e3bf467a31ddbd3e33c26581215205&ht=650&wd=1004&clid=pim',
        },
      ],
      // foodArray: yelpData,
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
        likedFood: prevState.likedFood.concat(this.state.foodArray[id]),
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
          ))
          .reverse()}
      </View>
    );
  }
}

const styles = StyleSheet.create({});
