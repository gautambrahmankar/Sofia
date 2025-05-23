import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
} from 'react-native';
import {saveOnboardingData} from '../../utils/common';
import {storage} from '../../utils/storage';

const {height} = Dimensions.get('window');

const Age = ({navigation}) => {
  const [selectedAge, setSelectedAge] = useState(null);
  const flatListRef = useRef(null);

  // Dynamically generate ages from 18 to 100
  const ages = Array.from({length: 83}, (_, i) => i + 18);

  const ITEM_HEIGHT = 60; // Height of each item
  const VISIBLE_ITEMS = 3; // Number of visible items

  const handleAgeSelect = age => {
    setSelectedAge(age);
  };

  useEffect(() => {
    // Retrieve gender from MMKV if available
    const storedData = storage.getString('onboarding_data');
    console.log('kk', storedData);
    console.log('All MMKV Keys:', storage.getAllKeys());

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData?.age) {
        setSelectedAge(parsedData.age);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedAge && flatListRef.current) {
      const index = ages.indexOf(selectedAge);
      if (index !== -1) {
        setTimeout(() => {
          flatListRef.current.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.5,
          });
        }, 300);
      }
    }
  }, [selectedAge]);

  // const handleScrollEnd = event => {
  //   const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
  //   setSelectedAge(ages[index]);
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, {width: '24%'}]} />
        </View>
        <Text style={styles.progressText}>24%</Text>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>How old are you?</Text>
        <Text style={styles.subtitle}>
          This will help us personalize your product suggestions based on your
          age group.
        </Text>
      </View>

      {/* Scrollable Age Picker */}
      <FlatList
        data={ages}
        ref={flatListRef}
        keyExtractor={item => item.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={
              selectedAge === item
                ? [styles.ageOption, styles.selectedOption]
                : styles.ageOption
            }
            onPress={() => handleAgeSelect(item)}>
            <Text
              style={
                selectedAge === item
                  ? [styles.ageText, styles.selectedText]
                  : styles.ageText
              }>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ageList}
        snapToAlignment={'center'}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate={'fast'}
        bounces={false}
        // onMomentumScrollEnd={handleScrollEnd}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        style={{
          height: ITEM_HEIGHT * VISIBLE_ITEMS, // Limit height to show only 3 items
        }}
      />

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          if (selectedAge) {
            console.log(`Selected Age: ${selectedAge}`);

            saveOnboardingData({age: selectedAge});

            // Navigate to the next screen
            navigation.navigate('Skintype', {Age: selectedAge});
          } else {
            alert('Please select your age to continue.');
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
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -80,
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
  },
  ageList: {
    //alignItems: 'center',
    //paddingVertical: 20,
    // height:150,
    // backgroundColor:'red'
  },
  ageOption: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
  },
  selectedOption: {
    backgroundColor: '#d3d3d3',
  },
  ageText: {
    fontSize: 16,
    color: 'black',
  },
  selectedText: {
    color: 'black',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Age;
