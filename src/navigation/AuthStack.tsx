import React from 'react';
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

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
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
    </Stack.Navigator>
  );
};

export default AuthStack;
