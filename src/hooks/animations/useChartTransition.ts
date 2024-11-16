import { useState } from 'react';
import { Animated } from 'react-native';

export const useChartTransition = (duration: number = 300) => {
  const [opacity] = useState(new Animated.Value(1));

  const transitionChart = (callback: () => void) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start(() => {
      callback(); // Chama o callback para alterar o gráfico
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start();
    });
  };

  return { opacity, transitionChart };
};
