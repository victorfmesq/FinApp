import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../../../themes';

export interface TransitionItemProps {
  type: 'income' | 'expense';
  name: string;
  percent: number;
  value: number;
  date: Date;
}

const TransitionItem: React.FC<TransitionItemProps> = ({
  type,
  name,
  percent,
  value,
  date,
}) => {
  const formattedValue = `R$ ${value.toFixed(2).replace('.', ',')}`;
  const formattedPercent = `${percent.toFixed(2)}%`;

  const dayOfMonth = date ? new Date(date).getDate() : null;

  return (
    <View className="w-full py-1 flex-row items-center gap-4">
      <View
        className={`size-8 rounded-full flex items-center justify-center ${
          type === 'income' ? 'bg-finance-income' : 'bg-finance-expense'
        }`}
      >
        <Text className="text-lg font-bold text-white">{dayOfMonth}</Text>
      </View>

      <View className="flex-1 gap-2">
        <View className="flex-row justify-between">
          <Text className="text-gray-800 text-lg font-bold">{name}</Text>
          <Text
            className={`text-lg font-bold ${
              type === 'income' ? 'text-finance-income' : 'text-finance-expense'
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
    </View>
  );
};

export default TransitionItem;
