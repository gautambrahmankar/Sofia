/* eslint-disable curly */
import notifee, {
  AndroidImportance,
  AuthorizationStatus,
  EventType,
  Notification,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import {fetchWeather, getLocationFromIP} from '../utils/api';
import {getWeatherDescription} from '../utils/common';
import {storage} from '../utils/storage';
import {navigationRef} from '../navigation/navigationUtils';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

class Notifications {
  constructor() {
    this.bootstrap();

    // Listen for events
    // This is called when the app is in the foreground
    notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          navigationRef?.navigate('Products', {});
          break;
      }
    });

    // This is called when the app is in the background
    notifee.onBackgroundEvent(async ({type, detail}) => {
      const {notification} = detail;
      console.log('Notification received: background', type, detail);
      if (notification) {
        this.handleNotificationOpen(notification);
      }
    });
  }

  // This method deals with what what happens when the user clicks on the notification
  public handleNotificationOpen(notification: Notification) {
    const {data} = notification;
    navigationRef?.navigate('Products', {});
    console.log('Notification Opened', data);
  }

  // This method is called when the app is launched from a notification
  public async bootstrap() {
    const initialNotification = await notifee.getInitialNotification();
    if (initialNotification) {
      this.handleNotificationOpen(initialNotification.notification);
    }
  }

  // This method is called to check if the user has granted permission to send notifications
  public async checkPermissions() {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log('Permission settings:', settings);
      return true;
    } else {
      console.log('User declined permissions');
      return false;
    }
  }

  public async scheduleNotification({
    reminder,
    date,
  }: {
    reminder: string;
    date: Date;
  }) {
    // Check if the user has granted permission to send notifications
    const hasPermissions = await this.checkPermissions();
    console.log('has perm', hasPermissions);

    if (hasPermissions) {
      const channelId = await notifee.createChannel({
        id: 'important',
        name: 'Important Notifications',
        importance: AndroidImportance.HIGH,
      });
      // Create the notification details
      const notificationDetails = {
        id: '1',
        title: `🔔 You asked for this reminder - ${reminder}`,
        body: 'Tap on it to check',
        android: {
          channelId: channelId,
          pressAction: {
            id: 'default',
          },
        },
        data: {
          id: '1',
          action: 'reminder',
          details: {
            name: reminder,
            date: date.toString(),
          },
        },
      };

      console.log('notif details=>', notificationDetails);

      // Schedule the notification
      const notificationId = await notifee.displayNotification({
        title: `🔔 Reminder - ${reminder}`,
        body: 'Tap to check',
        android: {
          channelId: channelId,
          pressAction: {
            id: 'default',
          },
        },
      });

      console.log('Displayed immediate notification', notificationId);
    }
  }

  async getLocationUsingGPS(): Promise<{
    latitude: number;
    longitude: number;
  } | null> {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.warn('Location permission not granted');
        return null;
      }
    }

    return new Promise(resolve => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          resolve({latitude, longitude});
        },
        error => {
          console.error('GPS Location Error:', error);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 10000,
        },
      );
    });
  }

  // Schedule Notifications at 8 AM & 8 PM
  public async scheduleDailyWeatherNotifications() {
    const hasPermissions = await this.checkPermissions();
    if (!hasPermissions) return;
    const userDataString = storage.getString('user_data');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const userName = userData?.name || 'User';

    const location = await this.getLocationUsingGPS();
    console.log('📍 Location:', location);

    if (!location) {
      console.warn('⚠️ Location not available.');
      return;
    }
    const weather = await fetchWeather(location.latitude, location.longitude);

    // 🛑 Log weather data to debug issues
    console.log('Fetched weather data:', weather);

    if (!weather || typeof weather.condition !== 'number') {
      console.warn('Weather condition is undefined:', weather);
      return;
    }

    const {temperature, condition, uvIndex} = weather;
    const weatherDescription = getWeatherDescription(condition);

    let advice = '';

    // Dynamic recommendations based on weather
    switch (true) {
      case uvIndex >= 6:
        advice = `☀️ High UV today! Protect your skin with sunscreen from Sophie's Cosmetix!`;
        break;
      case weatherDescription.includes('Rain') ||
        [51, 53, 55, 61, 63, 65].includes(condition):
        advice = `🌧️ Rainy today! Keep your skin hydrated with Sophie's Cosmetix.`;
        break;
      case weatherDescription.includes('Snow') ||
        [71, 73, 75].includes(condition):
        advice = `❄️ Cold weather! Nourish your skin with winter-care products.`;
        break;
      case weatherDescription.includes('Fog') || [45, 48].includes(condition):
        advice = `🌫️ Foggy today! Brighten your skin with our top brightening skincare.`;
        break;
      default:
        advice = `🌤️ The weather looks great! Keep glowing with daily skincare essentials.`;
        break;
    }

    const morningTime = new Date();
    morningTime.setHours(8, 0, 0, 0); // 8:00 AM

    const eveningTime = new Date();
    eveningTime.setHours(20, 0, 0, 0);

    const weatherText = `Hey ${userName}, today's weather: ${temperature}°C, ${weatherDescription}. ${advice}`;

    const nightRoutineText = `Hey ${userName}, it's getting late! 🌙 Time for your night routine. 
    Keep your skin healthy overnight with our skincare essentials!`;
    // const now = new Date();

    // const fireAt = new Date(now.getTime() + 5000);
    await this.scheduleNotificationAtTime(morningTime, weatherText);
    await this.scheduleNotificationAtTime(eveningTime, nightRoutineText);
    // await this.displayImmediateNotification(nightRoutineText);
    // await this.scheduleNotificationAtTime(
    //   new Date(Date.now() + 10 * 1000),
    //   'Test Message',
    // );
  }

  public async testNotificationInProduction() {
    try {
      const hasPermissions = await this.checkPermissions();
      console.log('Has notification permissions:', hasPermissions);

      if (!hasPermissions) {
        console.log('Cannot send test notification - no permission');
        return false;
      }

      const channelId = await notifee.createChannel({
        id: 'test-channel',
        name: 'Test Notifications',
        importance: AndroidImportance.HIGH,
      });

      const notificationId = await notifee.displayNotification({
        title: '🧪 Test Notification',
        body: 'If you see this, notifications are working in production!',
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
        },
      });

      console.log('Test notification displayed:', notificationId);
      return true;
    } catch (error) {
      console.error('Failed to display test notification:', error);
      return false;
    }
  }

  public async displayImmediateNotification(message: string) {
    const hasPermissions = await this.checkPermissions();
    if (!hasPermissions) return;

    // Ensure the notification channel exists (for Android)
    const channelId = await notifee.createChannel({
      id: 'weather',
      name: 'Weather Updates',
      importance: AndroidImportance.HIGH,
    });

    // Display notification immediately
    await notifee.displayNotification({
      title: '🌤️ Weather Update (Immediate)',
      body: message,
      android: {
        channelId: channelId,
        pressAction: {
          id: 'default',
        },
      },
    });

    console.log('Displayed immediate notification:', message);
  }

  // Function to schedule a notification at a specific time (e.g., 8 AM or 8 PM)
  public async scheduleNotificationAtTime(time: Date, message: string) {
    const hasPermissions = await this.checkPermissions();
    if (!hasPermissions) return;

    const now = new Date();
    if (time <= now) {
      // If time has already passed today, schedule it for tomorrow
      time.setDate(time.getDate() + 1);
    }

    console.log('✅ Scheduling notification at:', time);

    // Create channel (Android only — iOS ignores this)
    const channelId = await notifee.createChannel({
      id: 'weather',
      name: 'Weather Updates',
      importance: AndroidImportance.HIGH,
    });

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: time.getTime(), // must be a future timestamp
      // iOS-only option for repeat (optional)
      // repeatFrequency: RepeatFrequency.DAILY,
    };

    await notifee.createTriggerNotification(
      {
        title: '🌤️ Weather Update',
        body: message,
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
        },
        ios: {
          // Helps make it visible while in foreground
          foregroundPresentationOptions: {
            alert: true,
            sound: true,
            badge: true,
          },
        },
      },
      trigger,
    );
  }
}

export default new Notifications();
