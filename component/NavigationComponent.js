import {createStackNavigator} from 'react-navigation-stack';
import FoodSelectionComponent from './FoodSelectionComponent';
import HomeComponent from './HomeComponent';
import LoginComponent from './LoginComponent';
import CreateUserComponent from './CreateUserComponent';
import LocationComponent from './LocationComponent';
import {createAppContainer} from 'react-navigation';
import FoodListComponent from './FoodListComponent';
import FoodDetailComponent from './FoodDetailComponent';
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

const MainNavigator = createStackNavigator(
  {
    FoodSelection: {screen: FoodSelectionComponent},
    FoodList: {screen: FoodListComponent},
    FoodDetail: {screen: FoodDetailComponent},
    Home: {screen: HomeComponent},
    Login: {screen: LoginComponent},
    CreateUser: {screen: CreateUserComponent},
    Location: {screen: LocationComponent},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Location',
    transitionConfig: () => ({
      screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    }),
  },
);

export const AppContainer = createAppContainer(MainNavigator);
