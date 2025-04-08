import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {Camera} from 'react-native-camera-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {goBack} from '../navigation/navigationUtils';
import {useFocusEffect} from '@react-navigation/native';
import {detectFacePresence} from '../utils/aiAnalysis';

const {width, height} = Dimensions.get('window');

const SelfieCameraScreen = ({navigation}) => {
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [cameraPosition, setCameraPosition] = useState('front');
  const [isDetectingFace, setIsDetectingFace] = useState(false);
  const [faces, setfaces] = useState<Face[]>([]);

  useEffect(() => {
    StatusBar.setHidden(true);
    return () => StatusBar.setHidden(false);
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const result = await check(PERMISSIONS.IOS.CAMERA);
      if (result !== RESULTS.GRANTED) {
        return await request(PERMISSIONS.IOS.CAMERA);
      }
      return true;
    }
  };

  useEffect(() => {
    const checkPermissions = async () => {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'Camera permission is required to use this feature. Please enable it in settings.',
        );
        navigation.goBack();
      }
    };

    checkPermissions();
  }, []);

  const handleFaceCheck = async photoUri => {
    setIsDetectingFace(true);
    const hasFace = await detectFacePresence(photoUri);

    if (hasFace) {
      setPhoto({uri: photoUri});
    } else {
      Alert.alert('Retake Photo', 'No face detected. Please try again.');
      setPhoto(null);
    }

    setIsDetectingFace(false);
  };

  // Capture Image and Perform Face Detection
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const image = await cameraRef.current.capture();
        const photoUri = image.uri;
        console.log('Captured image:', photoUri);
        handleFaceCheck(photoUri);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const confirmPhoto = () => {
    if (photo) {
      navigation.navigate('SkinAnalysis', {photoUri: photo.uri, faces});
    }
  };

  const flipCamera = useCallback(() => {
    setCameraPosition(current => (current === 'front' ? 'back' : 'front'));
  }, []);

  useFocusEffect(
    useCallback(() => {
      setPhoto(null);
      setfaces([]);
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.blackBar} />
      {isDetectingFace && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.detectingText}>Detecting Face...</Text>
        </View>
      )}

      <View style={styles.cameraContainer}>
        {photo ? (
          <Image source={{uri: photo.uri}} style={styles.preview} />
        ) : (
          <Camera
            ref={cameraRef}
            style={styles.camera}
            cameraType={cameraPosition}
            flashMode="off"
          />
        )}
      </View>

      <View style={styles.controlBar}>
        <Text style={styles.photoLabel}>PHOTO</Text>

        <View style={styles.controlsRow}>
          <TouchableOpacity onPress={goBack} style={styles.sideButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={takePicture}
            disabled={isDetectingFace}
            style={styles.captureButtonContainer}>
            {isDetectingFace ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <View style={styles.captureButtonOuter}>
                <View style={styles.captureButtonInner} />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={photo ? confirmPhoto : flipCamera}
            style={styles.sideButton}>
            <View
              style={[styles.flipButton, photo ? styles.disabledButton : null]}>
              {photo ? (
                <Icon name="checkmark" size={20} color="white" />
              ) : (
                <Icon name="refresh" size={20} color="white" />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#000'},
  blackBar: {height: height * 0.12, backgroundColor: '#000'},
  cameraContainer: {height: height * 0.7, width: width},
  camera: {flex: 1},
  preview: {flex: 1, resizeMode: 'cover'},
  controlBar: {flex: 1, backgroundColor: '#000', paddingTop: 10},
  photoLabel: {
    color: '#FFD700',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sideButton: {width: 60, alignItems: 'center', justifyContent: 'center'},
  cancelText: {color: 'white', fontSize: 16},
  captureButtonContainer: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonOuter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  flipButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(60, 60, 60, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {opacity: 0.5},
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  detectingText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default SelfieCameraScreen;
