import { useContext } from 'react';
import { TransactionsContext } from '../providers/TransactionsProvider';

const useTransactions = () => {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error('useItems deve ser usado dentro de um ItemsProvider');
  }
  return context;
};

export default useTransactions;
