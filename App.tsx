/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import LoginScreen from './src/auth/LoginScreen'; // Adjust the path to LoginScreen

function App(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: '#f5f5f5', // Example background color
    flex: 1, // Full-screen height
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle="dark-content" backgroundColor={backgroundStyle.backgroundColor} />
      <LoginScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
