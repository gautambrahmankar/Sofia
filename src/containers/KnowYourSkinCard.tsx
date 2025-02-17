import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function KnowYourSkinCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Know your skin</Text>
      <View style={styles.card}>
        <View style={styles.leftSection}>
          <Text style={styles.title}>Let’s personalize your profile</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start now</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../assets/images/KnowSkin.png')} // Replace with actual image
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
  },
  leftSection: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  button: {
    width: '60%',
    backgroundColor: 'black',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    // alignSelf:'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign:'center',
  },
  image: {
    width: 120,
    height: 100,
    resizeMode: 'contain',
  },
});
