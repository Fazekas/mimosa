/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppContainer} from './component/NavigationComponent';
import {Platform} from 'react-native';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: Platform.select({
      ios: 'https://api.yelp.com/v3/graphql',
      android: 'https://api.yelp.com/v3/graphql',
    }),
    headers: {
      Authorization:
        'Bearer qpT_z7Gmx7cplj0DCUEh6oz-b_3eL_qyiAYT85x6_6Y9tZN6NCh9DxYjkztRpylATmo1u8bj6SURf6gJpNppMfkReuelTpTz4ZcAayU1dEyZlvKDsCH5KC-qGbjFXXYx',
    },
  }),
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer />
      </ApolloProvider>
    );
  }
}
