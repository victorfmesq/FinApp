import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, TouchableOpacity } from 'react-native';
import TransactionItem from './TransitionItem';
import useTransactions from '../../contexts/hooks/useTransactions';
import { Transaction } from '../../contexts/providers/TransactionsProvider/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types';

type EditScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Edit'>;

interface TransactionItem {
  id: string;
  type: 'income' | 'expense';
  name: string;
  percent: number;
  amount: number;
  date: Date;
}

const transformTransactions = (
  transactions: Transaction[]
): TransactionItem[] => {
  const record = transactions.reduce(
    (acc, transaction) => {
      acc[transaction.type].total += transaction.amount;

      acc[transaction.type].items.push(transaction);

      return acc;
    },
    {
      income: { total: 0, items: [] as Transaction[] },
      expense: { total: 0, items: [] as Transaction[] },
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
        amount: item.amount,
        date: item.date,
        percent,
      } as TransactionItem;
    })
    .reverse();
};

const TransitionItemList = ({
  variant = 'read',
}: {
  variant: 'read' | 'manage';
}) => {
  const [selected, setSelected] = useState<string>('');
  const { deleteTransaction, currentTransactions } = useTransactions();

  const { navigate, addListener } = useNavigation<EditScreenNavigationProp>();

  const transactionItems = transformTransactions(currentTransactions);

  useEffect(() => {
    const blurListener = addListener('blur', () => {
      setTimeout(() => setSelected(''), 200);
    });

    return blurListener;
  });

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
    (item: Transaction) => navigate('Edit', { transaction: item }),
    []
  );

  const renderItem = useCallback(
    (item: TransactionItem) => (
      <TouchableOpacity
        onPress={() =>
          variant === 'manage' &&
          setSelected(current => (current === item.id ? '' : item.id))
        }
      >
        <TransactionItem
          id={item.id}
          name={item.name}
          percent={item.percent}
          type={item.type}
          amount={item.amount}
          date={item.date}
          variant={variant}
          isSelected={selected === item.id}
          onDelete={() => onDeleteItem(item.id)}
          onEdit={() => onEdit(item as Transaction)}
        />
      </TouchableOpacity>
    ),
    [variant, selected, setSelected, onDeleteItem, onEdit]
  );

  return (
    <FlatList
      className="bg-light-surface dark:bg-dark-surface rounded-t-3xl"
      data={transactionItems}
      keyExtractor={item => item.id}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      renderItem={({ item }) => renderItem(item)}
      contentContainerStyle={{ gap: 8 }}
      removeClippedSubviews
    />
  );
};

export default TransitionItemList;
