export interface Transaction {
  id: string;
  name: string;
  amount: number;
  type: 'income' | 'expense';
  date: Date;
}

export const MONTHS = {
  JAN: '01',
  FEB: '02',
  MAR: '03',
  APR: '04',
  MAY: '05',
  JUN: '06',
  JUL: '07',
  AUG: '08',
  SEP: '09',
  OCT: '10',
  NOV: '11',
  DEC: '12',
} as const;

export const MONTHS_LABEL = {
  [MONTHS.JAN]: 'Janeiro',
  [MONTHS.FEB]: 'Fevereiro',
  [MONTHS.MAR]: 'Março',
  [MONTHS.APR]: 'Abril',
  [MONTHS.MAY]: 'Maio',
  [MONTHS.JUN]: 'Junho',
  [MONTHS.JUL]: 'Julho',
  [MONTHS.AUG]: 'Agosto',
  [MONTHS.SEP]: 'Setembro',
  [MONTHS.OCT]: 'Outubro',
  [MONTHS.NOV]: 'Novembro',
  [MONTHS.DEC]: 'Dezembro',
} as const;

export type MonthKey = keyof typeof MONTHS;
export type MonthValue = (typeof MONTHS)[MonthKey];

export const monthValueToKey: Record<MonthValue, MonthKey> = Object.fromEntries(
  Object.entries(MONTHS).map(([key, value]) => [value, key])
) as Record<MonthValue, MonthKey>;

export type Month = keyof typeof MONTHS;
