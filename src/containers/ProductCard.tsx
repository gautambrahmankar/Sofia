import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {navigate} from '../navigation/navigationUtils';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

export default function ProductList() {
  const {t} = useTranslation();

  const products = [
    {type: 'Dry', image: require('../assets/images/Dry.png')},
    {type: 'Oily', image: require('../assets/images/Oily.png')},
    {type: 'Normal', image: require('../assets/images/Normal.png')},
    {type: 'Acne', image: require('../assets/images/acne1.png')},
    {type: 'Combination', image: require('../assets/images/Combination.png')},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('range_of_products')}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        {products.map((product, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.description}>
                {t('product_description', {
                  type: t(`skin_type_${product.type.toLowerCase()}`),
                })}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigate('Products', {})}>
                <Text style={styles.buttonText}>{t('product_explore')}</Text>
              </TouchableOpacity>
            </View>
            <Image source={product.image} style={styles.image} />
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
    backgroundColor: '#F4F0EF',
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
    flex: 1, // Ensures text wraps properly
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flexWrap: 'wrap',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 10,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
