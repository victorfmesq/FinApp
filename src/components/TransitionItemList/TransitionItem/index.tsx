import React, { useState } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import { theme } from '../../../themes';

export interface TransitionItemProps {
  type: 'income' | 'expense';
  name: string;
  percent: number;
  value: number;
  date: Date;
  variant?: 'read' | 'manage';
  onEdit?: () => void;
  onDelete?: () => void;
}

const TransitionItem: React.FC<TransitionItemProps> = ({
  type,
  name,
  percent,
  value,
  date,
  variant = 'read',
  onEdit,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animationValue] = useState(new Animated.Value(1));

  const formattedValue = `R$ ${value.toFixed(2).replace('.', ',')}`;
  const formattedPercent = `${percent.toFixed(2)}%`;

  const dayOfMonth = date ? new Date(date).getDate() : null;

  const handlePress = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(animationValue, {
      toValue: isExpanded ? 1 : 0.7,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleEdit = () => {
    if (onEdit) onEdit();
  };

  const handleDelete = () => {
    if (onDelete) onDelete();
  };

  return (
    <View className="w-full px-4 py-1 relative overflow-hidden">
      <Animated.View
        style={{
          width: animationValue.interpolate({
            inputRange: [0.7, 1],
            outputRange: ['70%', '100%'],
          }),
        }}
      >
        <TouchableOpacity
          onPress={handlePress}
          className="flex flex-row items-center w-full rounded-xl gap-4"
        >
          <View
            className={`size-8 rounded-full flex items-center justify-center ${
              type === 'income' ? 'bg-finance-income' : 'bg-finance-expense'
            }`}
          >
            <Text className="text-lg font-bold text-white">{dayOfMonth}</Text>
          </View>

          <View className="flex-1 gap-2">
            <View className="flex-row justify-between overflow-hidden shrink truncate">
              <Text className="text-gray-800 text-lg font-bold truncate shrink">
                {name}
              </Text>
              <Text
                className={`text-lg font-bold ${
                  type === 'income'
                    ? 'text-finance-income'
                    : 'text-finance-expense'
                }`}
              >
                {formattedValue}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-500 text-sm">Porcentagem</Text>
              <Text className="text-gray-500 text-sm">{formattedPercent}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
      {variant === 'manage' && isExpanded && (
        <View className="flex items-center justify-between rounded absolute right-0 h-full  -translate-y-1/2 flex-row space-x-3 gap-4 bg-light-background">
          <TouchableOpacity onPress={handleEdit} className="p-2">
            <Entypo name="edit" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete} className="p-2">
            <Entypo name="trash" size={24} color="red" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TransitionItem;
