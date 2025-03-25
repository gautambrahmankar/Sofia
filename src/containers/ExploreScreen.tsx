import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { navigate } from '../navigation/navigationUtils';

const recommendations = [
  {
    id: '1',
    title: 'The beginner’s guide to product types',
    category: 'Skincare 101',
    image: require('../assets/images/Explore1.png'),
  },
  {
    id: '2',
    title: 'The ultimate guide to getting rid of acne',
    category: 'Acne',
    image: require('../assets/images/Explore2.png'),
  },
  {
    id: '3',
    title: 'The beginner’s guide to product types',
    category: 'Skincare 101',
    image: require('../assets/images/Explore1.png'),
  },
  {
    id: '4',
    title: 'The ultimate guide to getting rid of acne',
    category: 'Acne',
    image: require('../assets/images/Explore2.png'),
  },
];

const Skincare = [
  {
    id: '1',
    title: 'The ultimate guide to getting rid of acne',
    category: 'Acne',
    image: require('../assets/images/Explore2.png'),
  },
  {
    id: '2',
    title: 'The ultimate guide to getting rid of acne',
    category: 'Skincare 101',
    image: require('../assets/images/Explore1.png'),
  },
  {
    id: '3',
    title: 'The ultimate guide to getting rid of acne',
    category: 'Acne',
    image: require('../assets/images/Explore2.png'),
  },
  {
    id: '4',
    title: 'The ultimate guide to getting rid of acne',
    category: 'Skincare 101',
    image: require('../assets/images/Explore1.png'),
  },
];

const ingredients = [
  {name: 'Allantoin', image: require('../assets/images/Ingredients1.png')},
  {
    name: 'Alpha Lipoic Acid',
    image: require('../assets/images/Ingredients2.png'),
  },
  {name: 'Glycolic Acid', image: require('../assets/images/Ingredients3.png')},
  {name: 'Beta Glucan', image: require('../assets/images/Ingredients4.png')},
  {name: 'Argan Oil', image: require('../assets/images/Ingredients5.png')},
  {
    name: 'Alpha Hydroxy Acid',
    image: require('../assets/images/Ingredients6.png'),
  },
];

const ExploreScreen = ({navigation}) => {
  return (
   
      <View style={{flex:1,alignItems: "center",justifyContent: "center"}}>
      <Text style={styles.glowSkin}>Coming Soon</Text>
      </View>
          
 
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', padding: 20},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  glowSkin: {fontSize: 32, fontWeight: 'semibold',alignSelf: 'center'},
  bellIcon: {padding: 8},
  title: {fontSize: 24, fontWeight: 'bold', marginTop: 5},
  subtitle: {color: 'gray', marginBottom: 10},
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8D9CE',
    padding: 2,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  searchIcon: {marginRight: 10, marginLeft: 10},
  searchInput: {flex: 1},
  sectionTitle: {fontSize: 18, fontWeight: 'bold', marginTop: 20},
  sectionSubtitle: {color: 'gray', marginBottom: 10},
  card: {marginRight: 15},
  cardImage: {width: 180, height: 100, borderRadius: 10},
  cardTitle: {fontWeight: 'bold', width: 150, marginTop: '4%'},
  cardCategory: {color: 'gray'},
  ingredientsContainer: {flexDirection: 'row', flexWrap: 'wrap'},
  ingredientBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ingredientImage: {width: 20, height: 20, borderRadius: 10, marginRight: 5},
  ingredientText: {fontSize: 14, fontWeight: 'bold'},
});

export default ExploreScreen;
