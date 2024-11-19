import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
} & TouchableOpacityProps;

export const Button: React.FC<ButtonProps> = ({
  title,
  disabled,
  onPress,
  ...props
}) => (
  <TouchableOpacity
    {...props}
    disabled={disabled}
    onPress={onPress}
    className={`py-3 px-6 rounded-lg items-center w-full ${
      disabled ? 'bg-gray-300' : 'bg-green-500'
    }`}
  >
    <Text className={`font-bold ${disabled ? 'text-gray-700' : 'text-white'}`}>
      {title}
    </Text>
  </TouchableOpacity>
);
