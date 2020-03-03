// Used https://moduscreate.com/blog/animated_drag_and_drop_with_react_native/ for animations
import React from 'react';
import {View, Text, Animated, ActivityIndicator} from 'react-native';
import {Overlay} from 'react-native-elements';
import {searchQueryFunction} from './GraphQLQueries';
import FoodCardComponent from './FoodCardComponent';
import {yelpData} from './SampleData';
import ToolTipComponent from './ToolTipComponent';
import AsyncStorage from '@react-native-community/async-storage';
import {client} from '../App';

const MIMOSA_FTU_KEY = 'MimosaIsFTU';
export default class FoodSelectionComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      showNoMoreCardsView: false,
      isFTU: false,
      hasError: false,
      likedFood: [],
      foodArray: [],
      renderedArray: [],
    };
  }

  state = {locationText: '', isLoading: false};
  FAKE_DATA = false;

  componentDidMount() {
    if (this.FAKE_DATA) {
      let foodArray = yelpData.map((foodItem, index) => {
        foodItem['id'] = index;
        if (foodItem.photos) {
          foodItem['image'] = {uri: foodItem.photos[0]};
        } else {
          foodItem['image'] = require('../assets/img/No-Image-Found.png');
        }
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
      });
    } else {
      const longitude = this.props.navigation.getParam('longitude');
      const latitude = this.props.navigation.getParam('latitude');

      if (longitude && latitude) {
        const gqlQuery = client.query({
          query: searchQueryFunction(latitude, longitude),
        });

        // TODO this might be the cause of a memory leak
        Promise.all([gqlQuery, this.getData()])
          .then(values => {
            const graphQLResponse = values[0];
            const isFTU = values[1];

            let foodArray = graphQLResponse.data.search.business.map(
              (foodItem, index) => {
                foodItem['id'] = index;
                if (foodItem.photos) {
                  foodItem['image'] = {uri: foodItem.photos[0]};
                } else {
                  foodItem[
                    'image'
                  ] = require('../assets/img/No-Image-Found.png');
                }
                return foodItem;
              },
            );

            let arrayToRender = [];

            if (foodArray.length > 10) {
              arrayToRender = foodArray.slice(0, 10);
              foodArray = foodArray.slice(10);
            } else {
              arrayToRender = foodArray;
              foodArray = [];
            }

            this.setState({
              foodArray: foodArray,
              renderedArray: arrayToRender,
              isFTU: !!!isFTU,
            });
          })
          .catch(error => {
            console.log(error);
            this.setState({hasError: true});
          });
      }
    }
  }

  getData = async () => {
    try {
      return await AsyncStorage.getItem(MIMOSA_FTU_KEY);
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  storeData = async () => {
    this.setState({isFTU: false});
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
        this.setState({renderedArray: renderedArray, foodArray: foodArray});
      } else {
        renderedArray.concat(foodArray);
        foodArray = [];
        this.setState({renderedArray: renderedArray, foodArray: foodArray});
      }
    }
  }

  renderOverlay() {
    return (
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
            containerStyle={{width: 150, alignSelf: 'flex-end'}}
          />
          <ToolTipComponent
            direction="bottom"
            text={'Swipe down to like the item'}
          />
        </View>
      </Overlay>
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#dcdcdc',
          }}>
          <Text style={{fontSize: 24}}>Uh Oh!</Text>
          <Text style={{fontSize: 16}}>
            Looks like there was an error. Please try again
          </Text>
        </View>
      );
    } else if (!this.state.hasError && !this.state.renderedArray.length) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#dcdcdc',
          }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <View style={{flex: 1, backgroundColor: '#dcdcdc'}}>
          {this.renderOverlay()}
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
}
