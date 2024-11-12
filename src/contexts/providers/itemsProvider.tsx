import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from 'react';

import { useStorage } from '../../store/useStorage';
import generateMockItems from '../../mock/mockItems';
import { getCurrentMonth } from '../../utils/getCurrentMonth';

export const STORAGE_KEY = '@financialItems';

export interface FinancialItem {
  id: string;
  name: string;
  amount: number;
  type: 'income' | 'expense';
  date: Date;
}

export const MONTHS = {
  JAN: '01',
  FEB: '02',
  MAR: '03',
  APR: '04',
  MAY: '05',
  JUN: '06',
  JUL: '07',
  AUG: '08',
  SEP: '09',
  OCT: '10',
  NOV: '11',
  DEC: '12',
} as const;

export type Month = keyof typeof MONTHS;

interface ItemsContextProps {
  items: { [key: string]: FinancialItem[] };
  selectedMonth: Month;
  addItem: (item: FinancialItem) => void;
  updateItem: (id: string, updatedItem: Partial<FinancialItem>) => void;
  deleteItem: (id: string) => void;
  getItemsByMonth: (month: Month, year: string) => FinancialItem[];
}

export const getMonthYearKey = (date: Date) =>
  `${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

export const ItemsContext = createContext<ItemsContextProps | undefined>(
  undefined
);

const ItemsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<{ [key: string]: FinancialItem[] }>({});
  const [selectedMonth, setSelectedMonth] = useState<Month>(getCurrentMonth());

  const { saveData, loadData, removeData } = useStorage<{
    [key: string]: FinancialItem[];
  }>(STORAGE_KEY, {});

  const initializeItems = async () => {
    try {
      const existingItems = await loadData();

      if (!existingItems || Object.keys(existingItems).length === 0) {
        console.log('gerando dados');
        const mockItems = generateMockItems(100);

        setItems(mockItems);
        saveData(mockItems);
      } else {
        (async () => await removeData())();

        console.log('lendo dados ja existentes');
        setItems(existingItems);
      }
    } catch (e) {
      console.error('Erro ao inicializar itemProvider: ', e);
    }
  };

  useEffect(() => {
    (async () => await initializeItems())();
  }, []);

  console.log('items :>> ', Object.values(items).flatMap(i => i).length);

  const addItem = (item: FinancialItem) => {
    setItems(prevItems => {
      const monthYearKey = getMonthYearKey(item.date);

      const updatedItems = { ...prevItems };

      if (!updatedItems[monthYearKey]) updatedItems[monthYearKey] = [];

      updatedItems[monthYearKey].push(item);

      saveData(updatedItems);

      return updatedItems;
    });
  };

  const updateItem = (id: string, updatedItem: Partial<FinancialItem>) => {
    setItems(prevItems => {
      const updatedItems = { ...prevItems };

      Object.keys(updatedItems).forEach(monthYearKey => {
        updatedItems[monthYearKey] = updatedItems[monthYearKey].map(item =>
          item.id === id ? { ...item, ...updatedItem } : item
        );
      });

      saveData(updatedItems);

      return updatedItems;
    });
  };

  const deleteItem = (id: string) => {
    setItems(prevItems => {
      const updatedItems = { ...prevItems };

      Object.keys(updatedItems).forEach(monthYearKey => {
        updatedItems[monthYearKey] = updatedItems[monthYearKey].filter(
          item => item.id !== id
        );
      });

      saveData(updatedItems);

      return updatedItems;
    });
  };

  const getItemsByMonth = (month: Month, year: string): FinancialItem[] => {
    const key = `${MONTHS[month]}-${year}`;

    return items[key] || [];
  };

  const value = useMemo(
    () => ({
      items,
      selectedMonth,
      addItem,
      updateItem,
      deleteItem,
      getItemsByMonth,
    }),
    [items, selectedMonth, addItem, updateItem, deleteItem, getItemsByMonth]
  );

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};

export default ItemsProvider;
