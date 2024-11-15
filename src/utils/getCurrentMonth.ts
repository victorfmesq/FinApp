import {
  Month,
  MONTHS,
} from '../contexts/providers/TransactionsProvider/types';

export const getCurrentMonth = (): Month => {
  const monthIndex = new Date().getMonth();
  const monthKeys = Object.keys(MONTHS) as Array<Month>;

  return monthKeys[monthIndex];
};
