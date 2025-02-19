import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ProductCard from './ProductCard';
import DermatologistsList from './DermatologistList';
import KnowYourSkinCard from './KnowYourSkinCard';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>SOPHIE</Text>
        <TouchableOpacity style={styles.bellIcon}>
          {/* Placeholder for a bell icon */}
          <Text>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Face Scan Section */}
      <View style={styles.scanSection}>
        <Image
          style={styles.faceImage}
          source={require('../assets/images/Curly.png')} // Replace with the actual image URL
        />
        <TouchableOpacity style={styles.scanButton}>
          <Text style={styles.scanButtonText}>Tap to scan</Text>
        </TouchableOpacity>
      </View>

      {/* Range of Products Section */}
      <ProductCard />

      {/* Consult Dermatologist Section */}
      <DermatologistsList/>
      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Consult Dermatologist</Text>
        <View style={styles.dermatologistCard}>
          <Image
            style={styles.dermatologistImage}
            source={require('../assets/images/Jane.png')} // Replace with actual image URL
          />
          <View style={styles.dermatologistInfo}>
            <Text style={styles.dermatologistName}>Dr. Jane Cooper</Text>
            <Text>Senior Dermatologist</Text>
            <Text>10+ years Experience</Text>
            <Text>⭐ 5.0</Text>
            <TouchableOpacity style={styles.knowMoreButton}>
              <Text style={styles.knowMoreText}>Know more</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View> */}

      {/* Know Your Skin Section */}
      <KnowYourSkinCard/>


      {/* Our Results Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our results</Text>
        <View style={styles.resultsRow}>
          <View style={styles.resultCard}>
            <Image
              style={styles.resultImage}
              source={require('../assets/images/Leslie.png')}
            />
            <Text>Leslie Alexander</Text>
            <Text>⭐ 5.0</Text>
            <Text>Lorem ipsum dolor sit amet consectetur.</Text>
          </View>
          <View style={styles.resultCard}>
            <Image
              style={styles.resultImage}
              source={require('../assets/images/Saily.png')}
            />
            <Text>Saily Jane</Text>
            <Text>⭐ 5.0</Text>
            <Text>Lorem ipsum dolor sit amet consectetur.</Text>
          </View>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={{height: 400, width: 10}}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: '10%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {fontSize: 20, fontWeight: 'bold'},
  bellIcon: {padding: 8},
  scanSection: {
    alignItems: 'center',
    height: '25%',
    marginBottom: '15%',
    marginTop: '10%',
  },
  faceImage: {width: '100%', height: '100%', borderRadius: 10, marginBottom: 8},
  scanButton: {backgroundColor: '#ddd', padding: 10, borderRadius: 5},
  scanButtonText: {fontWeight: 'bold'},
  section: {marginVertical: 16, marginTop: 20},
  sectionTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 8},
  productRow: {flexDirection: 'row', justifyContent: 'space-between'},
  productCard: {
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    width: '48%',
    backgroundColor: '#F4F0EF',
    borderColor: '#F4F0EF',
  },
  productType: {fontSize: 16, marginBottom: 8},
  exploreButton: {backgroundColor: '#000000', padding: 8, borderRadius: 10},
  exploreText: {fontWeight: 'bold', color: 'white'},
  dermatologistCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    borderColor: '#F4F0EF',
    backgroundColor: '#F4F0EF',
    justifyContent:'space-around',
  },
  dermatologistImage: {
    width: '25%',
    height: '90%',
    borderRadius: 12,
    marginRight: 16,
  },
  dermatologistInfo: {flex: 1},
  dermatologistName: {fontSize: 16, fontWeight: 'bold'},
  knowMoreButton: {
    width: '40%',
    marginTop: 8,
    backgroundColor: '#000000',
    padding: '3%',
    borderRadius: 12,
    justifyContent:'center',
    // alignSelf: 'center',
  },
  knowMoreText: {fontWeight: 'bold', color:'white', textAlign:'center'},
  profileCard: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#F4F0EF',
    backgroundColor: '#F4F0EF',
  },
  startButton: {
    marginTop: 8,
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  startButtonText: {fontWeight: 'bold'},
  resultsRow: {flexDirection: 'row', justifyContent: 'space-between'},
  resultCard: {
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    width: '48%',
    borderColor: '#F4F0EF',
  },
  resultImage: {width: 50, height: 50, borderRadius: 25, marginBottom: 8},
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
  },
});

export default HomeScreen;
