// Used https://moduscreate.com/blog/animated_drag_and_drop_with_react_native/ for animations
import React from 'react';
import { View, Text, StyleSheet, PanResponder, Animated, Dimensions } from 'react-native';
import { Image } from 'react-native-elements'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'

export default class FoodSelectionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDraggable: true,
      dropZoneValues: null,
      likedFoodValues: null,
      disLikedFoodValues: null,
      pan: new Animated.ValueXY()
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {
        dx: this.state.pan.x,
        dy: this.state.pan.y
      }]),
      onPanResponderRelease: (e, gesture) => {
        if (this.isLikedFoodZone(gesture)) {
          this.setState({
            showDraggable: false
          });
        }
        if (this.isDisLikedFoodZone(gesture)) {
          this.setState({
            showDraggable: false,
          });
        }
        Animated.spring(
            this.state.pan,
            {toValue: {x: 0, y:0}}
        ).start();
      },
    });
  }

  isDropZone(gesture) {
    const dz = this.state.dropZoneValues;
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  }

  isLikedFoodZone(gesture) {
    const dz = this.state.likedFoodValues;
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  }

  isDisLikedFoodZone(gesture) {
    const dz = this.state.disLikedZoneValues;
    console.log(dz.y);
    console.log(dz.height);
    console.log(gesture.moveY); 
    return gesture.moveY < dz.y && gesture.moveY > dz.y - dz.height;
  }

  setDisLikedFoodValues(event) {
    this.setState({
      disLikedZoneValues: event.nativeEvent.layout
    });
  }

  setLikedFoodValues(event) {
    this.setState({
      likedFoodValues: event.nativeEvent.layout
    });
  }

  setDropZoneValues(event) {
    this.setState({
      dropZoneValues: event.nativeEvent.layout
    });
  }

    state = { locationText: '', isLoading: false };

    renderDraggable() {
      if (this.state.showDraggable) {
        return (
            <View style={styles.draggableContainer}>
              <Animated.Image source={{uri: 'https://assets.myfoodandfamily.com/adaptivemedia/rendition/159271_3000x2000.jpg?id=bc8c1bbde9e3bf467a31ddbd3e33c26581215205&ht=650&wd=1004&clid=pim'}} style={[this.state.pan.getLayout(), styles.circle]} {...this.panResponder.panHandlers}>
                {/*<Text style={styles.text}>Drag me!</Text>*/}
                {/*<Image style={{width: 300, height: 300}}*/}
                {/*source={{uri: 'https://assets.myfoodandfamily.com/adaptivemedia/rendition/159271_3000x2000.jpg?id=bc8c1bbde9e3bf467a31ddbd3e33c26581215205&ht=650&wd=1004&clid=pim'}}*/}
                {/*/>*/}
              </Animated.Image>
            </View>
        )
      }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
                <View style={styles.mainContainer}>
                  {/*<View>*/}
                  {/*<Text>Select Food</Text>*/}
                  {/*<GestureRecognizer onSwipe={this.onSwipe}*/}
                  {/*config={config}>*/}
                  {/*<Image style={{width: 300, height: 300}}*/}
                  {/*source={{uri: 'https://assets.myfoodandfamily.com/adaptivemedia/rendition/159271_3000x2000.jpg?id=bc8c1bbde9e3bf467a31ddbd3e33c26581215205&ht=650&wd=1004&clid=pim'}}*/}
                  {/*/>*/}
                  {/*</GestureRecognizer>*/}
                  {/*</View>*/}
                  {/*<Animated.View>*/}
                  {/*<Text>HELlo</Text>*/}
                  {/*</Animated.View>*/}
                  <View style={styles.likedZone} onLayout={this.setLikedFoodValues.bind(this)}>
                    <Text style={styles.text}>Drop me here!</Text>
                  </View>
                  {this.renderDraggable()}
                  <View style={styles.disLikeZone} onLayout={this.setDisLikedFoodValues.bind(this)}>
                    <Text style={styles.text}>Drop me here!</Text>
                  </View>
                </View>
        );
    }
}

const circle_radius = 36;
// TODO find better way to get these values since screens can have different sizes
const IMG_SIZE = 300;
const IMG_PADDING_LEFT = 50;
const IMG_PADDING_TOP = 350;
let window = Dimensions.get('window');
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  likedZone: {
    height: 150,
    backgroundColor: '#2c3e50'
  },
  disLikeZone: {
    height: 150,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#2c3',
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight:5,
    textAlign: 'center',
    color: '#fff'
  },
  draggableContainer: {
    position: 'absolute',
    top: window.height/2 - circle_radius,
    left: window.width/2 - circle_radius
  },
  circle: {
    backgroundColor: '#111111',
    transform: [
      {translateX: -(window.width/2 - IMG_SIZE/2 + IMG_PADDING_LEFT)},
      {translateY: -window.height/2 - IMG_SIZE/2 + IMG_PADDING_TOP},
    ],
    width: 300,
    height: 300,
  }
});