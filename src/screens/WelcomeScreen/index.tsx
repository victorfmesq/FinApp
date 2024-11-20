// src/screens/Welcome/WelcomeScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '../../components/common/Button';
import { ScreenProps } from '../../routes/types';

type WelcomeScreenProps = ScreenProps<'Welcome'>;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => (
  <View className="flex-1 items-center justify-center bg-light-background dark:bg-dark-background px-4">
    {/* <Image
      source={require('../../assets/logo.png')}
      className="mb-6 w-32 h-32"
    /> */}

    <Text className="text-2xl font-semibold text-gray-800 mb-4">
      Bem-vindo ao FinApp
    </Text>

    <Button
      title="Começar"
      onPress={() => navigation.navigate('HomeTabs', { screen: 'Home' })}
    />
  </View>
);

export default WelcomeScreen;
