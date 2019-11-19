import { createStackNavigator } from 'react-navigation-stack';
import FoodSelectionComponent from './FoodSelectionComponent';
import HomeComponent from './HomeComponent';
import LoginComponent from './LoginComponent';
import CreateUserComponent from './CreateUserComponent';
import LocationComponent from './LocationComponent';
import { createAppContainer } from 'react-navigation';

const MainNavigator = createStackNavigator({
  // SelectedList: { screen: SelectedFoodListComponent },
  FoodSelection: { screen: FoodSelectionComponent },
  Home: { screen: HomeComponent },
  Login: { screen: LoginComponent },
  CreateUser: { screen: CreateUserComponent },
  Location: { screen: LocationComponent },
});

export const AppContainer = createAppContainer(MainNavigator);
