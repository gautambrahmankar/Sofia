import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useWindowDimensions} from 'react-native';

const Skintype = ({navigation}) => {
  const [selectedSkinType, setSelectedSkinType] = useState(null);
  const skinTypes = [
    {id: 'dry', label: '', image: require('../../assets/images/Dry.png')},
    {id: 'oily', label: '', image: require('../../assets/images/Oily.png')},
    {id: 'normal', label: '', image: require('../../assets/images/Normal.png')},
    {id: 'acne', label: '', image: require('../../assets/images/acne1.png')},
    {
      id: 'combination',
      label: '',
      image: require('../../assets/images/Combination.png'),
    },
  ];

  const handleSkinTypeSelection = id => {
    setSelectedSkinType(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, {width: '36%'}]} />
        </View>
        <Text style={styles.progressText}>36%</Text>
      </View>

      {/* Back Button */}
      {/* <TouchableOpacity style={styles.backButton} onPress={() => {}}>
        <Text style={styles.backButtonText}>◀</Text>
      </TouchableOpacity> */}

      {/* Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.title}>What’s your skin type?</Text>
        <Text style={styles.subtitle}>
          Identifying your skin type allows us to offer more effective
          recommendations.
        </Text>
      </View>

      {/* Skin Type Options */}
      <View style={styles.optionsContainer}>
        {skinTypes.map(skinType => (
          <TouchableOpacity
            key={skinType.id}
            style={[
              styles.option,
              selectedSkinType === skinType.id && styles.selectedOption,
            ]}
            onPress={() => handleSkinTypeSelection(skinType.id)}>
            <Image source={skinType.image} style={styles.image} />
            <Text style={styles.optionLabel}>{skinType.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          if (selectedSkinType) {
            console.log(`Selected type: ${selectedSkinType}`);
            navigation.navigate('Skintone', {type: `${selectedSkinType}`});
            // Navigate to the next screen or perform an action here
          } else {
            alert('Please select a Skintype to continue.');
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
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
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
    top: -100,
  },
  option: {
    width: 80,
    height: 100,
    margin: 8,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: 'transparent',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 30,
  },
  optionLabel: {
    marginTop: 8,
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
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

export default Skintype;
