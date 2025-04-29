import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './src/navigation/AuthStack';
import LocalNotification from './src/helpers/LocalNotification';
import {navigationRef} from './src/navigation/navigationUtils';
import {LogBox} from 'react-native';
import {configureGoogleSignIn} from './src/utils/googleAuth';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import notifee, {EventType} from '@notifee/react-native';

LogBox.ignoreAllLogs();
const App = () => {
  useEffect(() => {
    configureGoogleSignIn();
    LocalNotification.checkPermissions();
    // LocalNotification.scheduleDailyWeatherNotifications();
    const now = new Date();

    const fireAt = new Date(now.getTime() + 5000);
    LocalNotification.scheduleDailyWeatherNotifications();
  }, []);

  useEffect(() => {
    LocalNotification.checkPermissions();
    setTimeout(() => {
      LocalNotification.testNotificationInProduction();
    }, 5000);
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <AuthStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
