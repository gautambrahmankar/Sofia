import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../containers/HomeScreen';
import ProfileScreen from '../containers/ProfileScreen';
import SettingsScreen from '../containers/SettingsScreen';
import Age from '../containers/SignupFlow.tsx/Age';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
