// src/screens/Login/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { InputField } from '../../components/common/InputField';
import { Button } from '../../components/common/Button';
import { RootStackScreens, ScreenProps } from '../../routes/types';

type LoginScreenProps = ScreenProps<'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    navigation.navigate('HomeTabs', { screen: 'Home' });
  };

  return (
    <View className="flex-1 items-center justify-center p-4 bg-light-background dark:bg-dark-background">
      <Text className="text-2xl font-semibold mb-8">Login</Text>

      <InputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <InputField
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
