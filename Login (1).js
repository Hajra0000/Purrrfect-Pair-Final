import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebase from '../firebase'; // Import the firebase configuration

const inputStyles = {
  backgroundColor: 'white',
  borderRadius: 15,
  height: 65,
  width: 305,
  paddingHorizontal: 12,
  paddingVertical: 8,
  marginBottom: 15,
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: 'black',
  elevation: 18,
};

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // const handleLogin = () => {
  //   const auth = getAuth(firebase); // Get the Firebase Auth instance
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then(() => {
  //       // Navigate to the next screen upon successful login
  //       navigation.navigate('CategorySelection');
  //     })
  //     .catch(error => {
  //       Alert.alert('Error', error.message);
  //     });
  // };
  const handleLogin = () => {
    const auth = getAuth(firebase); // Get the Firebase Auth instance
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          // Navigate to the next screen upon successful login
          navigation.navigate('CategorySelection');
        } else {
          setError('Please verify your email before logging in.');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/BackgroundImage.png')}
        style={styles.backgroundImage}
      >
      </ImageBackground>
      <SafeAreaView style={styles.mainContainer}>
        <Text style={styles.shadowText}>Purrrfect Pair</Text>
        <SafeAreaView style={[styles.card, styles.shadowEffect]}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.label}>User ID</Text>
          <TextInput
            style={inputStyles}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />
          {/* <TouchableOpacity onPress={() => navigation.navigate('UserIDRecovery')}>
            <Text style={styles.forgotPasswordText}>Forgot User ID?</Text>
          </TouchableOpacity>  */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={inputStyles}
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity onPress={() => navigation.navigate('PasswordRecovery')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity> 
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}>Sign up here!</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfb2ea',
  },
  backgroundImage: {
    flex: 0.9,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#dfb2ea',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    borderTopLeftRadius: 68,
    borderTopRightRadius: 68,
    height: 580,
    top: 30,
    width: '100%',
    padding: 40,
    alignItems: 'center',
  },
  shadowText: {
    color:'white',
    fontSize: 50,
    fontStyle: 'italic',
    textAlign: 'center',
    bottom: 25,
    fontWeight: '800',
    textShadowColor: 'rgba(1, 1, 1, 1)',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 15,
  },  
  title: {
    fontSize: 50,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 40,
  },
  label: {
    fontSize: 17,
    marginBottom: 5,
    alignSelf: 'flex-start',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#dfb2ea',
    borderRadius: 15,
    height: 65,
    width: 305,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    justifyContent:'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    textAlign:'center',
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#dfb2ea',
    fontSize: 15,
    marginTop: -5,
    left: 90
  },
  signupText: {
    color: '#dfb2ea',
    fontSize: 15,
    marginTop: 5,
    textAlign: 'center',
    justifyContent:'center',
    textDecorationLine: 'underline'
  },
  shadowEffect:{
    shadowOpacity:10,
    shadowRadius:20,
    shadowOffset:20,
    elevation:20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Login;

