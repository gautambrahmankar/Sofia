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
import Icon from 'react-native-vector-icons/Feather';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert(
        'Success',
        'A password reset email has been sent to your email address.',
      );
      navigation.navigate('LoginEmail'); // Redirect back to login screen
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = error => {
    switch (error.code) {
      case 'auth/invalid-email':
        Alert.alert('Error', 'The email address is invalid.');
        break;
      case 'auth/user-not-found':
        Alert.alert('Error', 'No user found with this email address.');
        break;
      default:
        Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon
          style={{top: 12, left: 10}}
          name="arrow-left"
          size={24}
          color="#000"
        />
      </TouchableOpacity>
      <Text style={styles.title}>Forgot password?</Text>
      <Text style={styles.subtitle}>
        Don’t worry! It happens. Please enter the email associated with your
        account.
      </Text>
      <Text style={styles.label}>Email address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Remember password?{' '}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate('LoginScreen')}>
          Log in
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    width: 50,
    height: 50,
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
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
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    color: '#000',
    bottom: 10,
    position: 'absolute',
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ForgotPasswordScreen;
