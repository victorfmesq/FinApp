import React, { useCallback, useState } from 'react';
import { Alert, FlatList, TouchableOpacity } from 'react-native';
import TransitionItem from './TransitionItem';
import useTransactions from '../../contexts/hooks/useTransactions';
import { Transaction } from '../../contexts/providers/TransactionsProvider/types';
import { useNavigation } from '@react-navigation/native';

// TODO: refatorar o componente

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

const TransitionItemList = ({
  variant = 'read',
}: {
  variant: 'read' | 'manage';
}) => {
  const [selected, setSelected] = useState<string>('');
  const { getTransactionsByMonth, selectedMonth, deleteTransaction } =
    useTransactions();

  const transactionItems = transformTransactions(
    getTransactionsByMonth(selectedMonth, new Date().getFullYear().toString())
  );

  const onDeleteItem = useCallback(
    (transactionId: string) => {
      Alert.alert(
        'Atenção!',
        'Deseja excluir a transação?',
        [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancelado'),
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: () => {
              deleteTransaction(transactionId);
            },
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
    },
    [deleteTransaction]
  );

  const onEdit = useCallback(
    () => Alert.alert('Ops!', 'Tem que implementar ainda!'),
    []
  );

  return (
    <FlatList
      className="flex-1 bg-light-surface dark:bg-dark-surface rounded-t-3xl"
      data={transactionItems}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            variant === 'manage' &&
            setSelected(current => (current === item.id ? '' : item.id))
          }
        >
          <TransitionItem
            key={item.id}
            name={item.name}
            percent={item.percent}
            type={item.type}
            value={item.value}
            date={item.date}
            variant={variant}
            isSelected={selected === item.id}
            onDelete={() => onDeleteItem(item.id)}
            onEdit={() => onEdit()}
          />
        </TouchableOpacity>
      )}
      contentContainerStyle={{ gap: 8 }}
    />
  );
};

export default TransitionItemList;
