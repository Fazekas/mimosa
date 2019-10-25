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
import CreateUserComponent from "./component/CreateUserComponent";
import HomeComponent from "./component/HomeComponent";

const MainNavigator = createStackNavigator({
  FoodSelection: {screen: FoodSelectionComponent},
  Home: {screen: HomeComponent},
  Login: {screen: LoginComponent},
  CreateUser: {screen: CreateUserComponent},
  Location: {screen: LocationComponent},

});

const App = createAppContainer(MainNavigator);

export default App;
