import { useState, useEffect } from 'react';
import { Animated } from 'react-native';

const useGrowIconAnimation = (selectedId: string, options: any[]) => {
  // Tipando explicitamente animValues para garantir que seja um objeto com chaves como string e valores Animated.Value
  const [animValues, setAnimValues] = useState<Record<string, Animated.Value>>(
    options.reduce(
      (acc, option) => {
        acc[option.id] = new Animated.Value(1); // Inicializa todos os valores de animação como 1 (tamanho normal)
        return acc;
      },
      {} as Record<string, Animated.Value>
    )
  );

  useEffect(() => {
    // Aumenta a escala do ícone selecionado
    Animated.spring(animValues[selectedId], {
      toValue: 1.2, // Aumenta o tamanho
      friction: 4, // Controla a suavidade da animação
      useNativeDriver: true,
    }).start();

    // Reseta a escala dos outros ícones
    Object.keys(animValues).forEach(key => {
      if (key !== selectedId) {
        Animated.spring(animValues[key], {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }).start();
      }
    });
  }, [selectedId, options, animValues]); // Dependências: selecionado e opções

  return animValues;
};

export default useGrowIconAnimation;
