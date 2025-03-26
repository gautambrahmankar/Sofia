import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Age from '../SignupFlow/Age';
import Gender from '../SignupFlow/Gender'
import Skintype from '../SignupFlow/Skintype';
import Skintone from '../SignupFlow/Skintone';
import Concerns from '../SignupFlow/Concerns';
import Experience from '../SignupFlow/Experience';
import Goals from '../SignupFlow/Goals';
import SignupCompleted from '../SignupFlow/SignupCompleted';

const Stack = createStackNavigator();

const SignupFlow = () => {
  return (
    <Stack.Navigator initialRouteName="Gender">
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

export default SignupFlow;
