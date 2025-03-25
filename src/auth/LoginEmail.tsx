import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
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

const LoginEmail = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loader state

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

    setLoading(true); // Start loader

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
      const userData = {
        uid: user.uid,
        name: user.displayName || 'New User',
        email: user.email,
        photoURL: user.photoURL || null,
      };

      if (!user.emailVerified) {
        Alert.alert(
          'Email Not Verified',
          'Please verify your email before logging in. Check your inbox for the verification link.',
          [{text: 'OK'}],
        );
        setLoading(false);
        return;
      }

      // Check if the user already exists in Firestore
      const userDoc = await firestore().collection('Users').doc(user.uid).get();
      const isNewUser = await checkUserState(userCredential.user);

      if (isNewUser) {
        // Save new user data in Firestore
        await firestore()
          .collection('Users')
          .doc(user.uid)
          .set({
            name: user.displayName || 'New User',
            email: user.email,
            photoURL: user.photoURL || null,
            emailVerified: user.emailVerified,
            created_at: firestore.FieldValue.serverTimestamp(),
          });
        storage.set('user_data', JSON.stringify(userData));

        console.log('New user saved to Firestore');
        navigation.navigate('MainStack', {screen: 'SignupFlow'});
      } else {
        navigation.navigate('MainStack', {screen: 'HomeTabs'});
      }
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
          <Text style={styles.title}>Log in</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]} // Disable button while loading
            onPress={handleSignIn}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Log in</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.signUpText}>
            Don’t have an account?{' '}
            <Text
              style={styles.signUpLink}
              onPress={() => navigation.navigate('SignupScreen')}>
              Sign up
            </Text>
          </Text>

          {/* <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>Or Login with</Text>
            <View style={styles.line} />
          </View> */}

          {/* <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../assets/images/facebook.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../assets/images/google.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../assets/images/apple.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    // paddingHorizontal: 20,
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
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
    color: 'black',
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#000',
    marginBottom: 20,
  },
  button: {
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#555', // Dimmed color when disabled
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 10,
    color: '#666',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    width: 24,
    height: 24,
  },
  signUpText: {
    textAlign: 'center',
    alignSelf: 'center',
    color: '#000',
    marginTop: 10,
    // bottom: 10,
    // position: 'absolute',
  },
  signUpLink: {
    fontWeight: 'bold',
    color: '#000',
  },
});

export default LoginEmail;
