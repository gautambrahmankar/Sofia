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

const LoginEmail = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Check if the user is new based on metadata
  const checkUserState = async user => {
    return user.metadata.creationTime === user.metadata.lastSignInTime;
  };

  // Handle email/password sign-in
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const isNewUser = await checkUserState(userCredential.user);
      if (isNewUser) {
        navigation.navigate('MainStack', {screen: 'SignupFlow'});
      } else {
        navigation.navigate('MainStack', {screen: 'HomeScreen'});
      }
    } catch (error) {
      Alert.alert('Error', error.message);
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
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <Text
        style={styles.termsLink}
        onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        Forgot Password?
      </Text>
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
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsLink: {
    color: '#007BFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginEmail;
