import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

const products = [
  { type: 'Dry', image: require('../assets/images/Dry.png') },
  { type: 'Oily', image: require('../assets/images/Oily.png') },
  { type: 'Normal', image: require('../assets/images/Normal.png') },
  { type: 'Acne', image: require('../assets/images/acne1.png') },
  { type: 'Combination', image: require('../assets/images/Combination.png') },
];


export default function ProductList() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Range of products</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollView}
      >
        {products.map((product, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.description}>Products for {product.type.toLowerCase()} skin type</Text>
              <Image source={product.image} style={styles.image} />
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Explore</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scrollView: {
    paddingHorizontal: 8,
  },
  card: {
    width: CARD_WIDTH,
    height: 150,
    backgroundColor: '#F4F0EF',
    borderColor: '#F4F0EF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContent: {
    // flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 10,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
