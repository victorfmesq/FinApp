// src/screens/Login/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { RootStackParamList } from '../../routes';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    navigation.navigate('Home');
  };

  return (
    <View className="flex-1 items-center justify-center p-4 bg-white">
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
