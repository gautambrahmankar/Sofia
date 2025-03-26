import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Video from 'react-native-video';

import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const SplashScreenVideo = () => {
  const videoRef = useRef(null);
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });

    return unsubscribe; // Cleanup listener
  }, []);

  const handleVideoEnd = () => {
    user
      ? navigation.navigate('MainStack', {})
      : navigation.navigate('Login', {});
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../../assets/videos/splash_video.mov')}
        style={styles.video}
        resizeMode="cover"
        muted={true}
        repeat={false}
        onEnd={handleVideoEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreenVideo;
