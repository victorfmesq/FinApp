import React from 'react';
import TransactionFormScreen from '../TransactionFormScreen';
import { Transaction } from '../../contexts/providers/TransactionsProvider/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/types';

type EditScreenRouteProp = RouteProp<RootStackParamList, 'Edit'>;

const EditScreen = () => {
  const route = useRoute<EditScreenRouteProp>();

  const transaction = route.params.transaction;

  return <TransactionFormScreen transaction={transaction} />;
};

export default EditScreen;
