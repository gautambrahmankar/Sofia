import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {
  getOnboardingData,
  saveOnboardingData,
  submitOnboardingData,
} from '../../utils/common';
import {storage} from '../../utils/storage';

const Goals = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve user data from MMKV
    const storedUser = storage.getString('user_data');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }

    const storedData = storage.getString('onboarding_data');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData?.skin_factors?.goals) {
          setSelectedOption(parsedData.skin_factors.goals);
        }
      } catch (error) {
        console.error('Error parsing stored goal:', error);
      }
    }
  }, []);

  const options = [
    {id: '1', label: 'Fix the concerns of my skin'},
    {id: '2', label: 'Discover skincare products'},
    {id: '3', label: 'Educate myself about skincare'},
    {id: '4', label: 'Learn more about my skin'},
    {id: '5', label: 'Apply home treatments'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, {width: '100%'}]} />
        <Text style={styles.progressText}>100%</Text>
      </View>

      <Text style={styles.questionText}>What are your goals?</Text>
      <Text style={styles.subText}>
        Choose as many as you want. This will help us improve the app and your
        experience.
      </Text>

      <View style={styles.optionsContainer}>
        {options.map(option => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.option,
              selectedOption?.id === option.id && styles.selectedOption,
            ]}
            onPress={() =>
              setSelectedOption({id: option?.id, label: option?.label})
            }>
            <Text
              style={[
                styles.optionLabel,
                selectedOption?.id === option.id && styles.selectedOptionLabel,
              ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          if (selectedOption) {
            console.log(`Selected Goals: ${selectedOption}`);

            // Save goals in MMKV
            saveOnboardingData({
              skin_factors: {
                ...getOnboardingData()?.skin_factors,
                goals: selectedOption,
              },
            });

            submitOnboardingData(userData?.uid);

            // Navigate to the final screen
            navigation.navigate('HomeTabs', {experience: selectedOption});
          } else {
            Alert.alert('Please select your goals to continue.');
          }
        }}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'black',
    flex: 1,
  },
  progressText: {
    marginLeft: 10,
    fontSize: 12,
    color: 'black',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    width: '100%',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  selectedOption: {
    backgroundColor: '#000',
  },
  optionLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedOptionLabel: {
    color: '#FFF',
    fontWeight: '600',
  },
  subText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 30,
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: 'black',
  },
  continueButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    marginTop: 'auto',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Goals;
