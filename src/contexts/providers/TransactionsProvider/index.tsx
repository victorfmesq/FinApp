import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
  useCallback,
} from 'react';

import { useStorage } from '../../../store/useStorage';
import generateMockItems from '../../../mock/mockItems';
import { getCurrentMonth } from '../../../utils/getCurrentMonth';
import { Month, MONTHS, Transaction } from './types';

export const STORAGE_KEY = '@transactions';

interface TransactionContextProps {
  transactions: { [key: string]: Transaction[] };
  currentTransactions: Transaction[];
  selectedMonth: Month;
  selectedYear: string;
  handleSelectMonth: (month: Month) => void;
  handleSelectYear: (year: string) => void;
  addTransaction: (item: Transaction) => void;
  updateTransaction: (id: string, updatedItem: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
}

export const getMonthYearKey = (date: Date) =>
  `${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

export const TransactionsContext = createContext<
  TransactionContextProps | undefined
>(undefined);

const TransactionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<{
    [key: string]: Transaction[];
  }>({});
  const [selectedMonth, setSelectedMonth] = useState<Month>(getCurrentMonth());
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );

  const { saveData, loadData, removeData } = useStorage<{
    [key: string]: Transaction[];
  }>(STORAGE_KEY, {});

  const initializeTransactions = async () => {
    try {
      const existingItems = await loadData();

      if (!existingItems || Object.keys(existingItems).length === 0) {
        // const mockItems = generateMockItems(100);

        setTransactions({});
        saveData({});
      } else {
        setTransactions(existingItems);
      }
    } catch (e) {
      console.error('Erro ao inicializar itemProvider: ', e);
    }
  };

  useEffect(() => {
    (async () => await initializeTransactions())();
  }, []);

  const handleSelectMonth = useCallback((month: Month) => {
    setSelectedMonth(month);
  }, []);

  const handleSelectYear = useCallback((year: string) => {
    setSelectedYear(year);
  }, []);

  const addTransaction = useCallback((item: Transaction) => {
    setTransactions(prevItems => {
      const monthYearKey = getMonthYearKey(item.date);

      const updatedItems = { ...prevItems };

      if (!updatedItems[monthYearKey]) updatedItems[monthYearKey] = [];

      updatedItems[monthYearKey].push(item);

      updatedItems[monthYearKey] = updatedItems[monthYearKey].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      saveData(updatedItems);

      return updatedItems;
    });
  }, []);

  const updateTransaction = useCallback(
    (id: string, updatedItem: Partial<Transaction>) => {
      setTransactions(prevItems => {
        const updatedItems = { ...prevItems };

        Object.keys(updatedItems).forEach(monthYearKey => {
          updatedItems[monthYearKey] = updatedItems[monthYearKey]
            .map(item => (item.id === id ? { ...item, ...updatedItem } : item))
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );
        });

        saveData(updatedItems);

        return updatedItems;
      });
    },
    []
  );

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prevItems => {
      const updatedItems = { ...prevItems };

      Object.keys(updatedItems).forEach(monthYearKey => {
        updatedItems[monthYearKey] = updatedItems[monthYearKey].filter(
          item => item.id !== id
        );
      });

      saveData(updatedItems);

      return updatedItems;
    });
  }, []);

  const currentTransactions: Transaction[] = useMemo(() => {
    const key = `${MONTHS[selectedMonth]}-${selectedYear}`;

    return transactions[key] || [];
  }, [transactions, selectedMonth, selectedYear]);

  const value = useMemo(
    () => ({
      currentTransactions,
      transactions,
      selectedMonth,
      selectedYear,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      handleSelectMonth,
      handleSelectYear,
    }),
    [
      currentTransactions,
      transactions,
      selectedMonth,
      selectedYear,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      handleSelectMonth,
      handleSelectYear,
    ]
  );

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
