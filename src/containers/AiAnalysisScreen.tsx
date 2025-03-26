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
} from 'react-native';
import Svg, {Rect, Text as SvgText} from 'react-native-svg';
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

  useEffect(() => {
    const analyzeImage = async () => {
      Image.getSize(
        photoUri,
        (width, height) => {
          console.log('img h', width, height);

          setimageHeight(height);
          setimageWidth(width);
        },
        error => console.error(error),
      );
      try {
        console.log('photo uri', photoUri);
        const response = await analyzeFace(photoUri, faces);

        const result = {
          skinHealth: 75,
          skinAge: 25,
          concerns: [
            {name: 'Pores', percentage: 10},
            {name: 'Acne', percentage: 5},
            {name: 'Dark Circles', percentage: 15},
            {name: 'Dark Spots', percentage: 5},
          ],
          annotations: [
            {
              label: 'Dark Circles',
              coordinates: [{x: 40, y: 50}],
            },
            {
              label: 'Blackheads',
              coordinates: [{x: 45, y: 45}],
            },
            {
              label: 'Acne',
              coordinates: [{x: 50, y: 55}],
            },
          ],
        };

        console.log('res', response);

        setAnalysisResult(response);
        storage.set('scanResult', JSON.stringify(response));
      } catch (error) {
        console.error('Error analyzing face:', error);
      } finally {
        setLoading(false);
      }
    };
    analyzeImage();
  }, [faces, photoUri]);

  return (
    <View style={styles.container}>
      <ImageBackground source={{uri: photoUri}} style={styles.image}>
        {loading ? (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Analyzing Face...</Text>
          </View>
        ) : (
          <>
            <Svg height="100%" width="100%" style={styles.overlay}>
              {analysisResult?.annotations?.map((annotation, index) =>
                annotation.coordinates.map((coord, coordIndex) => (
                  <React.Fragment
                    key={`${annotation.label}-${index}-${coordIndex}`}>
                    <Rect
                      x={`${coord.x}%`}
                      y={`${coord.y}%`}
                      width="20"
                      height="20"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    />
                    <SvgText
                      x={`${coord.x + 2}%`}
                      y={`${coord.y - 2}%`}
                      fill="white"
                      fontSize="14"
                      fontWeight="bold"
                      textAnchor="middle">
                      {annotation.label}
                    </SvgText>
                  </React.Fragment>
                )),
              )}
            </Svg>
            ;
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.retakeButton}
                onPress={() => navigation.goBack()}
                disabled={loading} // Disable button while analyzing
              >
                <Text style={styles.buttonText}>
                  {t('buttons.retake_scan')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.insightButton}
                onPress={() => setModalVisible(true)}
                disabled={loading} // Disable button while analyzing
              >
                <Text style={[styles.buttonText, {color: '#000'}]}>
                  {t('buttons.see_insights')}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ImageBackground>

      {/* Modal for Insights */}
      <SkinAnalysisModal
        analysisResult={analysisResult}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        imageToShow={photoUri}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Ensures the full image is visible without cropping
    justifyContent: 'flex-end',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonContainer: {
    flexDirection: 'column',
    paddingBottom: '20%',
    marginHorizontal: 20,
  },
  retakeButton: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  insightButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop: '4%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Loading Overlay
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dim background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default AIAnalysisScreen;
