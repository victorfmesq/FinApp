export type TabKey = 'Home' | 'Add' | 'Transactions';
export type TabValue = {
  icon: (props: any) => JSX.Element;
  screen: React.ComponentType<any>;
};
