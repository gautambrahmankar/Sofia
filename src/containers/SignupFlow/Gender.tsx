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
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData?.gender) {
        setSelectedGender(parsedData.gender);
      }
    }
  }, []);

  const handleContinue = () => {
    if (selectedGender) {
      saveOnboardingData({gender: selectedGender});
      navigation.navigate('Age', {Gender: selectedGender});
    } else {
      Alert.alert('Please select a gender to continue.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* PROGRESS BAR CONTAINER */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, {width: '12%'}]} />
        </View>
        <Text style={styles.progressText}>12%</Text>
      </View>

      {/* MAIN CONTENT (Flex 1 to take remaining space) */}
      <View style={styles.contentContainer}>
        {/* Title & Subtitle */}
        <Text style={styles.title}>What’s your gender?</Text>
        <Text style={styles.subtitle}>
          This will help us adjust your routine steps based on your gender
        </Text>

        {/* Gender Choices */}
        <View style={styles.genderRow}>
          {[
            {label: 'Female', icon: 'female-outline'},
            {label: 'Male', icon: 'male-outline'},
          ].map(item => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.genderOption,
                selectedGender === item.label && styles.selectedOption,
              ]}
              onPress={() => setSelectedGender(item.label)}>
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
      </View>

      {/* CONTINUE BUTTON (No absolute positioning) */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Gender;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10, // slight space from top
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginRight: 8,
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
  contentContainer: {
    flex: 1, // takes all remaining space
    justifyContent: 'center', // center content vertically
    alignItems: 'center', // center content horizontally
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
  },
  genderOption: {
    width: '40%',
    alignItems: 'center',
    paddingVertical: 20,
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
    marginVertical: 20,
    width: '90%',
    alignSelf: 'center',
  },
  continueText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
