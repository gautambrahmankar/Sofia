import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Experience = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    {id: 'regularly', label: 'I do it regularly'},
    {id: 'few_times', label: 'I tried a few times'},
    {id: 'no_idea', label: 'I have no idea'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, {width: '84%'}]} />
        </View>
        <Text style={styles.progressText}>84%</Text>
      </View>

      {/* Back Button */}
      {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>◀</Text>
      </TouchableOpacity> */}

      {/* Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.title}>
          How experienced are you in skincare routine?
        </Text>
        <Text style={styles.subtitle}>
          We will use this info to improve your experience in the app.
        </Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {options.map(option => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.option,
              selectedOption === option.id && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption(option.id)}>
            <Text
              style={[
                styles.optionLabel,
                selectedOption === option.id && styles.selectedOptionLabel,
              ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          if (selectedOption) {
            navigation.navigate('Goals', {experience: selectedOption});
          } else {
            alert('Please select your experience to continue.');
          }
        }}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  progressBarBackground: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#000',
  },
  progressText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  backButton: {
    marginVertical: 8,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  headingContainer: {
    marginVertical: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'left',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'left',
    color: '#666',
    marginTop: 8,
  },
  optionsContainer: {
    marginVertical: 16,
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
  continueButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    marginTop: 'auto',
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#999',
  },
});

export default Experience;
