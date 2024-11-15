import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import './global.css';
import Routes from './src/routes';
import TransactionsProvider from './src/contexts/providers/TransactionsProvider';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <TransactionsProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>

      <StatusBar style="auto" />
    </TransactionsProvider>
  );
}
