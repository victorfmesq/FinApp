import { useState, useEffect } from 'react';
import { Animated } from 'react-native';

const useSlideBackgroundAnimation = (
  id: string,
  options: any[],
  relativeWidth?: number
) => {
  const [backgroundAnim] = useState(new Animated.Value(0));

  const relativeSliderWidth = relativeWidth ?? 80;

  useEffect(() => {
    const optionIndex = options.findIndex(option => option.id === id);

    const weight = optionIndex === 0 ? optionIndex - 1 : optionIndex;

    Animated.spring(backgroundAnim, {
      toValue: weight * (relativeSliderWidth / options.length),
      friction: 6,
      useNativeDriver: false,
    }).start();
  }, [id, options, backgroundAnim]);

  return backgroundAnim;
};

export default useSlideBackgroundAnimation;
