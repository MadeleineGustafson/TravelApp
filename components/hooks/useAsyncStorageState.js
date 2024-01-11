import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export function useAsyncStorageState(initialState, key) {
  const [state, setState] = useState(() => {
    const getData = async () => {
      try {
        const stringState = await AsyncStorage.getItem(key);
        if (stringState !== null) {
          return JSON.parse(stringState);
        }
      } catch (error) {
        console.error('Error reading data from AsyncStorage:', error);
      }
      return initialState;
    };

    return getData();
  });

  useEffect(() => {
    const setData = async () => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.error('Error saving data to AsyncStorage:', error);
      }
    };

    setData();
  }, [key, state]);

  return [state, setState];
}
