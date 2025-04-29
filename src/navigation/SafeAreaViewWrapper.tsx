// components/SafeAreaWrapper.tsx
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  ViewStyle,
  StyleProp,
} from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
};

const SafeAreaWrapper = ({
  children,
  style,
  backgroundColor = '#000', // Default to black
}: Props) => {
  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor}, style]}>
      <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default SafeAreaWrapper;
