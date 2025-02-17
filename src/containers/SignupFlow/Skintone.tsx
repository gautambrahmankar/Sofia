import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const Skintone = ({navigation}) => {
  const [selectedTone, setSelectedTone] = useState(null);
  const tones = [
    {id: 'dark', label: 'Dark', color: '#8B5E3C'},
    {id: 'medium', label: 'Medium', color: '#C99778'},
    {id: 'light', label: 'Light', color: '#EBDCC3'},
    {id: 'mediumLight', label: 'Medium Light', color: '#D8C1A3'},
    {id: 'mediumDark', label: 'Medium Dark', color: '#B4835B'},
  ];

  const handleToneSelection = id => {
    setSelectedTone(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, {width: '48%'}]} />
        </View>
        <Text style={styles.progressText}>48%</Text>
      </View>

      {/* Back Button */}
      {/* <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>◀</Text>
      </TouchableOpacity> */}

      {/* Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.title}>What’s your skin tone?</Text>
        <Text style={styles.subtitle}>
          Identifying your skin tone allows us to offer more effective
          recommendations.
        </Text>
      </View>

      {/* Skin Tone Options */}
      <View style={styles.optionsContainer}>
        {tones.map(tone => (
          <TouchableOpacity
            key={tone.id}
            style={[
              styles.option,
              {backgroundColor: tone.color},
              selectedTone === tone.id && styles.selectedOption,
            ]}
            onPress={() => handleToneSelection(tone.id)}>
            <Text
              style={[
                styles.optionLabel,
                selectedTone === tone.id && styles.selectedOptionLabel,
              ]}>
              {tone.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={[styles.continueButton]}
        onPress={() => {
          if (selectedTone) {
            navigation.navigate('Concerns', {skinTone: `${selectedTone}`});
            // Navigate to the next screen or perform an action here
          } else {
            alert('Please select a Skintone to continue.');
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
    backgroundColor: '#F9F9F9',
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
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 16,
  },
  option: {
    width: 80,
    height: 80,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#000',
  },
  optionLabel: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
  },
  selectedOptionLabel: {
    color: '#000',
    fontWeight: 'bold',
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
});

export default Skintone;
