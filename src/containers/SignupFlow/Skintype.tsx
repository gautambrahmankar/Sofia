import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {storage} from '../../utils/storage';
import {getOnboardingData, saveOnboardingData} from '../../utils/common';

const Skintype = ({navigation}) => {
  const [selectedSkinType, setSelectedSkinType] = useState(null);

  const skinTypes = [
    {id: 'dry', label: 'Dry', image: require('../../assets/images/Dry.png')},
    {id: 'oily', label: 'Oily', image: require('../../assets/images/Oily.png')},
    {
      id: 'normal',
      label: 'Normal',
      image: require('../../assets/images/Normal.png'),
    }, // ✅ Added id
    {
      id: 'acne',
      label: 'Acne-Prone',
      image: require('../../assets/images/acne1.png'),
    },
    {
      id: 'combination',
      label: 'Combination',
      image: require('../../assets/images/Combination.png'),
    },
  ];

  const handleSkinTypeSelection = id => {
    setSelectedSkinType(id);
  };

  useEffect(() => {
    // Retrieve stored skin type from MMKV
    const storedData = storage.getString('onboarding_data');
    console.log('Stored MMKV Data:', storedData);
    console.log('All MMKV Keys:', storage.getAllKeys());

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const skinFactors = parsedData?.skin_factors;
      if (skinFactors?.skin_type) {
        const filteredSkinTypeId = skinTypes.find(
          type =>
            type?.id.toLowerCase() === skinFactors?.skin_type.toLowerCase(),
        )?.id;
        setSelectedSkinType(filteredSkinTypeId ?? '');
      }
    }
  }, []);
  console.log('sel skin', selectedSkinType);

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, {width: '36%'}]} />
        </View>
        <Text style={styles.progressText}>36%</Text>
      </View>

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
            <View
              style={[
                styles.imageWrapper,
                selectedSkinType === skinType.id && styles.selectedBorder,
              ]}>
              <Image
                source={skinType.image}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
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

            saveOnboardingData({
              skin_factors: {
                ...getOnboardingData()?.skin_factors,
                skin_type: selectedSkinType,
              },
            });

            // Navigate to the next screen
            navigation.navigate('Skintone', {type: selectedSkinType});
          } else {
            Alert.alert('Please select a Skin Type to continue.');
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
    width: '90%',
    alignSelf: 'center',
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
  headingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
    paddingHorizontal: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
  option: {
    alignItems: 'center',
    margin: 12,
  },
  imageWrapper: {
    width: 90,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#FFF',
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 8,
    elevation: 4,
  },
  selectedBorder: {
    borderWidth: 2,
    borderColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
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
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Skintype;
