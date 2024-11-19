import { ComponentType } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { TabKey } from './components/TabRoutes/types';
import { Transaction } from '../contexts/providers/TransactionsProvider/types';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  HomeTabs: { screen: TabKey };
  Edit: { transaction: Transaction };
};

export type StackScreenNames = keyof RootStackParamList;

export type RouteConfig = {
  component: ComponentType<any>;
  options?: StackNavigationOptions;
};

export type RoutesConfig = Record<StackScreenNames, RouteConfig>;

export const RootStackScreens = Object.freeze(
  Object.keys({} as RootStackParamList).reduce(
    (acc, key) => {
      const typedKey = key as StackScreenNames;

      acc[typedKey] = typedKey;

      return acc;
    },
    {} as Record<StackScreenNames, StackScreenNames>
  )
);

export type ScreenProps<RouteName extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, RouteName>;
