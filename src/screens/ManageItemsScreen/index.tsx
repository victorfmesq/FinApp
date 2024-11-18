import React from 'react';
import { View, Text } from 'react-native';
import TransitionItemList from '../../components/TransitionItemList';

const ManageItemsScreen = () => {
  return (
    <View className="flex-1 w-full">
      <TransitionItemList variant="manage" />
    </View>
  );
};

export default ManageItemsScreen;
