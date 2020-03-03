// https://www.instamobile.io/react-native-controls/react-native-swipe-cards-tinder/
import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class FoodCardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDraggable: true,
      pageValues: null,
      pan: new Animated.ValueXY(),
    };

    this.likeOpacity = this.state.pan.y.interpolate({
      inputRange: [-SCREEN_HEIGHT / 2, 0, SCREEN_HEIGHT / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });

    this.dislikeOpacity = this.state.pan.y.interpolate({
      inputRange: [-SCREEN_HEIGHT / 2, 0, SCREEN_HEIGHT / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp',
    });

    this.cardOpacity = new Animated.Value(1);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,

      onStartShouldSetPanResponderCapture: () => false,

      onMoveShouldSetPanResponder: () => true,

      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderMove: Animated.event([
        null,
        {
          // dx: this.state.pan.x,
          dy: this.state.pan.y,
          vx: this.state.pan.vx,
        },
      ]),
      onPanResponderRelease: (e, gesture) => {
        if (gesture.dx < -125) {
          this.props.goToNextScreen();
        } else if (gesture.dy > SCREEN_HEIGHT / 3) {
          Animated.parallel([
            Animated.timing(this.state.pan.y, {
              toValue: SCREEN_HEIGHT,
              duration: 200,
            }),
            Animated.timing(this.cardOpacity, {
              toValue: 0,
              duration: 200,
            }),
          ]).start(() => {
            this.props.likedFood(this.props.item.id);
          });
        } else if (gesture.dy < -SCREEN_HEIGHT / 3) {
          Animated.parallel([
            Animated.timing(this.state.pan.y, {
              toValue: -SCREEN_HEIGHT,
              duration: 200,
            }),
            Animated.timing(this.cardOpacity, {
              toValue: 0,
              duration: 200,
            }),
          ]).start(() => {
            this.props.removeFood(this.props.item.id);
          });
        } else {
          Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();
        }
      },
    });
  }

  render() {
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[
          this.state.pan.getLayout(),
          styles.card,
          { opacity: this.cardOpacity },
        ]}>
        <View style={{ elevation: 2, flex: 1, borderRadius: 10 }}>
          <Image
            style={{
              flex: 1,
              borderRadius: 10,
              height: null,
              width: null,
              resizeMode: 'cover',
            }}
            source={this.props.item.image}
          />
          <Animated.View
            style={[
              styles.textContainer,
              styles.likeContainer,
              { opacity: this.likeOpacity },
            ]}>
            <Text style={[styles.text, styles.like]}>LIKE</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.textContainer,
              styles.dislikeContainer,
              { opacity: this.dislikeOpacity },
            ]}>
            <Text style={[styles.text, styles.disLike]}>DISLIKE</Text>
          </Animated.View>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    position: 'absolute',
    padding: 10,
  },
  text: {
    flex: 1,
    zIndex: 2,
    padding: 10,
    fontSize: 32,
    fontWeight: '300',
    borderWidth: 5,
    borderRadius: 10,
  },
  like: {
    color: 'green',
    borderColor: 'green',
  },
  disLike: {
    color: 'red',
    borderColor: 'red',
  },
  likeContainer: {
    top: 25,
  },
  dislikeContainer: {
    bottom: 25,
  },
  textContainer: {
    flex: 1,
    position: 'absolute',
    padding: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
