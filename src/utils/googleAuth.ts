import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {storage} from './storage'; // Ensure you import MMKV storage

// Configure Google Sign-In (Call this in App.tsx or inside useEffect)
export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId:
      '470418142403-gohr7pv9qr3hg2s0gdg0cfdgpipe7i1b.apps.googleusercontent.com',
    offlineAccess: true,
  });
};

// Google Sign-In Function
export const handleGoogleSignIn = async (
  navigation: any,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    setLoading(true);
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log('Google User Info:', userInfo);

    const idToken = userInfo?.data?.idToken;

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log('google cred', googleCredential);

    const userCredential = await auth().signInWithCredential(googleCredential);
    console.log('Firebase User Credential:', userCredential);

    if (userCredential) {
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        name: user.displayName || 'New User',
        email: user.email,
        photoURL: user.photoURL || null,
      };

      // Save user data to Firestore
      await firestore().collection('Users').doc(user.uid).set(
        {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          created_at: firestore.FieldValue.serverTimestamp(),
        },
        {merge: true},
      );

      // Store user data in MMKV storage
      storage.set('user_data', JSON.stringify(userData));

      console.log('User saved to Firestore');

      // Navigate to MainStack
      if (navigation) {
        navigation.navigate('MainStack');
      }

      return userData; // Return user data for further usage
    }
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    setLoading(false);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User cancelled sign-in');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Sign-in is in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Google Play Services not available');
    } else {
      console.error('Google Sign-In Error:', error);
    }
    return null;
  } finally {
    setLoading(false);
  }
};
