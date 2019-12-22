import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class FoodListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // likedFood: [
      //   {
      //     id: 0,
      //     image:
      //       'https://media.gettyimages.com/photos/different-types-of-food-on-rustic-wooden-table-picture-id861188910?s=612x612',
      //   },
      //   {
      //     id: 1,
      //     image:
      //       'https://assets.myfoodandfamily.com/adaptivemedia/rendition/159271_3000x2000.jpg?id=bc8c1bbde9e3bf467a31ddbd3e33c26581215205&ht=650&wd=1004&clid=pim',
      //   },
      //   {
      //     id: 2,
      //     image:
      //       'https://assets.myfoodandfamily.com/adaptivemedia/rendition/159271_3000x2000.jpg?id=bc8c1bbde9e3bf467a31ddbd3e33c26581215205&ht=650&wd=1004&clid=pim',
      //   },
      //   {
      //     id: 3,
      //     image:
      //       'https://assets.myfoodandfamily.com/adaptivemedia/rendition/159271_3000x2000.jpg?id=bc8c1bbde9e3bf467a31ddbd3e33c26581215205&ht=650&wd=1004&clid=pim',
      //   },
      //   {
      //     id: 4,
      //     image:
      //       'https://assets.myfoodandfamily.com/adaptivemedia/rendition/159271_3000x2000.jpg?id=bc8c1bbde9e3bf467a31ddbd3e33c26581215205&ht=650&wd=1004&clid=pim',
      //   },
      //   {
      //     id: 5,
      //     image:
      //       'https://assets.myfoodandfamily.com/adaptivemedia/rendition/159271_3000x2000.jpg?id=bc8c1bbde9e3bf467a31ddbd3e33c26581215205&ht=650&wd=1004&clid=pim',
      //   },
      //   {
      //     id: 6,
      //     image:
      //       'https://assets.myfoodandfamily.com/adaptivemedia/rendition/159271_3000x2000.jpg?id=bc8c1bbde9e3bf467a31ddbd3e33c26581215205&ht=650&wd=1004&clid=pim',
      //   },
      //   {
      //     id: 7,
      //     image:
      //       'https://assets.myfoodandfamily.com/adaptivemedia/rendition/159271_3000x2000.jpg?id=bc8c1bbde9e3bf467a31ddbd3e33c26581215205&ht=650&wd=1004&clid=pim',
      //   },
      //   {
      //     id: 8,
      //     image:
      //       'https://assets.myfoodandfamily.com/adaptivemedia/rendition/159271_3000x2000.jpg?id=bc8c1bbde9e3bf467a31ddbd3e33c26581215205&ht=650&wd=1004&clid=pim',
      //   },
      //   {
      //     id: 9,
      //     image:
      //       'https://assets.myfoodandfamily.com/adaptivemedia/rendition/159271_3000x2000.jpg?id=bc8c1bbde9e3bf467a31ddbd3e33c26581215205&ht=650&wd=1004&clid=pim',
      //   },
      // ],
      likedFood: this.props.navigation.getParam('likedFood'),
    };
  }

  iTouchedIt = key => {
    console.log('pressed: ' + key);
  };
  //
  // renderStars = (stars) => {
  //   const emptyStars = Math.ceil(stars) - 5;
  //   if (stars % 1 !== 0) {
  //     // return a half star
  //   }
  //   return (
  //
  //   );
  // }

  renderItems = (food, key) => {
    return (
      <TouchableHighlight key={key} onPress={this.iTouchedIt}>
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
              source={{ uri: food.image }}
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
    return (
      <ScrollView>
        {this.state.likedFood.map((food, key) => {
          return this.renderItems(food, key);
        })}
      </ScrollView>
    );
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
