import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearAllVotes = async () => {
  try {
    await AsyncStorage.removeItem('votedIdeas');
    console.log('All vote data cleared successfully');
  } catch (error) {
    console.error('Error clearing vote data:', error);
  }
};
