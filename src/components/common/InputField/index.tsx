// src/components/Input/Input.tsx
import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

type InputFieldProps = TextInputProps & {
  value: string;
  onChangeText: (text: string) => void;
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChangeText,
  ...props
}) => (
  <TextInput
    className="w-full h-12 py-2 px-4 border bg-light-surface dark:bg-dark-surface border-gray-400 rounded-lg mb-4"
    value={value}
    onChangeText={onChangeText}
    {...props}
  />
);
