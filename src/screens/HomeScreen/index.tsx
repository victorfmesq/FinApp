import React, { useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import ChartViewer from '../../components/ChartViewer';
import TransitionItemList from '../../components/TransitionItemList';
import useTransactions from '../../contexts/hooks/useTransactions';

const HomeScreen = () => {
  const { currentTransactions } = useTransactions();

  return (
    <View className="flex-1 bg-light-background px-2">
      {currentTransactions.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text>Nenhum dado disponível para o período atual</Text>
        </View>
      ) : (
        <>
          <View className="flex-[2]">
            <ChartViewer />
          </View>

          <View className="flex-[1] mt-[-12rem]">
            <TransitionItemList variant="read" />
          </View>
        </>
      )}
    </View>
  );
};

export default HomeScreen;
