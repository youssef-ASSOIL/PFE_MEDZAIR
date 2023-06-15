import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';
import SignUpScreen from './SignUpScreen';

const LoginScreen = ({ userType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);

  const signIn = async () => {
    try {
      if (userType === 'Client') {
        // Perform client-specific login logic
        // ...

        // Navigate to ClientHomeScreen
        // navigation.navigate('ClientHome');
      } else if (userType === 'Employee') {
        // Perform employee-specific login logic
        // ...

        // Navigate to EmployeeHomeScreen
        // navigation.navigate('EmployeeHome');
      } else if (userType === 'Manager') {
        // Perform manager-specific login logic
        // ...

        // Navigate to ManagerHomeScreen
        // navigation.navigate('ManagerHome');
      }
    } catch (error) {
      Alert.alert('Sign In Error', 'Failed to sign in. Please check your credentials.');
    }
  };

  const navigateToSignUp = () => {
    setShowSignUp(true);
  };

  return (
    <View style={styles.container}>
      {showSignUp ? (
        <SignUpScreen />
      ) : (
        <>
          <Image source={require('./assets/medecin.png')} style={styles.logo} />
          <Text style={styles.title}>Login</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email (RPPS)"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity onPress={signIn} style={styles.signInButton}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToSignUp}>
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
    width: '100%',
    height: '100%',
  },
  logo: {
    height: 200,
    width: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Roboto Condensed',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 300,
    borderWidth: 1,
    borderColor: '#CBE4DE',
  },
  signInButton: {
    marginTop: 15,
    backgroundColor: '#0E8388',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  signUpText: {
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
