import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {goBack, navigate} from '../navigation/navigationUtils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import SafeAreaWrapper from '../navigation/SafeAreaViewWrapper';

const ScanFaceScreen = () => {
  const {t} = useTranslation();
  return (
    <SafeAreaWrapper style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color="black"
          onPress={goBack}
        />
        <Text style={styles.headerTitle}>{t('screen_title')}</Text>
        {/* <MaterialIcons name="shopping-bag" size={24} color="black" /> */}
      </View>

      {/* <Text style={styles.title}>Scan your face</Text> */}
      <Text style={styles.subtitle}>{t('subtitle')}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('card_title')}</Text>

        <View style={styles.item}>
          <Icon name="happy-outline" size={24} color="#000" />
          <Text style={styles.itemText}>{t('instructions.relax')}</Text>
        </View>

        <View style={styles.item}>
          <Icon name="bandage-outline" size={24} color="#000" />
          <Text style={styles.itemText}>{t('instructions.no_products')}</Text>
        </View>

        <View style={styles.item}>
          <Icon name="sunny-outline" size={24} color="#000" />
          <Text style={styles.itemText}>{t('instructions.good_lighting')}</Text>
        </View>

        <View style={styles.item}>
          <Icon name="eye-outline" size={24} color="#000" />
          <Text style={styles.itemText}>{t('instructions.stay_still')}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('FaceCapture', {})}>
        <Text style={styles.buttonText}>{t('get_started')}</Text>
      </TouchableOpacity>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fdfbfb',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  header: {
    flexDirection: 'row',
    // backgroundColor: 'green',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    width: '90%',
    alignSelf: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 50,
    color: '#000',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#555',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    width: '90%',
    alignSelf: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 20,
    marginTop: 30,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ScanFaceScreen;
