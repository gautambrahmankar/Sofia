import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const {height, width} = Dimensions.get('window');

function SignupScreen({navigation}: {navigation: any}) {
  return (
    <View style={{flex: 1}}>
      {/* Gradient Section */}
      <LinearGradient
        colors={['#E0D9D7', '#DFD7D4']}
        style={styles.gradientContainer}>
        <Text style={styles.title}>Sophie</Text>
        <Text style={styles.subtitle}>
          The Glow you seek is one treatment away
        </Text>

        <Image
          source={require('../assets/images/LoginImage.png')} // Replace with your signup image path
          style={styles.image}
        />
      </LinearGradient>

      {/* White Container Section */}
      <View style={styles.whiteContainer}>
        <Text style={styles.startText}>Your skin journey starts here!</Text>

        {/* Sign up with Apple */}
        <TouchableOpacity
          style={[styles.button, styles.appleButton]}
          onPress={() => navigation.navigate('SignupApple')}>
          <FontAwesome
            name="apple"
            size={20}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.appleButtonText}>Sign up with Apple</Text>
        </TouchableOpacity>

        {/* Sign up with Email */}
        <TouchableOpacity
          style={[styles.button, styles.emailButton]}
          onPress={() => navigation.navigate('SignupEmail')}>
          <MaterialIcons
            name="email"
            size={20}
            color="black"
            style={styles.icon}
          />
          <Text style={[styles.buttonText, {color: 'black'}]}>
            Sign up with Email
          </Text>
        </TouchableOpacity>

        {/* Sign up with Google */}
        <TouchableOpacity
          style={[styles.button, styles.googleButton]}
          onPress={() => navigation.navigate('SignupGoogle')}>
          <FontAwesome
            name="google"
            size={20}
            color="red"
            style={styles.icon}
          />
          <Text style={[styles.buttonText, {color: 'black'}]}>
            Sign up with Google
          </Text>
        </TouchableOpacity>

        {/* Log In link */}
        <View style={styles.footer}>
          <Text style={styles.createAccountText}>
            Already have an account?{' '}
            <Text
              onPress={() => navigation.navigate('Login')}
              style={styles.linkText}>
              Log in
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: height * 0.07, // To make gradient end before the white container
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#7a7a7a',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  image: {
    // width: width * 0.8,
    // height: height * 0.2,
    // borderRadius: 18,
    marginVertical: 20,
    resizeMode: 'cover',
  },
  whiteContainer: {
    backgroundColor: '#ffffff',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    paddingTop: 20,
    marginTop: -height * 0.08, // To slightly overlap the gradient section
  },
  startText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    padding: 15,
    borderRadius: 30,
    marginVertical: 10,
  },
  appleButton: {
    backgroundColor: 'black',
  },
  emailButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  googleButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  createAccountText: {
    marginTop: 20,
    fontSize: 14,
    color: '#7a7a7a',
  },
  footer: {
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 10,
    position: 'absolute',
  },
  linkText: {
    color: '#000000',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
});

export default SignupScreen;
