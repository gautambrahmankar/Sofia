import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Linking,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import {goBack} from '../navigation/navigationUtils';
import SafeAreaWrapper from '../navigation/SafeAreaViewWrapper';
import ProductCard from '../components/ProductCard';
import ProductCarousel from '../components/ProductCarousel';

const categoryMap = {
  all: 'all',
  moisturizer: 'Moisturizer',
  hair_care_oil: 'Hair Care',
  makeup_remover: 'Make-up Removal',
  anti_aging_cream: 'Anti-Aging',
  face_cleanser: 'Face Cleanser',
};

const products = [
  {
    id: 1,
    name: 'Anti-Aging Cream 50 ML',
    type: 'Anti-Aging',
    price: '$56.00',
    image: require('../assets/images/Anti_Aging.jpg'),
    url: 'https://sophiecosmetix.com/index.php?route=product/product&language=en-gb&product_id=427&path=224&limit=100',
  },
  {
    id: 2,
    name: 'Face Cleanser Gel 100ML',
    type: 'Face Cleanser',
    price: '$56.00',
    image: require('../assets/images/Face_Cleanser.jpg'),
  },
  {
    id: 3,
    name: 'Hair Care Oil',
    type: 'Hair Care',
    price: '$56.00',
    image: require('../assets/images/Hair_Care_Oil.jpg'),
  },
  {
    id: 4,
    name: 'Moisturizer Hydrating Cream 50 ML',
    type: 'Moisturizer',
    price: '$56.00',
    image: require('../assets/images/Mosturizer.jpg'),
  },
  {
    id: 5,
    name: 'Two Phase Make-Up Remover 100 ML',
    type: 'Make-up Removal',
    price: '$56.00',
    image: require('../assets/images/Makeup_Remover.jpg'),
  },
  {
    id: 6,
    name: 'The Everyday Essentials - 3-Piece Face Cleansing and Hair Care Set',
    type: 'Face Cleanser',
    price: '$56.00',
    image: require('../assets/images/Hair_Care_Oil.jpg'),
  },
];

export default function ProductsScreen() {
  const {t} = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [redirectURL, setRedirectURL] = useState(null);
  const [error, setError] = useState(null);
  const categories = Object.keys(categoryMap);

  const filteredProducts = products.filter(
    p => selectedCategory === 'all' || p.type === categoryMap[selectedCategory],
  );

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const ipResponse = await fetch('https://api64.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const userIP = ipData.ip;

        const locationResponse = await fetch(
          `https://ipapi.co/${userIP}/json/`,
        );
        const locationData = await locationResponse.json();

        console.log('User Location:', locationData);
        const isTurkishIP = locationData.country_code === 'TR';
        const url = isTurkishIP
          ? 'https://sophiecosmetix.com.tr/'
          : 'https://sophiecosmetix.com/';

        setRedirectURL(url);
      } catch (err) {
        console.error('Error fetching IP or location:', err);
        setError('Could not fetch location.');
      }
    };

    fetchUserLocation();
  }, []);

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color="black"
              onPress={goBack}
            />
            <Text style={styles.headerTitle}>{t('products_heading')}</Text>
          </View>

          <MaterialIcons name="shopping-bag" size={24} color="black" />
        </View>

        {/* Category Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}>
                {t(category)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {filteredProducts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>{t('no_products')}</Text>
            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() => setSelectedCategory('all')}>
              <Text style={styles.exploreText}>{t('explore_products')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{marginTop: 20}}>
            <ProductCarousel
              products={filteredProducts}
              redirectURL={redirectURL ?? 'https://sophiecosmetix.com/'}
            />
          </View>
        )}
      </View>
    </SafeAreaWrapper>
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
    fontFamily: 'Walkway Expand UltraBold',
    marginLeft: 8,
  },
  categoryScroll: {
    flexDirection: 'row',
    marginBottom: 16,
    // height: 50,
    maxHeight: 30,
  },
  categoryButton: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    marginHorizontal: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '90%',
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
  addToCartButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  addToCartText: {
    color: 'white',
    fontSize: 14,
  },
  // Empty State Styling
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  exploreButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    borderRadius: 8,
  },
  exploreText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
