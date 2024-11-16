import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { theme } from '../../../themes';
import useGrowIconAnimation from '../../../hooks/animations/useGrowIconAnimation';
import useSlideBackgroundAnimation from '../../../hooks/animations/useSlideBackgroundAnimation';

export type IconOption = {
  id: string;
  icon: React.ReactElement;
};

type SelectorProps = {
  options: IconOption[];
  onSelect: (selectedId: string) => void;
  selectedId?: string;
};

const animateBackgroundPosition = (
  id: string,
  options: IconOption[],
  backgroundAnim: Animated.Value
) => {
  const optionIndex = options.findIndex(option => option.id === id);

  const weight = optionIndex === 0 ? optionIndex - 1 : optionIndex;

  Animated.spring(backgroundAnim, {
    toValue: weight * (80 / options.length),
    friction: 6,
    useNativeDriver: false,
  }).start();
};

const Selector: React.FC<SelectorProps> = ({
  options,
  onSelect,
  selectedId: externalSelectedId,
}) => {
  const [internalSelectedId, setInternalSelectedId] = useState<string>(
    externalSelectedId ?? options[0].id
  );

  useEffect(() => {
    if (externalSelectedId) setInternalSelectedId(externalSelectedId);
  }, [externalSelectedId]);

  const backgroundAnim = useSlideBackgroundAnimation(
    internalSelectedId,
    options
  );

  const iconsScaleValues = useGrowIconAnimation(internalSelectedId, options);

  const handleSelect = (id: string) => {
    setInternalSelectedId(id);
    onSelect(id);
  };

  return (
    <View className="relative flex-row items-center justify-center p-2 rounded-full w-1/2 bg-light-surface dark:bg-dark-surface">
      <Animated.View
        className={`absolute bg-dark-primary h-[85%] rounded-full`}
        style={{
          width: `${80 / options.length}%`,
          transform: [{ translateX: backgroundAnim }],
        }}
      />
      {options.map(option => {
        const animationStyle = {
          transform: [{ scale: iconsScaleValues[option.id] }],
        };

        return (
          <TouchableOpacity
            key={option.id}
            onPress={() => handleSelect(option.id)}
            className={`flex-1 flex-row items-center justify-center m-1 p-2 rounded-full `}
          >
            <Animated.View style={animationStyle}>{option.icon}</Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Selector;
