import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import useTransactions from '../../../contexts/hooks/useTransactions';
import {
  MONTHS_LABEL,
  MONTHS,
  monthValueToKey,
  MonthValue,
} from '../../../contexts/providers/TransactionsProvider/types';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { selectedMonth, selectedYear, handleSelectMonth, handleSelectYear } =
    useTransactions();

  const title = useMemo(
    () => `${MONTHS_LABEL[MONTHS[selectedMonth]]} de ${selectedYear}`,
    [selectedMonth, selectedYear]
  );

  const changePeriod = useCallback(
    (command: 'prev' | 'next') => {
      const currentMonth = parseInt(MONTHS[selectedMonth], 10);
      const currentYear = parseInt(selectedYear, 10);

      let newMonth: number;
      let newYear = currentYear;

      if (command === 'next') {
        newMonth = currentMonth === 12 ? 1 : currentMonth + 1;
        if (currentMonth === 12) newYear += 1;
      } else {
        newMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        if (currentMonth === 1) newYear -= 1;
      }

      const newMonthKey =
        monthValueToKey[newMonth.toString().padStart(2, '0') as MonthValue];

      handleSelectMonth(newMonthKey);
      handleSelectYear(newYear.toString());
    },
    [selectedMonth, selectedYear]
  );

  return (
    <View
      className={`${
        isExpanded ? 'h-40' : 'h-20'
      } flex bg-light-primary rounded-b-2xl`}
    >
      <View
        className={`flex-row items-center justify-between px-4 pt-4 ${
          !isExpanded ? 'flex-1' : 'mb-4'
        }`}
      >
        <TouchableOpacity onPress={() => changePeriod('prev')} className="p-2">
          <Entypo name="chevron-left" size={24} color="white" />
        </TouchableOpacity>

        {!isExpanded && (
          <Text className="text-2xl font-semibold text-white">{title}</Text>
        )}

        <TouchableOpacity onPress={() => changePeriod('next')} className="p-2">
          <Entypo name="chevron-right" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {isExpanded && (
        <View className="flex-1 items-center justify-end mb-4">
          <Text className="text-3xl font-bold text-white">{title}</Text>
        </View>
      )}
    </View>
  );
};

export default Header;
