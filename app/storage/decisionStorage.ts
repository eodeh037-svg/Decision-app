import AsyncStorage from '@react-native-async-storage/async-storage';
export const saveDecision = async (data: any) => {
  try {
    await AsyncStorage.setItem('decision_data', JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

export const loadDecision = async () => {
  try {
    const data = await AsyncStorage.getItem('decision_data');
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.log(e);
    return null;
  }
};