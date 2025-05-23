import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {saveOnboardingData} from '../../utils/common';
import {storage} from '../../utils/storage';

const Gender = ({navigation}) => {
  const [selectedGender, setSelectedGender] = useState(null);

  useEffect(() => {
    // Retrieve gender from MMKV if available
    const storedData = storage.getString('onboarding_data');
    console.log('kk', storedData);
    console.log('All MMKV Keys:', storage.getAllKeys());

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData?.gender) {
        setSelectedGender(parsedData.gender);
      }
    }
  }, []);

  const handleGenderSelect = gender => {
    setSelectedGender(gender);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, {width: '12%'}]} />
        </View>
        <Text style={styles.progressText}>12%</Text>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What’s your gender?</Text>
        <Text style={styles.subtitle}>
          This will help us adjust your routine steps based on your gender
        </Text>
      </View>

      {/* Gender Options */}
      <View style={styles.genderContainer}>
        {[
          {label: 'Female', icon: 'female-outline'},
          {label: 'Male', icon: 'male-outline'},
          // {label: 'Non-binary', icon: 'ellipse-outline'},
        ].map(item => (
          <TouchableOpacity
            key={item.label}
            style={[
              styles.genderOption,
              selectedGender === item.label && styles.selectedOption,
            ]}
            onPress={() => handleGenderSelect(item.label)}>
            <Icon
              name={item.icon}
              size={30}
              color={selectedGender === item.label ? 'green' : 'white'}
            />
            <Text
              style={[
                styles.genderText,
                selectedGender === item.label && styles.selectedText,
              ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          if (selectedGender) {
            console.log(`Selected Gender: ${selectedGender}`);

            saveOnboardingData({gender: selectedGender});

            navigation.navigate('Age', {Gender: selectedGender});
          } else {
            Alert.alert('Please select a gender to continue.');
          }
        }}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginRight: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: 'black',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: 150,
  },
  genderOption: {
    width: '30%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  selectedOption: {
    backgroundColor: 'black',
  },
  genderText: {
    marginTop: 10,
    fontSize: 14,
    color: 'white',
  },
  selectedText: {
    color: 'green',
  },
  continueButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    // marginBottom: 4,
  },
  continueText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Gender;
