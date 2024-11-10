import React, { useRef, useState } from 'react';
import { View, Dimensions, useColorScheme, Animated } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit'; // Removido o StackedBarChart
import Selector, { IconOption } from '../../../../components/Selector';
import Entypo from '@expo/vector-icons/Entypo';
import { theme } from '../../../../themes';
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;

// Dados financeiros para os gráficos
const chartData = {
  line: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [2000, 4500, 2800, 8000, 9900, 4300], // Exemplo de valores de receita
        color: (opacity = 1) => theme.finance.income, // Receita
      },
      {
        data: [1500, 3200, 2000, 5000, 7000, 3500], // Exemplo de valores de despesa
        color: (opacity = 1) => theme.finance.expense, // Despesa
      },
    ],
  },
  pie: [
    {
      name: 'Receitas',
      population: 60, // Exemplo de percentual
      color: theme.finance.income, // Receita
      legendFontColor: theme.light.textSecondary,
      legendFontSize: 15,
    },
    {
      name: 'Despesas',
      population: 40, // Exemplo de percentual
      color: theme.finance.expense, // Despesa
      legendFontColor: theme.light.textSecondary,
      legendFontSize: 15,
    },
  ],
};

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
  // Comentado o gráfico de barras
  // {
  //   id: 'stackedBar',
  //   icon: <Entypo name="bar-graph" size={24} color={theme.light.textPrimary} />,
  // },
];

const ChartViewer = () => {
  const [opacity] = useState(new Animated.Value(1));
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';

  const [selectedChart, setSelectedChart] = useState<string>(options[0].id);

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
    {
      useNativeDriver: false,
    }
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
                  style={{ borderRadius: '1.5rem' }}
                />
              )}

              {/* Comentado o gráfico de barras */}
              {/* {selectedChart === 'stackedBar' && (
                <StackedBarChart
                  hideLegend={false}
                  withHorizontalLabels={false}
                  data={chartData.stackedBar}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                />
              )} */}

              {selectedChart === 'pie' && (
                <PieChart
                  paddingLeft="0"
                  data={chartData.pie}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                  accessor={'population'}
                  backgroundColor={'transparent'}
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
