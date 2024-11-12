import React, { useContext, useRef, useState, useEffect } from 'react';
import { View, Dimensions, useColorScheme, Animated } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import Selector, { IconOption } from '../../../../components/Selector';
import Entypo from '@expo/vector-icons/Entypo';
import { theme } from '../../../../themes';
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import useItems from '../../../../contexts/hooks/useItems';

const screenWidth = Dimensions.get('window').width;

const options: IconOption[] = [
  {
    id: 'pie',
    icon: (
      <Entypo name="circular-graph" size={24} color={theme.light.textPrimary} />
    ),
  },
  {
    id: 'line',
    icon: (
      <Entypo name="line-graph" size={24} color={theme.light.textPrimary} />
    ),
  },
];

const ChartViewer = () => {
  const { getItemsByMonth, selectedMonth } = useItems();
  const [opacity] = useState(new Animated.Value(1));
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';
  const [selectedChart, setSelectedChart] = useState<string>(options[0].id);
  const [chartData, setChartData] = useState({ line: {}, pie: [] });

  // Atualizar dados para o gráfico quando o mês ou dados do contexto mudarem
  useEffect(() => {
    console.log('selectedMonth: ', selectedMonth);
    const items = getItemsByMonth(
      selectedMonth,
      new Date().getFullYear().toString()
    );

    console.log('items: ', JSON.stringify(items));

    const days = Array.from(
      new Set(items.map(item => new Date(item.date).getDate()))
    );
    const lineData = {
      labels: days.map(day => String(day).padStart(2, '0')),
      datasets: [
        {
          data: days.map(day => {
            const incomeItems = items.filter(
              item =>
                new Date(item.date).getDate() === day && item.type === 'income'
            );
            return incomeItems.reduce((total, item) => total + item.amount, 0);
          }),
          color: () => theme.finance.income,
        },
        {
          data: days.map(day => {
            const expenseItems = items.filter(
              item =>
                new Date(item.date).getDate() === day && item.type === 'expense'
            );
            return expenseItems.reduce((total, item) => total + item.amount, 0);
          }),
          color: () => theme.finance.expense,
        },
      ],
    };

    const incomeTotal = items
      .filter(item => item.type === 'income')
      .reduce((total, item) => total + item.amount, 0);
    const expenseTotal = items
      .filter(item => item.type === 'expense')
      .reduce((total, item) => total + item.amount, 0);

    const pieData = [
      {
        name: 'Receitas',
        population: incomeTotal,
        color: theme.finance.income,
        legendFontColor: theme.light.textSecondary,
        legendFontSize: 15,
      },
      {
        name: 'Despesas',
        population: expenseTotal,
        color: theme.finance.expense,
        legendFontColor: theme.light.textSecondary,
        legendFontSize: 15,
      },
    ];

    setChartData({ line: lineData, pie: pieData });
  }, [getItemsByMonth, selectedMonth]);

  const handleSelect = (selectedId: string) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setSelectedChart(selectedId);
      scrollViewRef.current?.scrollTo({ x: 0, animated: true });
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const chartConfig = {
    backgroundColor: isDarkMode ? theme.dark.surface : theme.light.surface,
    backgroundGradientFrom: isDarkMode
      ? theme.dark.surface
      : theme.light.surface,
    backgroundGradientTo: isDarkMode
      ? theme.dark.background
      : theme.light.background,
    color: () => (isDarkMode ? theme.dark.primary : theme.light.primary),
    labelColor: () =>
      isDarkMode ? theme.dark.textPrimary : theme.light.textPrimary,
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-start pt-4 px-4 bg-light-background dark:bg-dark-background">
        <Selector
          options={options}
          onSelect={handleSelect}
          selectedId={selectedChart}
        />

        <View className="mt-4 w-full items-center bg-light-surface dark:bg-dark-surface rounded-3xl">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={true}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            ref={scrollViewRef}
          >
            <Animated.View style={{ width: screenWidth, opacity }}>
              {selectedChart === 'line' && (
                <LineChart
                  data={chartData.line}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                  style={{ borderRadius: 24 }}
                />
              )}
              {selectedChart === 'pie' && (
                <PieChart
                  paddingLeft="0"
                  data={chartData.pie}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                  accessor="population"
                  backgroundColor="transparent"
                  absolute
                />
              )}
            </Animated.View>
          </ScrollView>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default ChartViewer;
