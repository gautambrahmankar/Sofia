import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './src/navigation/AuthStack';
import LocalNotification from './src/helpers/LocalNotification';
import {navigationRef} from './src/navigation/navigationUtils';
import {LogBox} from 'react-native';
import {configureGoogleSignIn} from './src/utils/googleAuth';

LogBox.ignoreAllLogs();
const App = () => {
  useEffect(() => {
    configureGoogleSignIn();
    LocalNotification.scheduleDailyWeatherNotifications();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <AuthStack />
    </NavigationContainer>
  );
};

export default App;
