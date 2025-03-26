import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { navigate } from '../navigation/navigationUtils';

export default function KnowYourSkinCard() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t("know_your_skin_title")}</Text>
      <View style={styles.card}>
        <View style={styles.leftSection}>
          <Text style={styles.title}>{t("personalize_profile")}</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigate("ScanFace",{})}>
            <Text style={styles.buttonText}>{t("start_now")}</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../assets/images/KnowSkin.png')} // Replace with actual image
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
  },
  leftSection: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  button: {
    width: '60%',
    backgroundColor: 'black',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    // alignSelf:'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign:'center',
  },
  image: {
    width: 120,
    height: 100,
    resizeMode: 'contain',
  },
});
