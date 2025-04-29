import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {ProgressCircle} from 'react-native-svg-charts';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the close icon
import {Linking} from 'react-native';
import {navigate} from '../navigation/navigationUtils';
import {CommonActions, useNavigation} from '@react-navigation/native';

const SkinAnalysisModal = ({
  modalVisible,
  setModalVisible,
  analysisResult,
  imageToShow,
}) => {
  const [loading, setLoading] = useState(false);
  const [redirectURL, setRedirectURL] = useState(null);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  // Fetch IP and determine redirection URL
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
      } finally {
        setLoading(false);
      }
    };

    fetchUserLocation();
  }, []);

  const handleRedirect = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'MainStack',
            state: {
              index: 0, // show just 1 route (HomeTabs) at this level
              routes: [
                {
                  name: 'HomeTabs',
                  state: {
                    // tabs in order: 0 -> Home, 1 -> Products, etc.
                    index: 1, // if "Products" is the second tab
                    routes: [
                      {name: 'Home'},
                      {name: 'Products'},
                      // ... other tabs ...
                    ],
                  },
                },
              ],
            },
          },
        ],
      }),
    );
  };
  return (
    <Modal visible={modalVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={styles.closeIcon}>
          <Icon name="close" size={28} color="#FFF" />
        </TouchableOpacity>
        <ImageBackground
          source={{uri: imageToShow}}
          style={styles.backgroundImage}
          blurRadius={10}>
          <View style={styles.modalContent}>
            {/* Close Button */}

            {/* Circular Progress Indicator */}
            <View style={styles.progressContainer}>
              <ProgressCircle
                style={styles.progressCircle}
                progress={analysisResult?.skinHealth / 100}
                progressColor={'#FFB6C1'}
                strokeWidth={12}
              />
              <View style={styles.progressTextContainer}>
                <Text style={styles.skinHealth}>
                  {analysisResult?.skinHealth}%
                </Text>
                <Text style={styles.skinHealthLabel}>Skin Health</Text>
              </View>
            </View>

            <Text style={styles.skinAge}>
              Skin Age {analysisResult?.skinAge}
            </Text>

            <View style={styles.concernContainer}>
              <Text style={{color: '#fff', fontSize: 16, marginBottom: 5}}>
                Concerns
              </Text>

              {analysisResult?.concerns?.map((concern, index) => (
                <View key={index} style={styles.concernItem}>
                  <Text style={styles.concernText}>{concern.name}</Text>
                  <Text style={styles.concernPercentage}>
                    {concern.percentage}%
                  </Text>
                </View>
              ))}
            </View>

            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : error ? (
              <Text style={{color: 'red', marginBottom: 10}}>{error}</Text>
            ) : (
              <TouchableOpacity
                onPress={handleRedirect}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>
                  See Recommended Products
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 35,
    right: 15,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 5,
  },
  progressContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    marginTop: 30, // Spacing below close icon
  },
  progressCircle: {
    width: 150,
    height: 150,
  },
  progressTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skinHealth: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
  },
  skinHealthLabel: {
    fontSize: 14,
    color: '#FFF',
  },
  skinAge: {
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    color: '#FFF',
    marginBottom: 10,
    marginTop: 15,
  },
  concernContainer: {
    width: '100%',
    marginTop: 10,
  },
  concernItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    marginVertical: 5,
  },
  concernText: {
    fontSize: 16,
    color: '#FFF',
  },
  concernPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  closeButton: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default SkinAnalysisModal;
