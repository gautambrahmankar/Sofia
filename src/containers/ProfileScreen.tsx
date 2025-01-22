import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FactorsHome from './SignupFlow/FactorsHome';

const ProfileHeader = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back-ios" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Icon name="settings" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../assets/images/Jessica.png')} // Replace with actual image path
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Jesica Bren</Text>
        <TouchableOpacity style={styles.editIcon}>
          <Icon name="edit" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Concern and Goal Tabs */}
      <View style={styles.cardContainer}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.tabTextActive}>Concern</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Goal</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.concernsContainer}>
          <View style={styles.concernItem}>
            <Icon name="check-box" size={18} color="#00C853" />
            <Text style={styles.concernText}>Acne</Text>
          </View>
          <View style={styles.concernItem}>
            <Icon name="check-box" size={18} color="#00C853" />
            <Text style={styles.concernText}>Dark circles</Text>
          </View>
          <View style={styles.concernItem}>
            <Icon name="check-box" size={18} color="#00C853" />
            <Text style={styles.concernText}>Pores</Text>
          </View>
        </View>
        <FactorsHome/>
        {/* <View style={styles.placeholder}>
          Placeholder for Image
          <Text>Image Placeholder</Text>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  profileSection: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center items vertically
    justifyContent:'space-between',
    marginTop: 20, // Add space from the top
    paddingHorizontal: 4, // Adjust horizontal padding
    paddingBottom : 15,
  },
  profileImage: {
    width: 60, // Adjust the size of the image
    height: 60,
    borderRadius: 30, // Make the image circular
    marginRight: 16, // Add space between the image and text
  },
  profileTextContainer: {
    flex: 1, // Allow the text to take available space
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E1153',
  },
  editIcon: {
    padding: 8, // Add padding to make it easier to tap
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#F2F2F2',
  },
  activeTab: {
    backgroundColor: '#FDE8E8',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
  },
  tabTextActive: {
    color: '#000000',
  },
  concernsContainer: {
    flexDirection: 'column',
    // alignItems: 'center',
    marginLeft: '5%',
    marginTop: '3%',
  },
  concernItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  concernText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333',
  },
  placeholder: {
    position: 'absolute',
    right: 0,
    bottom: -10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileHeader;
