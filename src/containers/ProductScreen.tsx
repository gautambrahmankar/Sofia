import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const categories = ['All', 'Lotion', 'Toner', 'Serum', 'Cream'];

const products = [
  { id: 1, name: 'Josen Blossom', type: 'Moisturizer', price: '$29.00', image: require('../assets/images/Product1.png') },
  { id: 2, name: 'Josen Blossom', type: 'Toner', price: '$29.00', image: require('../assets/images/Product2.png') },
  { id: 3, name: 'Josen Blossom', type: 'Night Cream', price: '$29.00', image: require('../assets/images/Product2.png') },
  { id: 4, name: 'Josen Blossom', type: 'Moisturizer', price: '$29.00', image: require('../assets/images/Product1.png') },
  { id: 5, name: 'Josen Blossom', type: 'Toner', price: '$29.00', image: require('../assets/images/Product2.png') },
  { id: 6, name: 'Josen Blossom', type: 'Toner', price: '$29.00', image: require('../assets/images/Product2.png') },
  { id: 7, name: 'Josen Blossom', type: 'Toner', price: '$29.00', image: require('../assets/images/Product1.png') },
];


export default function ProductsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerTitle}>Products</Text>
        <MaterialIcons name="shopping-bag" size={24} color="black" />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={[styles.categoryButton, index === 0 && styles.categoryButtonActive]}>
            <Text style={[styles.categoryText, index === 0 && styles.categoryTextActive]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {[1, 2, 3].map((listIndex) => (
        <FlatList
          key={listIndex}
          data={products}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${listIndex}-${item.id}`}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productType}>{item.type}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
              <MaterialIcons name="lock-outline" size={20} color="gray" style={styles.lockIcon} />
            </View>
          )}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoryScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: 'black',
  },
  categoryText: {
    fontSize: 14,
    color: 'black',
  },
  categoryTextActive: {
    color: 'white',
  },
  card: {
    width: 165,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    marginHorizontal: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productType: {
    fontSize: 14,
    color: 'gray',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  lockIcon: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
});
