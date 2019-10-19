/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from 'react-navigation';
import LocationComponent from "./component/LocationComponent";
import FoodSelectionComponent from "./component/FoodSelectionComponent";
import LoginComponent from "./component/LoginComponent";

const MainNavigator = createStackNavigator({
  Login: {screen: LoginComponent},
  Location: {screen: LocationComponent},
  FoodSelection: {screen: FoodSelectionComponent},
});

const App = createAppContainer(MainNavigator);

export default App;
