import React from 'react';
import { Text, View, FlatList } from 'react-native';
import ChartViewer from '../../components/ChartViewer';
import TransitionItemList from '../../components/TransitionItemList';

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-light-background px-2">
      <ChartViewer />

      <TransitionItemList />
    </View>
  );
};

export default HomeScreen;
