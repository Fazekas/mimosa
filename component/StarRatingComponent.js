import React, {Component} from "react";
import {View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class StarRatingComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const stars =  [];
        let starName = '';

        for(let i = 1; i <= 5; i++) {
            if (i <= this.props.rating) {
                starName = 'star'
            }
            else if (this.props.rating % 1 !== 0) {
                starName = 'star-half'
            } else {
                starName = 'star-border'
            }

            stars.push(<Icon name={starName} key={i} size={this.props.size} color={'black'}/>)
        }

        return (
            <View style={{flexDirection: 'row'}}>
                {stars}
            </View>
        );
    }
}
