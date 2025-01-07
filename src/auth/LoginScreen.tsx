import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
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

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Email/Password Sign-In
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
      Alert.alert('Success', `Welcome back, ${user.email}!`);
      navigation.navigate('Main'); // Navigate to the main app
    } catch (error) {
      handleError(error);
    }
  };

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

  const handleError = error => {
    switch (error.code) {
      case 'auth/invalid-email':
        Alert.alert('Error', 'Invalid email format.');
        break;
      case 'auth/user-not-found':
        Alert.alert('Error', 'No user found with this email.');
        break;
      case 'auth/wrong-password':
        Alert.alert('Error', 'Incorrect password.');
        break;
      default:
        Alert.alert('Error', error.message || 'An unknown error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleSignIn}>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  googleButton: {
    height: 50,
    backgroundColor: '#DB4437',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#007BFF',
    fontSize: 16,
  },
});

export default LoginScreen;
