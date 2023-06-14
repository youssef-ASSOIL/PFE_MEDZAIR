import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './LoginScreen';

export default function App() {
  const signIn = async () => {
    // Call the signIn function logic here
    try {
      // Perform sign-in logic
      console.log('Sign in function called.');
    } catch (error) {
      console.log('Error occurred during sign in:', error);
    }
  };

  return (
    <View style={styles.container}>
     
      <LoginScreen userType="Client" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
