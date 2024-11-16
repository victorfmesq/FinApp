import React from 'react';
import { FlatList } from 'react-native';
import TransitionItem from './TransitionItem';
import useTransactions from '../../contexts/hooks/useTransactions';
import { Transaction } from '../../contexts/providers/TransactionsProvider/types';

interface TransitionItem {
  id: string;
  type: 'income' | 'expense';
  name: string;
  percent: number;
  value: number;
  date: Date;
}

const transformTransactions = (
  transactions: Transaction[]
): TransitionItem[] => {
  const record = transactions.reduce(
    (acc, transaction) => {
      acc[transaction.type].total += transaction.amount;

      acc[transaction.type].items.push(transaction);

      return acc;
    },
    {
      income: { total: 0, items: [] },
      expense: { total: 0, items: [] },
    }
  );

  return transactions
    .map(item => {
      const typeRecord = record[item.type];
      const percent =
        typeRecord.total > 0 ? (item.amount / typeRecord.total) * 100 : 0;

      return {
        id: item.id,
        type: item.type,
        name: item.name,
        value: item.amount,
        date: item.date,
        percent,
      } as TransitionItem;
    })
    .reverse();
};

const TransitionItemList = () => {
  const { getTransactionsByMonth, selectedMonth } = useTransactions();

  const transactionItems = transformTransactions(
    getTransactionsByMonth(selectedMonth, new Date().getFullYear().toString())
  );

  return (
    <FlatList
      className="flex-1 mt-20 bg-light-surface dark:bg-dark-surface rounded-t-3xl"
      data={transactionItems}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TransitionItem
          key={item.id}
          name={item.name}
          percent={item.percent}
          type={item.type}
          value={item.value}
          date={item.date}
        />
      )}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
    />
  );
};

export default TransitionItemList;
