import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../containers/HomeScreen';

const Tab = createBottomTabNavigator();

// Dummy Screens
// const HomeScreen = () => (
//   <View style={styles.screenContainer}>
//     <Text style={styles.text}>Home Screen</Text>
//   </View>
// );

const ProductsScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.text}>Products Screen</Text>
  </View>
);

const ExploreScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.text}>Explore Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.text}>Profile Screen</Text>
  </View>
);

// Custom Tab Bar Button for the central scan icon
const ScanButton = ({ onPress }) => (
  <TouchableOpacity style={styles.scanButton} onPress={onPress}>
    <Icon name="camera-alt" size={28} color="#FFF" />
  </TouchableOpacity>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name="home"
                size={24}
                color={focused ? '#5A31F4' : '#A1A1A1'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Products"
          component={ProductsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name="shopping-cart"
                size={24}
                color={focused ? '#5A31F4' : '#A1A1A1'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Scan"
          component={ExploreScreen} // Replace this with your scan feature
          options={{
            tabBarButton: (props) => <ScanButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name="explore"
                size={24}
                color={focused ? '#5A31F4' : '#A1A1A1'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name="person"
                size={24}
                color={focused ? '#5A31F4' : '#A1A1A1'}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

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
  scanButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#5A31F4',
    justifyContent: 'center',
    alignItems: 'center',
    top: -20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
});
