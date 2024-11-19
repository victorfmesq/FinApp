import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Transaction } from '../../../contexts/providers/TransactionsProvider/types';

// TODO: Refatorar esse componente mais pra frente
export interface TransactionItemProps extends Transaction {
  percent: number;
  isSelected: boolean;
  variant?: 'read' | 'manage';
  onEdit?: () => void;
  onDelete?: () => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  type,
  name,
  percent,
  amount,
  date,
  variant = 'read',
  isSelected,
  onEdit,
  onDelete,
}) => {
  const [animationValue] = useState(new Animated.Value(1));
  const translateX = useRef(new Animated.Value(100)).current;

  const formattedValue = `R$ ${amount.toFixed(2).replace('.', ',')}`;
  const formattedPercent = `${percent.toFixed(2)}%`;

  const dayOfMonth = date ? new Date(date).getDate() : null;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: isSelected ? 0.7 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();

    Animated.timing(translateX, {
      toValue: isSelected ? 0 : 100,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isSelected]);

  const handleEdit = () => {
    if (onEdit) onEdit();
  };

  const handleDelete = () => {
    if (onDelete) onDelete();
  };

  return (
    <View className="flex flex-row items-center rounded-xl gap-4 w-full px-4 py-1 relative overflow-hidden">
      <Animated.View
        style={{
          width: animationValue.interpolate({
            inputRange: [0.7, 1],
            outputRange: ['70%', '100%'],
          }),
        }}
        className={`flex flex-row items-center rounded-xl gap-4 w-full`}
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
      </Animated.View>

      {variant === 'manage' && (
        <Animated.View
          style={{
            transform: [{ translateX }],
          }}
          className={`flex items-center justify-between rounded absolute right-0 h-full -translate-y-1/2 flex-row space-x-3 gap-4 bg-light-background`}
        >
          <TouchableOpacity onPress={handleEdit} className="p-2 px-3">
            <Entypo name="edit" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete} className="p-2 px-3">
            <Entypo name="trash" size={24} color="red" />
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default TransactionItem;
