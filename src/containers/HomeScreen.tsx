import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import ProductCard from './ProductCard';
import DermatologistsList from './DermatologistList';
import KnowYourSkinCard from './KnowYourSkinCard';
import LocalNotification from '../helpers/LocalNotification';
import {navigate} from '../navigation/navigationUtils';
import {useTranslation} from 'react-i18next';
import i18n, {changeLanguage} from '../config/i18';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import notifee from '@notifee/react-native';
import {storage} from '../utils/storage';
import SafeAreaWrapper from '../navigation/SafeAreaViewWrapper';

interface NotificationData {
  id: string;
  title: string;
  body: string;
  timestamp: string;
}

const HomeScreen = () => {
  const {t} = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isModalVisible, setModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] =
    useState(false);

  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, []);

  const selectLanguage = language => {
    changeLanguage(language);
    setCurrentLanguage(language);
    setModalVisible(false);
  };

  const handleScheduleReminder = async () => {
    const testTime = new Date(Date.now() + 5 * 1000);
    LocalNotification.scheduleNotificationAtTime(
      testTime,
      'Test notification after 5 seconds 🚀',
    );
  };

  const fetchDisplayedNotifications = async () => {
    try {
      const displayedNotifications = await notifee.getDisplayedNotifications();

      const newNotifications = displayedNotifications.map(notif => ({
        id: notif.notification.id,
        title: notif.notification.title || 'No Title',
        body: notif.notification.body || 'No Message',
        timestamp: new Date().toISOString(),
      }));

      saveNotifications(newNotifications);
      loadNotifications();
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  console.log('notofcs', notifications);

  // Save notifications in MMKV
  const saveNotifications = newNotifications => {
    const existingNotifications = storage.getString('notifications');
    const parsedNotifications = existingNotifications
      ? JSON.parse(existingNotifications)
      : [];

    // Merge new and existing notifications
    const updatedNotifications = [...newNotifications, ...parsedNotifications];

    storage.set('notifications', JSON.stringify(updatedNotifications));
  };

  // Load notifications from MMKV
  const loadNotifications = () => {
    const storedNotifications = storage.getString('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
  };

  // Load stored notifications on app startup
  useEffect(() => {
    loadNotifications();
  }, []);

  const reviews = [
    {
      name: 'Arrya Sharma',
      rating: 5,
      date: 'a month ago',
      review:
        'Sophie Cosmetix has some of the best beauty products I’ve tried! The quality is amazing, and everything feels so luxurious on the skin. Their formulas are gentle yet effective, and I’ve noticed a real difference since using them. Shipping was fast, and the packaging is beautiful. Definitely a brand I’ll keep coming back to!',
      likes: 1,
      response: 'We really appreciate your comment. Thank you.',
      url: require('../assets/images/arya_Sharma.png'),
    },
    {
      name: 'Selçuk Keleş',
      rating: 5,
      date: 'a month ago',
      review:
        'I have the perfume from the premium collection and I’m really happy, the scent stays on you all day long!',
      likes: 0,
      response: null,
      url: require('../assets/images/sercan_keles.png'),
    },
    {
      name: 'Sebastian Siles Roman',
      rating: 5,
      date: 'a month ago',
      review:
        'Una variedad perfecta de productos para regalar, son de muy buena calidad 👌🏽',
      likes: 0,
      response: null,
      url: require('../assets/images/sebestian_pic.png'),
    },
  ];

  return (
    <SafeAreaWrapper>
      <ScrollView style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          {/* <Text style={styles.title}>SOPHIE</Text> */}
          <Image
            source={{
              uri: 'https://sophiecosmetix.com/image/cache/catalog/journal3/Logo/sophie-retina-2481x473.png',
            }}
            width={150}
            height={50}
            style={{width: 150, height: 20}}
            resizeMode="contain"
          />
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.bellIcon}
              onPress={async () => {
                await fetchDisplayedNotifications();
                setNotificationModalVisible(true);
                // LocalNotification.displayImmediateNotification('Test');
              }}
              // onPress={handleScheduleReminder}
            >
              <Text>🔔</Text>
            </TouchableOpacity>
            {/* Language Switch Icon */}
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.languageSwitcher}>
              <FontAwesome name="language" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal for Notifications */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={notificationModalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Notifications</Text>

              {/* List of Notifications */}
              <FlatList
                data={notifications}
                ListEmptyComponent={() => (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                      No notifications yet 📭
                    </Text>
                  </View>
                )}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <View style={styles.notificationItem}>
                    <Text style={styles.notificationText}>{item.body}</Text>
                  </View>
                )}
              />

              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setNotificationModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Language Selection Modal */}
        <Modal
          visible={isModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t('select_language')}</Text>

              <TouchableOpacity
                onPress={() => selectLanguage('en')}
                style={styles.languageOption}>
                <Text style={styles.languageText}>{t('english')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => selectLanguage('tr')}
                style={styles.languageOption}>
                <Text style={styles.languageText}>{t('turkish')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>{t('cancel')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Face Scan Section */}
        <View style={styles.scanSection}>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.faceImage}
              resizeMode="cover"
              source={require('../assets/images/face_scan.jpeg')}
            />
          </View>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => navigate('ScanFace', {})}>
            <Text style={styles.scanButtonText}>{t('tap_to_scan')}</Text>
          </TouchableOpacity>
        </View>

        {/* Range of Products Section */}
        <ProductCard />

        {/* Consult Dermatologist Section */}
        {/* <DermatologistsList /> */}

        {/* Know Your Skin Section */}
        <KnowYourSkinCard />

        {/* Our Results Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('our_results')}</Text>
          {/* <View style={styles.resultsRow}> */}
          <FlatList
            data={reviews}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 10,
              // backgroundColor: 'green',
              // width: '90%',
            }}
            renderItem={({item}) => (
              <View style={styles.resultCard}>
                <Image style={styles.resultImage} source={item.url} />
                <Text>{item.name}</Text>
                <Text>⭐ {item.rating}</Text>
                <Text>{item.review}</Text>
              </View>
            )}
          />
          {/* <View style={styles.resultCard}>
            <Image
              style={styles.resultImage}
              source={require('../assets/images/Saily.png')}
            />
            <Text>Saily Jane</Text>
            <Text>⭐ 5.0</Text>
            <Text>Lorem ipsum dolor sit amet consectetur.</Text>
          </View> */}
        </View>
        {/* </View> */}

        {/* Bottom Navigation */}
        <View style={{height: 300, width: 10}}></View>
      </ScrollView>
    </SafeAreaWrapper>
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
  title: {
    fontSize: 20,
    fontFamily: 'Walkway Expand UltraBold',
    color: '#38304a',
  },
  iconContainer: {flexDirection: 'row', alignItems: 'center'},
  bellIcon: {padding: 8},
  languageSwitcher: {marginLeft: 15},

  scanSection: {
    alignItems: 'center',
    height: '25%',
    marginBottom: '5%',
    marginTop: '5%',
    backgroundColor: '#E3D09D',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E3D09D', // Use a background color that complements the image
  },
  faceImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  scanButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
  },
  scanButtonText: {fontWeight: 'bold'},

  section: {marginVertical: 16, marginTop: 20},
  sectionTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 8},

  resultsRow: {flexDirection: 'row', justifyContent: 'space-between'},
  resultCard: {
    backgroundColor: '#fff',
    padding: 12,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 250,
    minHeight: 140,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultImage: {width: 45, height: 45, borderRadius: 25, marginBottom: 8},

  /* Modal Styles */
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    maxHeight: 500,
  },
  modalTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  languageOption: {padding: 10, width: '100%', alignItems: 'center'},
  languageText: {fontSize: 16},
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {fontWeight: 'bold'},

  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  notificationText: {
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default HomeScreen;
