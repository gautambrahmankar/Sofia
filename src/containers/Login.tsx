import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// Configure Google Sign-In
GoogleSignin.configure({
  webClientId:
    '470418142403-gohr7pv9qr3hg2s0gdg0cfdgpipe7i1b.apps.googleusercontent.com', // Replace with your Web Client ID
  offlineAccess: true, // Required to obtain a refresh token
});

const {height, width} = Dimensions.get('window');

function Login({navigation}: {navigation: any}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
    // Google Sign-In
    const handleGoogleSignIn = async () => {
      try {
        console.log('Starting Google Sign-In...');
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        console.log('Play Services are available.');
  
        const {idToken} = await GoogleSignin.signIn();
        console.log('Google Sign-In successful. ID Token:', idToken);
  
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const userCredential = await auth().signInWithCredential(
          googleCredential,
        );
  
        console.log('Firebase Authentication successful:', userCredential);
        Alert.alert('Success', `Welcome back, ${userCredential.user.email}!`);
        navigation.navigate('Main'); // Navigate to the main app
      } catch (error) {
        console.log('Google Sign-In Error:', error); // Log the error object
        if (error?.code) {
          switch (error.code) {
            case statusCodes.SIGN_IN_CANCELLED:
              Alert.alert('Cancelled', 'Google Sign-In was cancelled.');
              break;
            case statusCodes.IN_PROGRESS:
              Alert.alert('Error', 'Google Sign-In is already in progress.');
              break;
            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
              Alert.alert(
                'Error',
                'Google Play Services are not available on this device.',
              );
              break;
            default:
              Alert.alert('Error', error.message || 'An unknown error occurred.');
          }
        } else {
          Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        }
      }
    };
  return (
    <View style={{flex: 1}}>
      {/* Header */}
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
        <TouchableOpacity style={[styles.button, styles.appleButton]}>
          <FontAwesome
            name="apple"
            size={20}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.appleButtonText}>Login with Apple</Text>
        </TouchableOpacity>

        {/* Sign up with Email */}
        <TouchableOpacity style={[styles.button, styles.emailButton]}>
          <MaterialIcons
            name="email"
            size={20}
            color="black"
            style={styles.icon}
          />
          <Text style={[styles.buttonText, {color: 'black'}]}>
          Login with Email
          </Text>
        </TouchableOpacity>

        {/* Sign up with Google */}
        <TouchableOpacity style={[styles.button, styles.googleButton]}>
          <FontAwesome
            name="google"
            size={20}
            color="black"
            style={styles.icon}
          />
          <Text style={[styles.buttonText, {color: 'black'}]} onPress={handleGoogleSignIn} >
          Login with Google
          </Text>
        </TouchableOpacity>

        {/* Log In link */}
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Text style={styles.createAccountText}>
            Or <Text style={styles.linkText}>Create new account</Text>
          </Text>
        </TouchableOpacity>
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
    paddingBottom: height * 0.065, // To make gradient end before the white container
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
  linkText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  icon: {
    marginRight: 10,
  },
});

export default Login;
