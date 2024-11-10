import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';

export type IconOption = {
  id: string;
  icon: React.ReactElement;
};

type SelectorProps = {
  options: IconOption[];
  onSelect: (selectedId: string) => void;
  selectedId?: string; // Prop para receber a opção selecionada externamente
};

const Selector: React.FC<SelectorProps> = ({
  options,
  onSelect,
  selectedId: externalSelectedId,
}) => {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(
    options[0].id
  );

  // Se a opção selecionada for controlada externamente, atualize o estado interno
  useEffect(() => {
    if (externalSelectedId) {
      setInternalSelectedId(externalSelectedId);
    }
  }, [externalSelectedId]);

  const handleSelect = (id: string) => {
    setInternalSelectedId(id);
    onSelect(id); // Envia a seleção para o componente pai
  };

  // Usa o selectedId interno se a prop externa não for fornecida
  const selectedId = externalSelectedId ?? internalSelectedId;

  return (
    <View className="flex-row items-center justify-center p-2 rounded-full w-1/2 bg-light-surface dark:bg-dark-surface">
      {options.map(option => (
        <TouchableOpacity
          key={option.id}
          onPress={() => handleSelect(option.id)}
          className={`flex-1 flex-row items-center justify-center m-1 p-2 rounded-full ${
            selectedId === option.id
              ? `bg-light-primary dark:bg-dark-primary`
              : `bg-light-surface dark:bg-dark-surface`
          }`}
        >
          {option.icon}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Selector;
