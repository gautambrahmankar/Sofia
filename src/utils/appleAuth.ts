import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import appleAuth from '@invertase/react-native-apple-authentication';
import {storage} from './storage'; // Import your MMKV storage

export const handleAppleAuth = async (
  navigation: any, // Navigation prop to navigate after login
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    setLoading(true);
    // Request Apple login with email and full name scopes
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const {user, identityToken, email, fullName} = appleAuthRequestResponse;
    console.log('apple auth sign in response', appleAuthRequestResponse);

    if (!identityToken) {
      Alert.alert('Login Failed', 'No identity token returned');
      return null;
    }

    // Create an Apple credential with the token and optional nonce
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      appleAuthRequestResponse.nonce,
    );

    // Sign in with the Apple credential via Firebase
    const userCredential = await auth().signInWithCredential(appleCredential);
    const firebaseUser = userCredential.user;
    const isNewUser = userCredential.additionalUserInfo?.isNewUser;

    const userData = {
      uid: firebaseUser.uid,
      name:
        firebaseUser.displayName ||
        `${fullName?.givenName ?? ''} ${fullName?.familyName ?? ''}`.trim() ||
        'New User',
      email: firebaseUser.email || email,
      photoURL: firebaseUser.photoURL || null,
    };

    // If the user is new, store their data in Firestore
    if (isNewUser) {
      await firestore().collection('Users').doc(firebaseUser.uid).set(
        {
          name: userData.name,
          email: userData.email,
          photoURL: userData.photoURL,
          created_at: firestore.FieldValue.serverTimestamp(),
        },
        {merge: true},
      );
      console.log('New user saved to Firestore');
    } else {
      console.log('Existing user logged in');
    }

    storage.set('user_data', JSON.stringify(userData));

    if (isNewUser) {
      navigation.navigate('MainStack', {screen: 'SignupFlow'});
    } else {
      navigation.navigate('MainStack');
    }

    console.log('Apple Login Success:', userData);
    return userData;
  } catch (error) {
    console.warn('Apple Sign-In Error:', error);
    Alert.alert('Login Error', 'Something went wrong during Apple Sign-In');
    return null;
  } finally {
    setLoading(false);
  }
};
