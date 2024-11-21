import { Transaction } from '../../../contexts/providers/TransactionsProvider/types';
import { theme } from '../../../themes';

export const calculateLineData = (items: Transaction[]) => {
  if (items.length === 0) {
    return undefined;
  }

  const dailyTotals = items.reduce(
    (totals, item) => {
      const day = new Date(item.date).getDate();
      const dayKey = String(day).padStart(2, '0');

      if (!totals[dayKey]) {
        totals[dayKey] = { income: 0, expense: 0 };
      }

      if (item.type === 'income') {
        totals[dayKey].income += item.amount;
      } else if (item.type === 'expense') {
        totals[dayKey].expense += item.amount;
      }

      return totals;
    },
    {} as Record<string, { income: number; expense: number }>
  );

  const days = Object.keys(dailyTotals).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  return {
    labels: days,
    datasets: [
      {
        data: days.map(day => dailyTotals[day].income),
        color: () => theme.finance.income,
      },
      {
        data: days.map(day => dailyTotals[day].expense),
        color: () => theme.finance.expense,
      },
    ],
  };
};

export const calculatePieData = (items: Transaction[]) => {
  if (items.length === 0) {
    return undefined;
  }

  const totals = items.reduce(
    (acc, item) => {
      if (item.type === 'income') {
        acc.incomeTotal += item.amount;
      } else if (item.type === 'expense') {
        acc.expenseTotal += item.amount;
      }

      return acc;
    },
    { incomeTotal: 0, expenseTotal: 0 }
  );

  const total = totals.expenseTotal + totals.incomeTotal;
  const incomePercent = (totals.incomeTotal / total) * 100;
  const expensepercent = 100 - incomePercent;

  return [
    {
      name: '%',
      population: parseFloat(incomePercent.toFixed(2)),
      color: theme.finance.income,
      legendFontColor: theme.light.textSecondary,
      legendFontSize: 15,
    },
    {
      name: '%',
      population: parseFloat(expensepercent.toFixed(2)),
      color: theme.finance.expense,
      legendFontColor: theme.light.textSecondary,
      legendFontSize: 15,
    },
  ];
};

export const getChartConfig = (isDarkMode: boolean) => ({
  backgroundColor: isDarkMode ? theme.dark.surface : theme.light.surface,
  backgroundGradientFrom: isDarkMode ? theme.dark.surface : theme.light.surface,
  backgroundGradientTo: isDarkMode ? theme.dark.surface : theme.light.surface,
  color: () => (isDarkMode ? theme.dark.primary : theme.light.primary),
  labelColor: () =>
    isDarkMode ? theme.dark.textPrimary : theme.light.textPrimary,
});
