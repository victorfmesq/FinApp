import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStorage = <T>(key: string, initialValue: T) => {
  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);

      const result =
        jsonValue != null ? (JSON.parse(jsonValue) as T) : initialValue;

      return result;
    } catch (error) {
      console.error(`Error loading data for key ${key}:`, error);
    }
  };

  const saveData = async (value: T) => {
    try {
      const jsonValue = JSON.stringify(value);

      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error saving data for key ${key}:`, error);
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing data for key ${key}:`, error);
    }
  };

  return { saveData, removeData, loadData };
};
