// src/screens/Welcome/WelcomeScreen.tsx
import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from '../../components/Button';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParamList } from '../../routes';

type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => (
  <View className="flex-1 items-center justify-center bg-light-background dark:bg-dark-background">
    {/* <Image
      source={require('../../assets/logo.png')}
      className="mb-6 w-32 h-32"
    /> */}

    <Text className="text-2xl font-semibold text-gray-800 mb-4">
      Bem-vindo ao FinApp
    </Text>

    <Button title="Começar" onPress={() => navigation.navigate('Login')} />
  </View>
);

export default WelcomeScreen;
