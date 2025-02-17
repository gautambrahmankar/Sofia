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

const SignupEmail = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle email/password sign-up
  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      Alert.alert(
        'Success',
        `Account created for ${userCredential.user.email}`,
      );
      navigation.navigate('LoginEmail');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>

      <Text style={styles.label}>Email address</Text>
      <TextInput
        style={styles.input}
        placeholder="Example@gmail.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Create a password</Text>
      <TextInput
        style={styles.input}
        placeholder="must be 8 characters"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Confirm password</Text>
      <TextInput
        style={styles.input}
        placeholder="must be 8 characters"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By creating an account or signing you
        </Text>
        <Text style={styles.termsText}>
          agree to our{' '}
          <Text style={styles.termsLink}>Terms and Conditions</Text>
        </Text>
      </View>
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

    marginBottom: 30,
    top: 50,
    position: 'absolute',
    marginHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    height: 50,
    backgroundColor: '#000',
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
  termsContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 10,
    position: 'absolute',
  },
  termsText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  termsLink: {
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default SignupEmail;
