import { createStackNavigator } from 'react-navigation-stack';
import FoodSelectionComponent from './FoodSelectionComponent';
import HomeComponent from './HomeComponent';
import LoginComponent from './LoginComponent';
import CreateUserComponent from './CreateUserComponent';
import LocationComponent from './LocationComponent';
import { createAppContainer } from 'react-navigation';
import FoodListComponent from './FoodListComponent';

const MainNavigator = createStackNavigator(
  {
    FoodSelection: { screen: FoodSelectionComponent },
    FoodList: { screen: FoodListComponent },
    Home: { screen: HomeComponent },
    Login: { screen: LoginComponent },
    CreateUser: { screen: CreateUserComponent },
    Location: { screen: LocationComponent },
  },
  { headerMode: 'none' },
);

export const AppContainer = createAppContainer(MainNavigator);
