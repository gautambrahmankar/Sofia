import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Goals = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: '100%' }]} />
        <Text style={styles.progressText}>100%</Text>
      </View>

      <Text style={styles.questionText}>What are your goals?</Text>
      <Text style={styles.subText}>
        Choose as many as you want. This will help us improve the app and your experience.
      </Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Fix the concerns of my skin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Discover skincare products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Educate myself about skincare</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Learn more about my skin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Apply home treatments</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('NextScreen')} // Replace 'NextScreen' with your next screen name
      >
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
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Goals;
