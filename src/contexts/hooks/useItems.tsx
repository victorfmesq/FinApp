import { useContext } from 'react';
import { ItemsContext } from '../providers/itemsProvider';

const useItems = () => {
  const context = useContext(ItemsContext);

  if (!context) {
    throw new Error('useItems deve ser usado dentro de um ItemsProvider');
  }
  return context;
};

export default useItems;
