import {storage} from './storage';
import firestore from '@react-native-firebase/firestore';

// Converts Open-Meteo weather codes to descriptions
export function getWeatherDescription(code: number) {
  const weatherDescriptions: {[key: number]: string} = {
    0: 'Clear Sky ☀️',
    1: 'Mainly Clear 🌤️',
    2: 'Partly Cloudy ⛅',
    3: 'Overcast ☁️',
    45: 'Fog 🌫️',
    48: 'Rime Fog ❄️',
    51: 'Light Drizzle 🌦️',
    53: 'Moderate Drizzle 🌦️',
    55: 'Heavy Drizzle 🌧️',
    61: 'Light Rain 🌧️',
    63: 'Moderate Rain 🌧️',
    65: 'Heavy Rain 🌧️',
    71: 'Light Snow 🌨️',
    73: 'Moderate Snow 🌨️',
    75: 'Heavy Snow ❄️',
    95: 'Thunderstorm ⛈️',
    99: 'Severe Thunderstorm ⚡',
  };
  return weatherDescriptions[code] || 'Unknown Weather 🤔';
}

export const saveOnboardingData = newData => {
  try {
    const existingData = storage.getString('onboarding_data');
    const parsedData = existingData ? JSON.parse(existingData) : {};

    // Merge new data with existing data
    const updatedData = {...parsedData, ...newData};

    // Save updated data in MMKV
    storage.set('onboarding_data', JSON.stringify(updatedData));

    console.log('✅ Saved to MMKV:', updatedData);
    console.log('✅ All Keys After Saving:', storage.getAllKeys());
  } catch (error) {
    console.error('❌ Error saving onboarding data:', error);
  }
};

export const getOnboardingData = () => {
  const data = storage.getString('onboarding_data');
  return data ? JSON.parse(data) : null;
};

export const submitOnboardingData = async userId => {
  try {
    // Retrieve onboarding data from MMKV
    const storedData = storage.getString('onboarding_data');

    if (!storedData) {
      console.error('No onboarding data found');
      return;
    }

    const userData = JSON.parse(storedData);

    // Add timestamps
    const finalData = {
      ...userData,
      created_at: firestore.FieldValue.serverTimestamp(),
      updated_at: firestore.FieldValue.serverTimestamp(),
    };

    // Save to Firestore
    firestore()
      .collection('Users')
      .doc(userId) // Use a specific user ID instead of `add()`
      .set(finalData)
      .then(() => {
        console.log('User onboarding data submitted successfully!');
      })
      .catch(error => {
        console.error('Error saving to Firestore:', error);
      });
  } catch (error) {
    console.error('Error submitting onboarding data:', error);
  }
};
