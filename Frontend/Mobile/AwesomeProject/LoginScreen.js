import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import { Font } from 'expo-font';

const fetchFonts = () => {
  return Font.loadAsync({
    'RobotoCondensed-Bold': require('./assets/fonts/RobotoCondensed-Bold.ttf'),
    'RobotoCondensed-Italic': require('./assets/fonts/RobotoCondensed-Italic.ttf'),
  });
};

const LoginScreen = ({ userType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);

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

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('./assets/medecin.png')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
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
      <Text style={styles.signUpText}>Sign up</Text>
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
    fontFamily: 'RobotoCondensed-Bold',
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
    borderColor: '#CBE4DE', // Change the color of the border if desired
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
    fontFamily: 'RobotoCondensed-Italic',
    textAlign: 'center',
  },
  signUpText: {
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
