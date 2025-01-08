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
import Age from '../containers/SignupFlow.tsx/Age';
import Gender from '../containers/SignupFlow.tsx/Gender';
import Concerns from '../containers/SignupFlow.tsx/Concerns';
import Experience from '../containers/SignupFlow.tsx/Experience';
import Goals from '../containers/SignupFlow.tsx/Goals';
import SignupCompleted from '../containers/SignupFlow.tsx/SignupCompleted';
import Skintone from '../containers/SignupFlow.tsx/Skintone';
import Skintype from '../containers/SignupFlow.tsx/Skintype';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Gender" screenOptions={{ headerShown: false }}>
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
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen
        name="MainStack"
        component={MainStack}
        options={{headerShown: false}}
      />
       <Stack.Screen name="Gender" component={Gender} />
      <Stack.Screen name="Age" component={Age} />
      <Stack.Screen name="Skintype" component={Skintype} />
      <Stack.Screen name="Skintone" component={Skintone} />
      <Stack.Screen name="Concerns" component={Concerns} />
      <Stack.Screen name="Experience" component={Experience} />
      <Stack.Screen name="Goals" component={Goals} />
      <Stack.Screen name="SignupCompleted" component={SignupCompleted} />
    </Stack.Navigator>
  );
};

export default AuthStack;
