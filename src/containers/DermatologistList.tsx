import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const dermatologists = [
  {
    id: '1',
    name: 'Dr. Jane Cooper',
    title: 'Senior Dermatologist',
    experience: '10+ years Experience',
    rating: 5.0,
    image: require('../assets/images/Jane.png'), // Replace with your actual image
  },
  {
    id: '2',
    name: 'Dr. John Doe',
    title: 'Expert Dermatologist',
    experience: '8+ years Experience',
    rating: 4.8,
    image: require('../assets/images/Jane.png'), // Replace with your actual image
  },
];

const DermatologistCard = ({ item }) => (
  <View style={styles.card}>
    <Image source={item.image} style={styles.image} />
    <View style={styles.details}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.experience}>{item.experience}</Text>
      <View style={styles.rating}>
        <Icon name="star" size={16} color="#FFD700" />
        <Icon name="star" size={16} color="#FFD700" />
        <Icon name="star" size={16} color="#FFD700" />
        <Icon name="star" size={16} color="#FFD700" />
        <Icon name="star" size={16} color="#FFD700" />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Know more</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function DermatologistsList() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Consult Dermatologist</Text>
      <FlatList
        data={dermatologists}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <DermatologistCard item={item} />}
      />
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
  list: {
    paddingHorizontal: 8,
  },
  card: {
    flexDirection: 'row',
    // backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    width: 320,
    elevation: 3,
    backgroundColor: '#F4F0EF',
    borderColor: '#F4F0EF',
  },
  image: {
    width: 80,
    height: 100,
    borderRadius: 10,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    color: '#666',
  },
  experience: {
    fontSize: 12,
    color: '#888',
    marginVertical: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
