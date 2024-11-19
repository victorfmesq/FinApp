import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const onLeftPress = useCallback(() => console.log('leftPress'), []);
  const onRightPress = useCallback(() => console.log('rightPress'), []);

  return (
    <View
      className={`${
        isExpanded ? 'h-40' : 'h-20'
      } flex bg-light-primary rounded-b-2xl mt-4`}
    >
      <View
        className={`flex-row items-center justify-between px-4 ${
          !isExpanded ? 'flex-1' : 'mb-4'
        }`}
      >
        {/* Left Icon Button */}
        <TouchableOpacity onPress={onLeftPress} className="p-2">
          <Entypo name="chevron-left" size={24} color="white" />
        </TouchableOpacity>

        {/* Title */}
        {!isExpanded && (
          <Text className="text-2xl font-semibold text-white">{title}</Text>
        )}

        {/* Right Icon Button */}
        <TouchableOpacity onPress={onRightPress} className="p-2">
          <Entypo name="chevron-right" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Expanded Mode Content */}
      {isExpanded && (
        <View className="flex-1 items-center justify-end mb-4">
          <Text className="text-3xl font-bold text-white">{title}</Text>
        </View>
      )}
    </View>
  );
};

export default Header;
