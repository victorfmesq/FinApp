import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, AntDesign } from '@expo/vector-icons'; // Adicione outros ícones conforme necessário
import HomeScreen from '../../../screens/HomeScreen';
import { TabKey, TabValue } from './types';
import { View, Text } from 'react-native';
import { theme } from '../../../themes';
import AddItemsScreen from '../../../screens/AddItemsScreen';
import ManageItemsScreen from '../../../screens/ManageItemsScreen';

const Tab = createBottomTabNavigator();

const TAB: Record<TabKey, TabValue> = {
  Home: {
    icon: (props: any) => <Entypo name="home" {...props} />,
    screen: HomeScreen,
  },
  Add: {
    icon: (props: any) => <AntDesign name="pluscircleo" {...props} />,
    screen: AddItemsScreen,
  },
  Transactions: {
    icon: (props: any) => <Entypo name="list" {...props} />,
    screen: ManageItemsScreen,
  },
};

const TabRoutes: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => {
      const { icon: IconComponent } = TAB[route.name as TabKey];

      return {
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
        },
        tabBarIcon: ({ color, size }) => (
          <IconComponent size={size} color={color} />
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
          header: () => (
            <View className="flex items-center justify-center h-10 bg-light-primary">
              <Text className="text-2xl font-semibold text-white mb-4">
                {key} Header
              </Text>
            </View>
          ),
        }}
      />
    ))}
  </Tab.Navigator>
);

export default TabRoutes;
