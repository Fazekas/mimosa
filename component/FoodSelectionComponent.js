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
import { Image, Card, Overlay, Tooltip } from 'react-native-elements';
import { Query } from 'react-apollo';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';
import { searchQuery } from './GraphQLQueries';
import FoodCardComponent from './FoodCardComponent';
import { yelpData } from './SampleData';
import ToolTipComponent from './ToolTipComponent';
import AsyncStorage from '@react-native-community/async-storage';

const MIMOSA_FTU_KEY = 'MimosaIsFTU';
export default class FoodSelectionComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      showNoMoreCardsView: false,
      isFTU: false,
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

    this.getData().then(isFTU => {
      this.setState({
        foodArray: foodArray,
        renderedArray: arrayToRender,
        isFTU: !!!isFTU,
      });
      // this.setState({
      //   foodArray: [],
      //   renderedArray: [],
      //   isFTU: !!!isFTU,
      // });
    });
  }

  HandleQueryData() {}

  getData = async () => {
    try {
      return await AsyncStorage.getItem(MIMOSA_FTU_KEY);
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  storeData = async () => {
    this.setState({ isFTU: false });
    try {
      await AsyncStorage.setItem(MIMOSA_FTU_KEY, 'true');
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  goToNextScreen = () => {
    this.props.navigation.navigate('FoodList', {
      likedFood: this.state.likedFood,
    });
  };

  likedFood(id) {
    this.setState(prevState => {
      return {
        likedFood: prevState.likedFood.concat(
          prevState.renderedArray[
            prevState.renderedArray.findIndex(item => item.id === id)
          ],
        ),
      };
    });
    this.removeFood(id);
  }

  removeFood(id) {
    this.setState(prevState => ({
      renderedArray: prevState.renderedArray.filter(
        foodItem => foodItem.id !== id,
      ),
    }));

    this.addToRenderedList();

    if (!this.state.foodArray.length && !this.state.renderedArray.length) {
      this.goToNextScreen();
    }
  }

  // feeds the food array to the renderedList to fix performance
  addToRenderedList() {
    if (this.state.renderedArray.length <= 5) {
      let renderedArray = this.state.renderedArray;
      let foodArray = this.state.foodArray;

      if (this.state.foodArray.length > 5) {
        renderedArray = renderedArray.concat(foodArray.slice(0, 5));
        foodArray = foodArray.slice(5);
        this.setState({ renderedArray: renderedArray, foodArray: foodArray });
      } else {
        renderedArray.concat(foodArray);
        foodArray = [];
        this.setState({ renderedArray: renderedArray, foodArray: foodArray });
      }
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, backgroundColor: '#dcdcdc' }}>
        <Overlay
          overlayStyle={{
            backgroundColor: 'transparent',
            elevation: 0,
            flex: 0.9,
          }}
          isVisible={this.state.isFTU}
          onBackdropPress={this.storeData}
          children={[View]}>
          <View
            style={{
              justifyContent: 'space-between',
              flex: 1,
              alignItems: 'center',
            }}>
            <ToolTipComponent
              direction={'top'}
              text={'Swipe up to dislike the item'}
            />
            <ToolTipComponent
              direction={'right'}
              text={
                'Swipe left when you are done to see more details on the food you liked'
              }
              containerStyle={{ width: 150, alignSelf: 'flex-end' }}
            />
            <ToolTipComponent
              direction="bottom"
              text={'Swipe down to like the item'}
            />
          </View>
        </Overlay>
        {this.state.renderedArray
          .map(item => (
            <FoodCardComponent
              item={item}
              key={item.id}
              likedFood={this.likedFood.bind(this)}
              removeFood={this.removeFood.bind(this)}
              goToNextScreen={this.goToNextScreen.bind(this)}
            />
          ))
          .reverse()}
      </View>
    );
  }
}
