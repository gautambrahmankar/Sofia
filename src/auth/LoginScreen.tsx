import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {storage} from '../utils/storage';
import {handleGoogleSignIn} from '../utils/googleAuth';
import appleAuth from '@invertase/react-native-apple-authentication';
import Loader from '../components/Loader';
import {handleAppleAuth} from '../utils/appleAuth';

const {height, width} = Dimensions.get('window');

function LoginScreen({navigation}: {navigation: any}) {
  const [loading, setLoading] = React.useState(false);
  // const webClientId =
  //   '470418142403-gcb9chhbioc2hb4r841cni6qbsho3ov8.apps.googleusercontent.com';
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: webClientId,
  //   });
  // }, []);

  return (
    <View style={{flex: 1}}>
      {/* Gradient Section */}
      <LinearGradient
        colors={['#E0D9D7', '#DFD7D4']}
        style={styles.gradientContainer}>
        <Text style={styles.title}>Sophie</Text>
        <Text style={styles.subtitle}>
          The Glow you seek is one treatment away
        </Text>

        <Image
          source={require('../assets/images/signup_bg.jpeg')}
          style={styles.image}
        />
      </LinearGradient>

      {/* White Container Section */}
      <View style={styles.whiteContainer}>
        <Text style={styles.startText}>Your skin journey starts here!</Text>

        {/* Login with Apple */}
        {Platform.OS === 'ios' && (
          <TouchableOpacity
            style={[styles.button, styles.appleButton]}
            onPress={() => handleAppleAuth(navigation, setLoading)}>
            <FontAwesome
              name="apple"
              size={20}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.appleButtonText}>Login with Apple</Text>
          </TouchableOpacity>
        )}

        {/* Login with Email */}
        <TouchableOpacity
          style={[styles.button, styles.emailButton]}
          onPress={() => navigation.navigate('LoginEmail')}>
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

        {/* Login with Google */}
        <TouchableOpacity
          style={[styles.button, styles.googleButton]}
          onPress={() => handleGoogleSignIn(navigation, setLoading)}>
          <FontAwesome
            name="google"
            size={20}
            color="red"
            style={styles.icon}
          />
          <Text style={[styles.buttonText, {color: 'black'}]}>
            Login with Google
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.createAccountText}>
          Or{' '}
          <Text
            onPress={() => navigation.navigate('SignupScreen')}
            style={styles.linkText}>
            Create new account
          </Text>
        </Text>
      </View>
      <Loader visible={loading} message="Signing you in..." />
    </View>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    // backgroundColor: 'green',
    paddingBottom: height * 0.07, // To make gradient end before the white container
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 32,
    // fontWeight: 'bold',
    fontFamily: 'Walkway Expand UltraBold',
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
    width: '100%',
    height: height * 0.3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginVertical: 20,
    // backgroundColor: 'green',
    resizeMode: 'cover',
  },
  whiteContainer: {
    backgroundColor: '#ffffff',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    paddingTop: 20,
    marginTop: -height * 0.15,
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
  footer: {
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 25,
    position: 'absolute',
  },
  linkText: {
    color: '#000000',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
});

export default LoginScreen;
