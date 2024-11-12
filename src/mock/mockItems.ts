import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {
  FinancialItem,
  getMonthYearKey,
} from '../contexts/providers/itemsProvider';

const NAMESPACE = 'd9428888-122b-11e1-b85c-61cd3cbb3210';

const organizeItemsByMonth = (
  items: FinancialItem[]
): { [key: string]: FinancialItem[] } => {
  return items.reduce(
    (acc, item) => {
      const monthYearKey = getMonthYearKey(item.date);

      if (!acc[monthYearKey]) acc[monthYearKey] = [];

      acc[monthYearKey].push(item);

      return acc;
    },
    {} as { [key: string]: FinancialItem[] }
  );
};

const generateMockItems = (
  count: number
): { [key: string]: FinancialItem[] } => {
  const mockItems: FinancialItem[] = [];

  const randomNames = [
    'Freelance Project',
    'Grocery Shopping',
    'Utilities',
    'Salary',
    'Coffee Subscription',
    'Car Repair',
  ];

  for (let i = 0; i < count; i++) {
    const randomName =
      randomNames[Math.floor(Math.random() * randomNames.length)];
    const randomAmount = parseFloat((Math.random() * 5000).toFixed(2));
    const randomType = Math.random() > 0.5 ? 'income' : 'expense';
    const randomDate = new Date(
      Date.now() - Math.floor(Math.random() * 10000000000)
    );

    const id = uuidv4();

    mockItems.push({
      id,
      name: randomName,
      amount: randomAmount,
      type: randomType,
      date: randomDate,
    });
  }

  const organizedItems = organizeItemsByMonth(mockItems);

  Object.keys(organizedItems).forEach(key => {
    organizedItems[key].sort((a, b) => a.date.getTime() - b.date.getTime());
  });

  return organizedItems;
};

export default generateMockItems;
