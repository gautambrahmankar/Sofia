import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import {getOnboardingData, saveOnboardingData} from '../../utils/common';
import {storage} from '../../utils/storage';

const Concerns = ({navigation}) => {
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const concerns = [
    {
      id: 'blackWhiteheads',
      label: 'Black/White heads',
      image: require('../../assets/images/black.png'),
    },
    {
      id: 'darkUndereyes',
      label: 'Dark Undereyes',
      image: require('../../assets/images/eye.png'),
    },
    {
      id: 'hyperpigmentation',
      label: 'Hyper-Pigmentation',
      image: require('../../assets/images/hyper.png'),
    },
    {
      id: 'roughness',
      label: 'Roughness',
      image: require('../../assets/images/roughness.png'),
    },
    {
      id: 'sensitivity',
      label: 'Sensitivity',
      image: require('../../assets/images/sensi.png'),
    },
    {
      id: 'wrinkles',
      label: 'Wrinkles',
      image: require('../../assets/images/wrinkles.png'),
    },
    {
      id: 'dullness',
      label: 'Dullness',
      image: require('../../assets/images/dullness.png'),
    },
    {
      id: 'largePores',
      label: 'Large Pores',
      image: require('../../assets/images/largepores.png'),
    },
    {
      id: 'acneScars',
      label: 'Acne Scars',
      image: require('../../assets/images/acne1.png'),
    },
  ];

  const handleConcernSelection = id => {
    setSelectedConcerns(prev => {
      const uniqueSelections = [...new Set(prev)];
      return uniqueSelections.includes(id)
        ? uniqueSelections.filter(concern => concern !== id)
        : [...uniqueSelections, id];
    });
  };
  useEffect(() => {
    const storedData = storage.getString('onboarding_data');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData?.skin_factors?.concerns) {
          setSelectedConcerns(parsedData.skin_factors.concerns);
        }
      } catch (error) {
        console.error('Error parsing onboarding data:', error);
      }
    }
  }, []);

  console.log('seee', selectedConcerns);

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, {width: '69%'}]} />
        </View>
        <Text style={styles.progressText}>69%</Text>
      </View>
      {/* Back Button */}
      {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>◀</Text>
      </TouchableOpacity> */}
      {/* Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.title}>What are your concerns?</Text>
        <Text style={styles.subtitle}>
          Identifying your concerns will help us to offer more effective
          recommendations.
        </Text>
      </View>
      {/* Concern Options */}
      <FlatList
        data={concerns}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.optionsContainer}
        renderItem={({item}) => {
          const isSelected = selectedConcerns.find(i => i.id === item.id);
          console.log(
            'isss',
            selectedConcerns.find(i => i.id === item.id),
            item,
          );

          return (
            <View>
              <TouchableOpacity
                key={item.id}
                style={[styles.option, isSelected && styles.selectedOption]}
                onPress={() => handleConcernSelection(item)}>
                <Image source={item.image} style={styles.image} />
                {isSelected && (
                  <View style={styles.checkmarkContainer}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
              <Text style={styles.optionLabel}>{item.label}</Text>\
            </View>
          );
        }}
      />;
      {
        /* Continue Button */
      }
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          if (selectedConcerns.length > 0) {
            console.log(`Selected Concerns: ${selectedConcerns}`);

            // Save concerns in MMKV before navigating
            saveOnboardingData({
              skin_factors: {
                ...getOnboardingData()?.skin_factors, // Preserve existing skin factors
                concerns: selectedConcerns,
              },
            });

            // Navigate to the next screen
            navigation.navigate('Experience', {concerns: selectedConcerns});
          } else {
            Alert.alert('Please select at least one concern to continue.');
          }
        }}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>;
      ; ; ;;
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
    marginVertical: 16,
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  option: {
    width: Dimensions.get('window').width / 3 - 24,
    height: Dimensions.get('window').width / 3 - 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    borderRadius: Dimensions.get('window').width / 6,
    backgroundColor: '#E0E0E0',
  },
  image: {
    width: Dimensions.get('window').width / 3 - 24,
    height: Dimensions.get('window').width / 3 - 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    borderRadius: Dimensions.get('window').width / 6,
  },
  selectedOption: {
    borderColor: '#000',
    borderWidth: 3,
  },
  optionLabel: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 4,
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
  disabledButton: {
    backgroundColor: '#999',
  },
  checkmarkContainer: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Concerns;
