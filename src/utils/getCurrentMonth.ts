import { Month, MONTHS } from '../contexts/providers/itemsProvider';

export const getCurrentMonth = (): Month => {
  const monthIndex = new Date().getMonth();
  const monthKeys = Object.keys(MONTHS) as Array<Month>;

  return monthKeys[monthIndex];
};
