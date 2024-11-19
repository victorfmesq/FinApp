import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from 'react';

import { useStorage } from '../../../store/useStorage';
import generateMockItems from '../../../mock/mockItems';
import { getCurrentMonth } from '../../../utils/getCurrentMonth';
import { Month, MONTHS, Transaction } from './types';

export const STORAGE_KEY = '@transactions';

interface TransactionContextProps {
  transactions: { [key: string]: Transaction[] };
  selectedMonth: Month;
  addTransaction: (item: Transaction) => void;
  updateTransaction: (id: string, updatedItem: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  getTransactionsByMonth: (month: Month, year: string) => Transaction[];
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

  const { saveData, loadData, removeData } = useStorage<{
    [key: string]: Transaction[];
  }>(STORAGE_KEY, {});

  const initializeTransactions = async () => {
    try {
      // (async () => await removeData())();
      const existingItems = await loadData();

      if (!existingItems || Object.keys(existingItems).length === 0) {
        console.log('gerando dados');
        const mockItems = generateMockItems(100);

        setTransactions(mockItems);
        saveData(mockItems);
      } else {
        console.log('lendo dados ja existentes');
        setTransactions(existingItems);
      }
    } catch (e) {
      console.error('Erro ao inicializar itemProvider: ', e);
    }
  };

  useEffect(() => {
    (async () => await initializeTransactions())();
  }, []);

  console.log('items :>> ', Object.values(transactions).flatMap(i => i).length);

  const addTransaction = (item: Transaction) => {
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
  };

  const updateTransaction = (id: string, updatedItem: Partial<Transaction>) => {
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
  };

  const deleteTransaction = (id: string) => {
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
  };

  const getTransactionsByMonth = (
    month: Month,
    year: string
  ): Transaction[] => {
    const key = `${MONTHS[month]}-${year}`;

    return transactions[key] || [];
  };

  const value = useMemo(
    () => ({
      transactions,
      selectedMonth,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      getTransactionsByMonth,
    }),
    [
      transactions,
      selectedMonth,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      getTransactionsByMonth,
    ]
  );

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
