import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import {storage} from '../utils/storage';
import firestore from '@react-native-firebase/firestore';
import SkinAnalysisModal from '../components/SkinInsightsModal';
import DateTimePicker from '@react-native-community/datetimepicker';
import i18n from '../config/i18';
import {useTranslation} from 'react-i18next';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SafeAreaWrapper from '../navigation/SafeAreaViewWrapper';

const ProfileScreen = ({navigation}) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const {t} = useTranslation();
  const [userData, setUserData] = useState(null);
  const [skinFactors, setSkinFactors] = useState({});
  const [activeTab, setActiveTab] = useState('Concerns');
  const [openScanModal, setopenScanModal] = useState(false);
  const [morningTime, setMorningTime] = useState(new Date());
  const [eveningTime, setEveningTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(null);
  const [userDetails, setuserDetails] = useState({});

  useEffect(() => {
    const storedUser = storage.getString('user_data');
    console.log('stored user', storedUser, storage.getAllKeys());

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);

      fetchOnboardingData(parsedUser?.uid);
    }
  }, []);

  const fetchOnboardingData = async userId => {
    try {
      const doc = await firestore().collection('Users').doc(userId).get();
      if (doc.exists) {
        const data = doc.data();
        setSkinFactors(data?.skin_factors);
        setuserDetails(data);
        console.log('Onboarding data fetched:', data);
      } else {
        console.log('No onboarding data found for user.');
      }
    } catch (error) {
      console.error('Error fetching onboarding data:', error);
    }
  };

  const handleLogout = async () => {
    setShowSettingsModal(false);
    try {
      await auth().signOut();
      storage.delete('user_data');
      storage.delete('onboarding_data');
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

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

  const handleTimeChange = (selectedTime, event) => {
    console.log('slee', selectedTime);
    const selectedHour = event.getHours();

    if (showPicker === 'morning') {
      if (selectedHour >= 12) {
        Alert.alert('Invalid Time', 'Please select a morning time (AM).');
        setShowPicker(null);
        return;
      }
      setMorningTime(event || morningTime);
      storage.set('morning_notification', selectedTime.toISOString());
    } else if (showPicker === 'evening') {
      if (selectedHour < 12) {
        Alert.alert('Invalid Time', 'Please select an evening time (PM).');
        setShowPicker(null);
        return;
      }
      setEveningTime(event || eveningTime);
      storage.set('evening_notification', selectedTime.toISOString());
    }
    setShowPicker(null);
  };
  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('profile_heading')}</Text>
          <TouchableOpacity onPress={() => setShowSettingsModal(true)}>
            <Icon name="settings" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Settings Modal */}
        <Modal
          visible={showSettingsModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowSettingsModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={handleLogout}>
                <Text style={styles.modalOptionText}>
                  {t('profile_logout')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => setShowSettingsModal(false)}>
                <Text style={[styles.modalOptionText, styles.cancelText]}>
                  {t('cancel')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            {userData?.photoUrl ? (
              <Image
                source={{uri: userData.photoURL}}
                style={styles.profileImage}
              />
            ) : (
              <View>
                <Fontisto
                  name={userDetails?.gender === 'Male' ? 'male' : 'female'}
                  size={50}
                  color="black"
                  style={styles.defaultIcon}
                />
              </View>
            )}
            <Text style={styles.profileName}>
              {userData?.name || t('profile_name')}
            </Text>
            <Text style={styles.profileEmail}>
              {userData?.email || t('profile_email')}
            </Text>
          </View>

          {/* Concern and Goal Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Concerns' && styles.activeTab]}
              onPress={() => setActiveTab('Concerns')}>
              <Text
                style={
                  activeTab === 'Concerns'
                    ? styles.tabTextActive
                    : styles.tabText
                }>
                {t('profile_concerns')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === 'Goal' && styles.activeTab]}
              onPress={() => setActiveTab('Goal')}>
              <Text
                style={
                  activeTab === 'Goal' ? styles.tabTextActive : styles.tabText
                }>
                {t('profile_goal')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Concerns or Goals List */}
          <View style={styles.concernsContainer}>
            {activeTab === 'Concerns' ? (
              skinFactors?.concerns?.length > 0 ? (
                skinFactors?.concerns.map((concern, index) => (
                  <Text key={index} style={styles.concernItem}>
                    • {concern?.label}
                  </Text>
                ))
              ) : (
                <Text style={styles.concernItem}>
                  {t('profile_no_concerns')}
                </Text>
              )
            ) : skinFactors?.goals ? (
              <Text style={styles.concernItem}>
                • {skinFactors?.goals?.label}
              </Text>
            ) : (
              <Text style={styles.concernItem}>{t('profile_no_goals')}</Text>
            )}
          </View>

          {/* Factors Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('profile_factors')}</Text>
              <TouchableOpacity
                style={{marginBottom: 25}}
                onPress={() => {
                  navigation.navigate('MainStack', {screen: 'SignupFlow'});
                }}>
                <Icon name="edit" size={20} color="#007AFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.factorItem}>
              <Text style={styles.factorLabel}>{t('profile_skin_type')}</Text>
              <Text style={styles.factorValue}>
                {skinFactors?.skin_type || 'N/A'}
              </Text>
            </View>

            <View style={styles.factorItem}>
              <Text style={styles.factorLabel}>{t('profile_skin_tone')}</Text>
              <Text style={styles.factorValue}>
                {skinFactors?.skin_tone || 'N/A'}
              </Text>
            </View>

            <View style={styles.factorItem}>
              <Text style={styles.factorLabel}>{t('profile_experience')}</Text>
              <Text style={styles.factorValue}>
                {skinFactors?.experience_level || 'N/A'}
              </Text>
            </View>
          </View>

          {/* Notification Timings Section */}
          {/* <View style={styles.section}> */}
          {/* <View style={[styles.sectionHeader, {alignItems: 'center'}]}>
            <Text style={styles.sectionTitle}>
              {t('profile_notifications')}
            </Text>
            <Icon
              name="notifications"
              size={20}
              color="#c7a254"
              style={{marginBottom: 20}}
            />
          </View> */}

          {/* Morning Notification */}
          {/* <TouchableOpacity
            style={styles.timePicker}
            onPress={() => setShowPicker('morning')}>
            <Text style={styles.factorLabel}>{t('profile_morning')}</Text>
            <Text style={styles.factorValue}>
              {morningTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </TouchableOpacity> */}

          {/* Evening Notification */}
          {/* <TouchableOpacity
            style={styles.timePicker}
            onPress={() => setShowPicker('evening')}>
            <Text style={styles.factorLabel}>{t('profile_evening')}</Text>
            <Text style={styles.factorValue}>
              {eveningTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </TouchableOpacity> */}

          {/* {showPicker && (
            <DateTimePicker
              value={showPicker === 'morning' ? morningTime : eveningTime}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleTimeChange}
            />
          )} */}
          {/* </View> */}

          {/* Scan Insights */}
          <TouchableOpacity
            style={styles.insightsButton}
            onPress={() => setopenScanModal(true)}>
            <Text style={styles.insightsText}>
              {t('profile_scan_insights')}
            </Text>
          </TouchableOpacity>
          <SkinAnalysisModal
            analysisResult={result}
            imageToShow={''}
            modalVisible={openScanModal}
            setModalVisible={setopenScanModal}
          />
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E1153',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  defaultIcon: {
    width: 80,
    height: 80,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#000',
    fontWeight: '600',
  },
  concernsContainer: {
    marginBottom: 24,
  },
  concernItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginTop: 12,
    marginBottom: 8,
  },
  factorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  factorLabel: {
    fontSize: 14,
    color: '#666',
  },
  factorValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  insightsButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  insightsText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
  },
  navItem: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  activeNavItem: {
    color: '#000',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
  },
  modalOption: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },
  cancelText: {
    color: '#FF3B30',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // marginBottom: 10,
  },
  timePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '99%',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
});

export default ProfileScreen;
