import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ToolTipComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let tipPosition;
    switch (this.props.direction) {
      case 'top':
        tipPosition = styles.toolTipPointTop;
        break;
      case 'bottom':
        tipPosition = styles.toolTipPointBottom;
        break;
      case 'left':
        tipPosition = styles.tooltipPointLeft;
        break;
      case 'right':
        tipPosition = styles.toolTipPointRight;
        break;
      default:
        tipPosition = styles.toolTipPointTop;
    }
    return (
      <View style={[styles.toolTipContainer, this.props.containerStyle]}>
        <View style={[styles.toolTipPoint, tipPosition]} />
        <Text style={styles.toolTipText}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolTipText: {
    color: 'white',
  },
  toolTipContainer: {
    backgroundColor: '#0033EE',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  toolTipPoint: {
    width: 25,
    height: 25,
    backgroundColor: '#0033EE',
    alignSelf: 'center',
    position: 'absolute',
    transform: [{ rotate: '45deg' }],
  },
  toolTipPointTop: {
    top: -12,
  },
  toolTipPointBottom: {
    bottom: -12,
  },
  toolTipPointRight: {
    right: -12,
  },
  tooltipPointLeft: {
    left: -12,
  },
});
