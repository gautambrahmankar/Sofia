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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.glowSkin}>Glow Skin</Text>
        <TouchableOpacity style={styles.bellIcon}>
          <Icon name="notifications" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Academy</Text>
      <Text style={styles.subtitle}>
        Expand your skincare knowledge to achieve perfect skin
      </Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          placeholder="Search the library"
          style={styles.searchInput}
        />
      </View>

      {/* Daily Recommendations */}
      <Text style={styles.sectionTitle}>Thursday, Jul 11</Text>
      <Text style={styles.sectionSubtitle}>
        Here are your daily recommendations
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={recommendations}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={()=>  navigation.navigate('AcneguideScreen')} style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <Text numberOfLines={2} style={styles.cardTitle}>
              {item.title}
            </Text>
            <Text style={styles.cardCategory}>{item.category}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Ingredients Section */}
      <Text style={styles.sectionTitle}>Ingredients</Text>
      <Text style={styles.sectionSubtitle}>
        Gain expertise in active ingredients
      </Text>
      <View style={styles.ingredientsContainer}>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientBadge}>
            <Image source={ingredient.image} style={styles.ingredientImage} />
            <Text style={styles.ingredientText}>{ingredient.name}</Text>
          </View>
        ))}
      </View>

      {/* Skincare 101  */}
      <Text style={styles.sectionTitle}>Skincare 101</Text>
      <Text style={styles.sectionSubtitle}>
        Basic knowledge to embark on your skincare journey
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={Skincare}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <Text numberOfLines={2} style={styles.cardTitle}>
              {item.title}
            </Text>
            <Text style={styles.cardCategory}>{item.category}</Text>
          </TouchableOpacity>
        )}
      />
      {/* New and Noteworthy */}
      <Text style={styles.sectionTitle}>New and Noteworthy</Text>
      <Text style={styles.sectionSubtitle}>
        Fresh content we’ve just prepared for you
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={recommendations}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <Text numberOfLines={2} style={styles.cardTitle}>
              {item.title}
            </Text>
            <Text style={styles.cardCategory}>{item.category}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={{height: 100, width: 10}}></View>
    </ScrollView>
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
  glowSkin: {fontSize: 18, fontWeight: 'bold'},
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
