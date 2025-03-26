import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const {height, width} = Dimensions.get('window');

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/home_page.jpg')} // Replace with your pattern image
        style={styles.backgroundPattern}
      />
      <View style={styles.content}></View>

      <View style={styles.buttonsContainer}>
        {/* Log in Button */}
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={[styles.buttonText, styles.loginButtonText]}>
            Log in
          </Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={[styles.button, styles.signUpButton]}
          onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={[styles.buttonText, styles.signUpButtonText]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E', // Background color
  },
  backgroundPattern: {
    position: 'absolute',
    width: width, // Full device width
    height: height, // Full device height
    resizeMode: 'cover',
  },
  content: {
    flex: 1, // Fills the remaining space above the buttons
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: height * 0.05, // 5% of screen height
    fontWeight: 'bold',
    color: 'gold',
    letterSpacing: 2,
    marginBottom: height * 0.01, // 1% of screen height
  },
  subtitle: {
    fontSize: height * 0.025, // 2.5% of screen height
    fontWeight: '300',
    color: 'gold',
    marginBottom: height * 0.02, // 2% of screen height
  },
  buttonsContainer: {
    width: '100%',
    paddingHorizontal: width * 0.05, // 5% of screen width
    paddingBottom: height * 0.03, // Add padding at the bottom (safe area)
  },
  button: {
    height: height * 0.06, // 6% of screen height
    width: width * 0.88, // 80% of screen width
    borderRadius: height * 0.015, // Rounded corners based on device height
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: height * 0.02, // 2% of screen height
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#000',
    borderWidth: 2,
  },
  signUpButton: {
    backgroundColor: '#000000',
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: height * 0.02, // 2% of screen height
    fontWeight: '600',
  },
  loginButtonText: {
    color: '#000000',
  },
  signUpButtonText: {
    color: '#FFFFFF',
  },
});

export default Login;
