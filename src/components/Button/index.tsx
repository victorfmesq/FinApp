import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
};

export const Button: React.FC<ButtonProps> = ({ title, onPress }) => (
  <TouchableOpacity
    className="bg-green-500 py-3 px-6 rounded-lg items-center w-full"
    onPress={onPress}
  >
    <Text className="text-white font-bold">{title}</Text>
  </TouchableOpacity>
);
