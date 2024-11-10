import React from 'react';
import { Text, View } from 'react-native';
import ChartViewer from './components/ChartViewer';

const HomeScreen = () => {
  return (
    <View className="flex-1 gap-6">
      <ChartViewer />
    </View>
  );
};

export default HomeScreen;
