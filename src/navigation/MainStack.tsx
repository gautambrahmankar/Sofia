import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../containers/HomeScreen';
import SignupFlow from '../containers/SignupFlow';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileScreen from '../containers/ProfileScreen';
import ExploreScreen from '../containers/ExploreScreen';
import ProductScreen from '../containers/ProductScreen';
import {navigate} from './navigationUtils';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Custom Tab Bar Button for the central scan icon
const ScanButton = ({onPress}) => (
  <TouchableOpacity style={styles.scanButtonWrapper} onPress={onPress}>
    <View style={styles.scanButton}>
      <Icon name="camera-alt" size={28} color="#FFF" />
    </View>
  </TouchableOpacity>
);

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              size={24}
              color={focused ? '#000000' : '#A1A1A1'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="shopping-cart"
              size={24}
              color={focused ? '#000000' : '#A1A1A1'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ExploreScreen} // Replace this with your scan feature
        options={{
          tabBarButton: props => (
            <ScanButton {...props} onPress={() => navigate('ScanFace', {})} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={() => null}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            navigate('ExploreScreen', {
              url: 'https://sophiecosmetix.com/index.php?route=journal3/blog&language=en-gb',
            });
          },
        }}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="explore"
              size={24}
              color={focused ? '#000000' : '#A1A1A1'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="person"
              size={24}
              color={focused ? '#000000' : '#A1A1A1'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeTabs">
      <Stack.Screen
        name="SignupFlow"
        component={SignupFlow}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabBar: {
    height: 60,
    backgroundColor: '#FFF',
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
  },
  scanButtonWrapper: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  scanButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    elevation: 8,
  },
});
