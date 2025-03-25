import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {storage} from '../utils/storage';

const SignupEmail = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // State for loader

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

    setLoading(true); // Start loader

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      // Send email verification
      await user.sendEmailVerification();

      // User data to store
      const userData = {
        uid: user.uid,
        name: user.displayName || 'New User',
        email: user.email,
        photoURL: user.photoURL || null,
        created_at: new Date().toISOString(),
        emailVerified: false,
      };

      // Store user data in Firestore
      await firestore()
        .collection('Users')
        .doc(user.uid)
        .set({
          ...userData,
          created_at: firestore.FieldValue.serverTimestamp(),
        });

      console.log('User saved to Firestore');

      // Store user data in MMKV for local use
      storage.set('user_data', JSON.stringify(userData));

      console.log('User data saved in MMKV');

      Alert.alert(
        'Success',
        `Account created for ${user.email}. Please check your email to verify your account.`,
      );

      // Navigate to login screen
      navigation.navigate('LoginEmail');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
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

          <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]} // Disable button when loading
            onPress={handleSignUp}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign up</Text>
            )}
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    // paddingHorizontal: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    // top: 50,
    // position: 'absolute',
    // marginHorizontal: 10,
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
    color: 'black',
  },
  button: {
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#555', // Dimmed color when disabled
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    // bottom: 10,
    // position: 'absolute',
    marginTop: 10,
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
