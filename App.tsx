import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import './global.css';
import Routes from './src/routes';
import ItemsProvider from './src/contexts/providers/itemsProvider';
import { useStorage } from './src/store/useStorage';

export default function App() {
  return (
    <ItemsProvider>
      <Routes />

      <StatusBar style="auto" />
    </ItemsProvider>
  );
}
