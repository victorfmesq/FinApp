import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

import { LineChart, PieChart } from 'react-native-chart-kit';
import Entypo from '@expo/vector-icons/Entypo';
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import Selector, { IconOption } from '../common/Selector';
import useTransactions from '../../contexts/hooks/useTransactions';
import { theme } from '../../themes';
import { View, Text, Dimensions, Animated, useColorScheme } from 'react-native';
import { useChartTransition } from '../../hooks/animations/useChartTransition';
import { getChartConfig, calculateLineData, calculatePieData } from './utils';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types';
import { useNavigation } from '@react-navigation/native';

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

type HomeTabScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeTabs'
>;

const ChartViewer = () => {
  const [selectedChart, setSelectedChart] = useState<string>(options[0].id);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [chartData, setChartData] = useState({ line: {}, pie: [] });
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const { addListener } = useNavigation<HomeTabScreenNavigationProp>();
  const { currentTransactions } = useTransactions();

  const { opacity, transitionChart } = useChartTransition(300);

  const isDarkMode = useColorScheme() === 'dark';
  const chartConfig = getChartConfig(isDarkMode);

  useEffect(() => {
    const focusListener = addListener('focus', () => {
      setIsFocus(true);
    });

    const blurListener = addListener('blur', () => {
      setIsFocus(false);
    });

    return () => {
      focusListener;
      blurListener;
    };
  });

  useEffect(() => {
    // if (isFocus)
    loadData();
  }, [currentTransactions, isFocus]);

  const loadData = useCallback(() => {
    if (currentTransactions.length === 0) {
      return;
    }

    const lineData = calculateLineData(currentTransactions);
    const pieData = calculatePieData(currentTransactions);

    setChartData({ line: lineData, pie: pieData });
  }, [currentTransactions]);

  console.log('chartData :>> ', JSON.stringify(chartData));

  const handleSelect = (selectedId: string) => {
    transitionChart(() => {
      setSelectedChart(selectedId);
      scrollViewRef.current?.scrollTo({ x: 0, animated: true });
    });
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const isNoDataAvailable = useMemo(
    () => currentTransactions.length === 0,
    [currentTransactions]
  );

  const renderCharts = useCallback(() => {
    if (isNoDataAvailable || chartData.pie.length === 0) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text>Nenhum dado disponível</Text>
        </View>
      );
    }

    switch (selectedChart) {
      case 'line':
        return (
          <LineChart
            data={chartData.line}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            style={{ borderRadius: 24 }}
          />
        );
      case 'pie':
        return (
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
        );
      default:
        return null;
    }
  }, [
    isNoDataAvailable,
    selectedChart,
    chartData,
    chartConfig,
    currentTransactions,
  ]);

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="gap-3 items-center justify-start pt-2 bg-light-background dark:bg-dark-background">
        <Selector
          options={options}
          onSelect={handleSelect}
          selectedId={selectedChart}
        />

        <View className="overflow-hidden w-full h-64 items-center bg-light-surface dark:bg-dark-surface rounded-3xl">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            ref={scrollViewRef}
          >
            <Animated.View
              style={{
                width: screenWidth,
                opacity,
              }}
            >
              {renderCharts()}
            </Animated.View>
          </ScrollView>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default ChartViewer;
