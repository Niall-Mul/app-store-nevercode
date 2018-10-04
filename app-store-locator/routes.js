import { StoreDetails, DirectionsMapContainer } from '@vodafone/core-app/maps';
import Home from './screens/Home.react.js';

const routes = {
  Home: {
    screen: Home,
  },
  Details: {
    screen: StoreDetails,
    navigationOptions: {
      headerMode: 'screen',
    },
  },
  Directions: {
    screen: DirectionsMapContainer,
    navigationOptions: {
      headerMode: 'screen',
    },
  },
};

export default routes;
