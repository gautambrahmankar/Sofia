import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../containers/HomeScreen';
import ProfileScreen from '../containers/ProfileScreen';
import SettingsScreen from '../containers/SettingsScreen';
import SignupFlow from '../containers/SignupFlow';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen" >
      <Stack.Screen
        name="SignupFlow"
        component={SignupFlow}
        options={{headerShown: false}}
      />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen}  options={{headerShown: false}}/>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default MainStack;
