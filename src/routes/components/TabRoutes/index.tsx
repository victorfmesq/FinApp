import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, AntDesign } from '@expo/vector-icons'; // Adicione outros ícones conforme necessário
import HomeScreen from '../../../screens/HomeScreen';
import { TabKey, TabValue } from './types';
import { theme } from '../../../themes';
import ManageTransactionsScreen from '../../../screens/ManageTransactionsScreen';
import AddScreen from '../../../screens/AddScreen';
import Header from '../../../components/Header/TabRoutesHeader';

const Tab = createBottomTabNavigator();

// TODO: Utilizar um Header Global ver como fazer

const TAB: Record<TabKey, TabValue> = {
  Home: {
    icon: (props: any) => <Entypo name="home" {...props} />,
    screen: HomeScreen,
  },
  Add: {
    icon: (props: any) => <AntDesign name="pluscircleo" {...props} />,
    screen: AddScreen,
  },
  Transactions: {
    icon: (props: any) => <Entypo name="list" {...props} />,
    screen: ManageTransactionsScreen,
  },
};

const TabRoutes: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => {
      const { icon: IconComponent } = TAB[route.name as TabKey];

      return {
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
        },
        tabBarIcon: ({ color, size }) => (
          <IconComponent size={size * 1.1} color={color} />
        ),
        tabBarActiveTintColor: theme.dark.primary,
        tabBarInactiveTintColor: '#aaa',
      };
    }}
  >
    {Object.entries(TAB).map(([key, { screen }]) => (
      <Tab.Screen
        key={key}
        name={key}
        component={screen}
        options={{
          header: () => <Header title={key} />,
        }}
      />
    ))}
  </Tab.Navigator>
);

export default TabRoutes;
