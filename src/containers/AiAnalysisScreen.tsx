import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import Svg, {Path, Rect, Text as SvgText} from 'react-native-svg';
import SkinAnalysisModal from '../components/SkinInsightsModal';
import {analyzeFace} from '../utils/aiAnalysis';
import {storage} from '../utils/storage';
import {useTranslation} from 'react-i18next';

const AIAnalysisScreen = ({route, navigation}) => {
  const {photoUri, faces} = route.params;
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageWidth, setimageWidth] = useState(0);
  const [imageHeight, setimageHeight] = useState(0);
  const {t} = useTranslation();
  const [layout, setLayout] = useState({width: 0, height: 0});

  useEffect(() => {
    const analyzeImage = async () => {
      try {
        setLoading(true);
        console.log('photo uri', photoUri);
        const response = await analyzeFace(photoUri, faces);

        console.log('res', response);
        if (response) {
          setAnalysisResult(response);
          storage.set('scanResult', JSON.stringify(response));
        }
      } catch (error) {
        setLoading(false);
        console.error('Error analyzing face:', error);
      } finally {
        setLoading(false);
      }
    };
    analyzeImage();
  }, [faces, photoUri]);

  const annotationPositions = {
    'Dark Circles Left': {
      top: '25%',
      left: '10%',
      type: 'arrow',
      label: 'Dark Circles',
    },
    'Dark Circles Right': {
      top: '25%',
      right: '5%',
      type: 'arrow',
      label: 'Dark Circles',
    },
    Blackheads: {top: '45%', right: '5%', type: 'line', label: 'Blackheads'},
    Acne: {top: '60%', right: '5%', type: 'line', label: 'Acne'},
    Pores: {top: '50%', right: '5%', type: 'line', label: 'Pores'},
    'Dark Spots': {top: '55%', right: '5%', type: 'line', label: 'Dark Spots'},
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 180}}>
        {/* Top Image Section */}
        <View style={styles.rowContainer}>
          {/* Left: User Scan */}
          <View style={styles.imageBlock}>
            <Image source={{uri: photoUri}} style={styles.image} />
            <Text style={styles.titleText}>Your Scan</Text>
          </View>

          {/* Right: Sample Analysis */}
          <View
            style={styles.imageBlock}
            onLayout={event => {
              const {width, height} = event.nativeEvent.layout;
              setLayout({width, height});
            }}>
            <Image
              source={require('../assets/images/skin_analysis.png')}
              style={styles.image}
            />
            <Text style={styles.titleText}>Sample Analysis</Text>

            {Object.entries(annotationPositions).map(
              ([key, position], index) => {
                // Check if annotation is present in response
                const isPresent = analysisResult?.annotations?.find(
                  item => item.label === position.label && item.present,
                );

                if (!isPresent) {
                  return null; // Skip if not present
                }

                // Render arrow style
                if (position.type === 'arrow') {
                  return (
                    <View
                      key={key}
                      style={[
                        styles.annotationContainer,
                        {
                          top: position.top,
                          left: position.left,
                          right: position.right,
                        },
                      ]}>
                      <View style={styles.arrowUp} />
                      <Text style={styles.labelText}>{position.label}</Text>
                    </View>
                  );
                }

                // Render horizontal line style
                if (position.type === 'line') {
                  return (
                    <View
                      key={key}
                      style={[
                        styles.labelContainerRight,
                        {top: position.top, right: position.right},
                      ]}>
                      <View style={styles.horizontalLineRight} />
                      <Text style={styles.labelText}>{position.label}</Text>
                    </View>
                  );
                }

                return null;
              },
            )}
          </View>
        </View>

        {/* Cards for different conditions */}
        {analysisResult?.concerns?.map((concern, index) => (
          <View key={index} style={styles.card}>
            {/* Concern Header */}
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{concern.name}</Text>
              <Text style={styles.severity}>{concern.severityLevel}</Text>
            </View>

            {/* Reason why this is happening */}
            <Text style={[styles.cardBody, {marginBottom: 8}]}>
              <Text style={{fontWeight: 'bold'}}>Why this happens: </Text>
              {concern.description}
            </Text>

            {/* Advice */}
            {concern.advice ? (
              <Text style={styles.cardBody}>
                <Text style={{fontWeight: 'bold'}}>Advice: </Text>
                {concern.advice}
              </Text>
            ) : null}
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.retakeButton}
          onPress={() => navigation.goBack()}
          disabled={loading}>
          <Text style={styles.buttonText}>{t('buttons.retake_scan')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.insightButton}
          onPress={() => setModalVisible(true)}
          disabled={loading}>
          <Text style={[styles.buttonText, {color: '#000'}]}>
            {t('buttons.see_insights')}
          </Text>
        </TouchableOpacity>
      </View>
      <SkinAnalysisModal
        analysisResult={analysisResult}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        imageToShow={photoUri}
      />
      {loading && (
        <View style={styles.analyzingLoaderOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.analyzingText}>Analysing Face...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    width: '100%',
    height: 400,
    position: 'relative',
    backgroundColor: '#ccc', // fallback if the image doesn't load
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  card: {
    backgroundColor: '#f8f8f8',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  severity: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
  },
  cardBody: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginBottom: 6,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  imageBlock: {
    width: '48%',
    height: 400,
    position: 'relative',
    backgroundColor: '#ccc',
    borderRadius: 12,
    overflow: 'hidden',
    flexShrink: 0,
  },
  titleText: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlayLabel: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 8,
  },
  labelContainerLeft: {
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Right side label styles
  labelContainerRight: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '500',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#fff',
    width: 40,
    marginLeft: 5,
  },
  horizontalLineRight: {
    height: 1,
    backgroundColor: '#fff',
    width: 40,
    marginRight: 5,
  },
  annotationContainer: {
    position: 'absolute',
    alignItems: 'center',
  },

  arrowUp: {
    width: 1,
    height: 20,
    backgroundColor: '#fff',
    marginTop: 40,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '10%',
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // optional background
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // for Android shadow
  },

  retakeButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  insightButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },

  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  analyzingLoaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  analyzingText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AIAnalysisScreen;
