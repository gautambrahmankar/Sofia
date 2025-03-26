import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AcneGuideScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header with Image */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="arrow-back-ios" size={20} color="black" />
        </TouchableOpacity>
        <Image source={require('../../assets/images/Explore2.png')} style={styles.headerImage} />
      </View>

      {/* Article Content */}
      <View style={styles.content}>
        <Text style={styles.title}>The Ultimate Guide to Getting Rid of Acne</Text>
        <View style={styles.articleInfo}>
          <MaterialIcons name="schedule" size={16} color="gray" />
          <Text style={styles.infoText}>4 min read</Text>
          <MaterialIcons name="calendar-today" size={16} color="gray" />
          <Text style={styles.infoText}>12 Jan 2020</Text>
        </View>

        <Text style={styles.articleText}>
          Acne is sometimes thought of as an issue for tweens and teens. While it often happens in adolescence, it doesn’t necessarily stop once you’ve blown the candles out on your 20th birthday. 
        </Text>
        <Text style={styles.articleText}>
          Reid Maclellan, MD, a member of the adjunct faculty at Harvard Medical School, says the idea that breakouts clear up with age is one of many myths about acne.
        </Text>
        <Text style={styles.articleText}>
          Other misconceptions, like the myth that having acne means your skin is dirty, can also interfere with proper treatment.
        </Text>

        {/* Acne Subtypes Section */}
        <Text style={styles.subTitle}>Acne Subtypes</Text>
        <Text style={styles.articleText}>There are also several subtypes of acne, including:</Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}><Text style={styles.boldText}>Adult hormonal acne</Text> (occurs due to hormonal fluctuations)</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}><Text style={styles.boldText}>Acne excoriée</Text> (occurs when someone with acne compulsively picks their skin, leading to scarring)</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}><Text style={styles.boldText}>Acne mechanica</Text> (occurs due to friction or pressure against the skin)</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}><Text style={styles.boldText}>Acne conglobata</Text> (occurs when nodules, abscesses, and cysts link below the skin, causing redness and swelling)</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>Acne as a side effect of medications</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4F0',
  },
  header: {
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'stretch',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  articleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    color: 'gray',
    marginHorizontal: 5,
  },
  articleText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  bullet: {
    fontSize: 18,
    marginRight: 5,
  },
  listText: {
    fontSize: 16,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default AcneGuideScreen;
