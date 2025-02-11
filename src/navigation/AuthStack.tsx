import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../auth/LoginScreen';
import ForgotPasswordScreen from '../auth/ForgotPasswordScreen';
import MainStack from './MainStack'; // Navigation for main app screens
import Login from '../auth/Login';
import Signup from '../auth/SignupScreen';
import SignupEmail from '../auth/SignupEmail';
import SignupApple from '../auth/SignupApple';
import SignupGoogle from '../auth/SignupGoogle';
import LoginEmail from '../auth/LoginEmail';
import LoginApple from '../auth/LoginApple';
import LoginGoogle from '../auth/LoginGoogle';
import SignupScreen from '../auth/SignupScreen';
import Age from '../containers/SignupFlow/Age';
import Concerns from '../containers/SignupFlow/Concerns';
import Experience from '../containers/SignupFlow/Experience';
import Gender from '../containers/SignupFlow/Gender';
import Goals from '../containers/SignupFlow/Goals';
import Skintone from '../containers/SignupFlow/Skintone';
import Skintype from '../containers/SignupFlow/Skintype';
import auth from '@react-native-firebase/auth';
import {ActivityIndicator, View} from 'react-native';

const Stack = createStackNavigator();

const AuthStack = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
      setInitializing(false);
    });

    return unsubscribe; // Cleanup listener
  }, []);

  if (initializing) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  return (
    <Stack.Navigator
      initialRouteName={user ? 'MainStack' : 'Login'} // 👈 Dynamically set the initial route
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Age" component={Age} options={{headerShown: false}} />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignupEmail"
        component={SignupEmail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignupApple"
        component={SignupApple}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignupGoogle"
        component={SignupGoogle}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginEmail"
        component={LoginEmail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginApple"
        component={LoginApple}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginGoogle"
        component={LoginGoogle}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name="MainStack"
        component={MainStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Concerns"
        component={Concerns}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Experience"
        component={Experience}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Gender"
        component={Gender}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Goals"
        component={Goals}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Skintype"
        component={Skintype}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Skintone"
        component={Skintone}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
