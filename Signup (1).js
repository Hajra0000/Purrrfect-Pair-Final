import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'; // Import sendEmailVerification
import firebase from '../firebase'; // Import the firebase configuration
const inputStyles = {
  backgroundColor: 'white',
  borderRadius: 15,
  height: 60,
  width: 305,
  paddingHorizontal: 12,
  paddingVertical: 8,
  marginBottom: 12,
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: 'black',
  elevation: 18,
};
const Signup = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = () => {
    const auth = getAuth(firebase); // Get the Firebase Auth instance
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successfully created user account
        const user = userCredential.user;
        // Send email verification
        sendEmailVerification(user)
          .then(() => {
            // Email verification sent successfully
            Alert.alert('Success', 'Account created successfully! A confirmation email has been sent to your email address.');
            // For example:
            navigation.navigate('Login');
          })
          .catch((error) => {
            // Error sending email verification
            Alert.alert('Error', 'Failed to send confirmation email. Please try again later.');
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          // Email address is already in use
          Alert.alert('Error', 'The email address is already in use. Please use a different email address.');
        } else {
          // Other errors
          Alert.alert('Error', error.message); // Display error message in a dialogue box
        }
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/BackgroundImage.png')}
        style={styles.backgroundImage}
      >
      </ImageBackground>
      <View style={styles.mainContainer}>
        <View style={styles.shadowEffect}>
          <Text style={styles.title}>Create New Account</Text>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={inputStyles}
            placeholder="Enter your full name"
            keyboardType="default"
            autoCapitalize="none"
            autoCompleteType="full name"
            onChangeText={setFullName}
            value={fullName}
          />
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={inputStyles}
            placeholder="Enter your username"
            keyboardType="default"
            autoCapitalize="none"
            autoCompleteType="username"
            onChangeText={setUsername}
            value={username}
          />
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={inputStyles}
            placeholder="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="email"
            onChangeText={setEmail}
            value={email}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={inputStyles}
            placeholder="Enter your password"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signupText}>Already have an account? Log in here!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfb2ea',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "center",
    height:165
  },
  mainContainer: {
    backgroundColor: '#dfb2ea',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  shadowEffect:{
    shadowOpacity:10,
    shadowRadius:20,
    shadowOffset:20,
    elevation:20,
    backgroundColor: 'white',
    borderTopLeftRadius: 68,
    borderTopRightRadius: 68,
    height: 'auto',
    bottom: 270,
    width: '100%',
    padding: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 17,
    marginTop:4,
    marginBottom: 4,
    alignSelf: 'flex-start',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#dfb2ea',
    borderRadius: 15,
    height: 60,
    width: 305,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    justifyContent:'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    textAlign:'center',
    fontWeight: 'bold',
  },
  signupText: {
    color: '#dfb2ea',
    fontSize: 15,
    marginTop: 5,
    textAlign: 'center',
    justifyContent:'center',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Signup;
