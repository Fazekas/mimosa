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
import { Image } from 'react-native-elements';
import { Query } from 'react-apollo';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';
import { searchQuery } from './GraphQLQueries';

export default class FoodSelectionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDraggable: true,
      dropZoneValues: null,
      likedFoodValues: null,
      disLikedFoodValues: null,
      imageContainerHeight: 500,
      pageValues: null,
      pan: new Animated.ValueXY(),
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          // dx: this.state.pan.x,
          dy: this.state.pan.y,
          vx: this.state.pan.vx,
        },
      ]),
      onPanResponderRelease: (e, gesture) => {
        if (this.isLikedFoodZone(gesture)) {
          this.setState({
            showDraggable: false,
          });
        }
        // if (this.isDisLikedFoodZone(gesture)) {
        //   this.setState({
        //     showDraggable: false,
        //   });
        // }
        Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();
      },
    });
  }

  isDropZone(gesture) {
    const dz = this.state.dropZoneValues;
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  }

  isLikedFoodZone(gesture) {
    // console.log(gesture.vy);
    // console.log(gesture.vx);
    // const dz = this.state.likedFoodValues;
    // return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  }

  isDisLikedFoodZone(gesture) {
    const dz = this.state.disLikedZoneValues;
    // console.log(dz.y);
    // console.log(dz.height);
    // console.log(gesture.moveY);
    return gesture.moveY < dz.y && gesture.moveY > dz.y - dz.height;
  }

  setDisLikedFoodValues(event) {
    this.setState({
      disLikedZoneValues: event.nativeEvent.layout,
    });
  }

  setLikedFoodValues(event) {
    this.setState({
      likedFoodValues: event.nativeEvent.layout,
    });
  }

  setDropZoneValues(event) {
    this.setState({
      dropZoneValues: event.nativeEvent.layout,
    });
  }

  setPageValues(event) {
    this.setState({
      pageValues: event.nativeEvent.layout,
    });
  }

  setContainerLayout(event) {
    console.log(event.nativeEvent.layout.height);
    this.setState({
      imageContainerHeight: event.nativeEvent.layout.height,
    });
  }

  state = { locationText: '', isLoading: false };

  // renderDraggable() {
  //   if (this.state.showDraggable) {
  //     return (
  //         <View style={styles.draggableContainer}>
  //           <Animated.Image source={{uri: 'https://assets.myfoodandfamily.com/adaptivemedia/rendition/159271_3000x2000.jpg?id=bc8c1bbde9e3bf467a31ddbd3e33c26581215205&ht=650&wd=1004&clid=pim'}} style={[this.state.pan.getLayout(), styles.circle]} {...this.panResponder.panHandlers}>
  //             {/*<Text style={styles.text}>Drag me!</Text>*/}
  //             {/*<Image style={{width: 300, height: 300}}*/}
  //             {/*source={{uri: 'https://assets.myfoodandfamily.com/adaptivemedia/rendition/159271_3000x2000.jpg?id=bc8c1bbde9e3bf467a31ddbd3e33c26581215205&ht=650&wd=1004&clid=pim'}}*/}
  //             {/*/>*/}
  //           </Animated.Image>
  //         </View>
  //     )
  //   }
  // }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={[styles.newMainContainer, styles.cardShadow]}>
        {/*<Query query={searchQuery}>*/}
        {/*{({ loading, error, data }) => {*/}
        {/*console.log(data.search.business);*/}
        {/*return null;*/}
        {/*}}*/}
        {/*</Query>*/}
        <View style={[styles.bottomCard, styles.card]}>
          <Image
            style={{ height: this.state.imageContainerHeight }}
            resizeMode="cover"
            source={{
              uri:
                'https://assets.myfoodandfamily.com/adaptivemedia/rendition/159271_3000x2000.jpg?id=bc8c1bbde9e3bf467a31ddbd3e33c26581215205&ht=650&wd=1004&clid=pim',
            }}
          />
        </View>
        <Animated.View
          style={[this.state.pan.getLayout(), styles.card, styles.cardShadow]}
          {...this.panResponder.panHandlers}
          onLayout={this.setContainerLayout.bind(this)}>
          <Image
            style={{ height: this.state.imageContainerHeight }}
            source={{
              uri:
                'https://assets.myfoodandfamily.com/adaptivemedia/rendition/159271_3000x2000.jpg?id=bc8c1bbde9e3bf467a31ddbd3e33c26581215205&ht=650&wd=1004&clid=pim',
            }}
            resizeMode="cover"
          />
        </Animated.View>
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
  newMainContainer: {
    margin: 20,

    // shadow
    shadowOpacity: 0.8,
    borderRadius: 10,
  },
  card: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 10,

    //  shadow
    shadowOpacity: 0.8,
  },
  cardShadow: {
    shadowRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    borderBottomWidth: 0,
    borderWidth: 1,
    shadowOpacity: 0.8,
    borderColor: '#ddd',
    elevation: 1,
  },
  bottomCard: {
    position: 'absolute',
  },
});
