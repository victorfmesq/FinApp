import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import TabRoutes from './components/TabRoutes';
import { RootStackParamList, RoutesConfig, StackScreenNames } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const routes: RoutesConfig = {
  Welcome: {
    component: WelcomeScreen,
    options: { headerShown: false },
  },
  Login: {
    component: LoginScreen,
    options: { headerShown: false },
  },
  HomeTabs: {
    component: TabRoutes,
    options: { headerShown: false },
  },
};

const Routes: React.FC = () => (
  <Stack.Navigator initialRouteName="Welcome">
    {Object.entries(routes).map(([routeName, { component, options }]) => (
      <Stack.Screen
        key={routeName}
        name={routeName as StackScreenNames}
        component={component}
        options={options}
      />
    ))}
  </Stack.Navigator>
);

export default Routes;
