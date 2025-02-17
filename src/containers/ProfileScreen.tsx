import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import {ScrollView} from 'react-native-gesture-handler';

const ProfileScreen = ({navigation}) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const handleLogout = async () => {
    setShowSettingsModal(false);
    try {
      await auth().signOut();
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
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
            <TouchableOpacity style={styles.modalOption} onPress={handleLogout}>
              <Text style={styles.modalOptionText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => setShowSettingsModal(false)}>
              <Text style={[styles.modalOptionText, styles.cancelText]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={require('../assets/images/Jessica.png')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Jesica Bren</Text>
        </View>

        {/* Concern and Goal Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.tabTextActive}>Concern</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Goal</Text>
          </TouchableOpacity>
        </View>

        {/* Concerns List */}
        <View style={styles.concernsContainer}>
          <Text style={styles.concernItem}>• Ache</Text>
          <Text style={styles.concernItem}>• Dark circles</Text>
          <Text style={styles.concernItem}>• Pores</Text>
        </View>

        {/* Factors Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Factors</Text>

          <View style={styles.factorItem}>
            <Text style={styles.factorLabel}>Skin Type</Text>
            <Text style={styles.factorValue}>Combination</Text>
          </View>

          <Text style={styles.subSectionTitle}>Skin characteristics</Text>

          {[
            ['Oiliness', 'Normal'],
            ['Sebum protection', 'Texture'],
            ['Surface feel', 'Smooth'],
            ['Tone', 'Even'],
            ['Elasticity', 'Good'],
            ['Sensitivity', 'Sensitive'],
          ].map(([label, value]) => (
            <View key={label} style={styles.factorItem}>
              <Text style={styles.factorLabel}>{label}</Text>
              <Text style={styles.factorValue}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Scan Insights */}
        <TouchableOpacity style={styles.insightsButton}>
          <Text style={styles.insightsText}>See Scan's insights</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
});

export default ProfileScreen;
