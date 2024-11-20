import React from 'react';
import { View, Text } from 'react-native';
import TransitionItemList from '../../components/TransitionItemList';
import useTransactions from '../../contexts/hooks/useTransactions';

const ManageTransactionsScreen = () => {
  const { currentTransactions } = useTransactions();

  return (
    <View className="flex-1 w-full">
      {currentTransactions.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text>Nenhum dado disponível para o período atual</Text>
        </View>
      ) : (
        <TransitionItemList variant="manage" />
      )}
    </View>
  );
};

export default ManageTransactionsScreen;
