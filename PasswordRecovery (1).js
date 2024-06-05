import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase'; // Import the auth instance from firebase.js
import { sendPasswordResetEmail } from "firebase/auth"; // Import the sendPasswordResetEmail function

const inputStyles = {
    backgroundColor: 'white',
    borderRadius: 15,
    height: 60,
    width: 305,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 15,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    elevation: 18,
};

const PasswordRecovery = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordRecovery = async () => {
        if (!email) {
            setError('Please enter your email address.');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Verification code sent to your email.');
            setError('');
            // Navigate to Verification screen if needed
            // navigation.navigate('Verification');
            
        } catch (error) {
            setError('Failed to send verification code. Please try again.');
            setMessage('');
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.card}>
                <Text style={styles.title}>Password Recovery</Text>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={inputStyles}
                    placeholder="Enter your email address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCompleteType="email"
                    value={email}
                    onChangeText={setEmail}
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                {message ? <Text style={styles.messageText}>{message}</Text> : null}
                <TouchableOpacity style={styles.button} onPress={handlePasswordRecovery}>
                    <Text style={styles.buttonText}>Send Recovery Link</Text>
                </TouchableOpacity>
                <Text style={styles.lowerText}>Or</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginText}>Back to Login</Text>
                </TouchableOpacity>
                <Text style={styles.lowerText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.signupText}>Sign up here!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#dfb2ea',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 10,
    },
    card: {
        shadowOpacity: 10,
        shadowRadius: 20,
        shadowOffset: 20,
        elevation: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 68,
        borderTopRightRadius: 68,
        height: 700,
        top: 100,
        width: '100%',
        padding: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 38,
        fontWeight: '900',
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 16,
        color: 'grey',
        marginBottom: 20,
        marginLeft: 5,
        alignSelf: 'flex-start',
        fontWeight: 'bold'
    },
    lowerText: {
        fontSize: 15,
        color: 'grey',
        textAlign: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        marginTop: 10,
    },
    label: {
        fontSize: 17,
        marginBottom: 5,
        marginLeft: 5,
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
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    forgotPasswordText: {
        color: '#dfb2ea',
        fontSize: 15,
        marginTop: 10,
        textAlign: 'center',
        justifyContent: 'center'
    },
    loginText: {
        color: '#dfb2ea',
        fontSize: 15,
        marginTop: 10,
        textAlign: 'center',
        justifyContent: 'center',
        textDecorationLine: 'underline',
    },
    signupText: {
        color: '#dfb2ea',
        fontSize: 15,
        marginTop: 10,
        textAlign: 'center',
        justifyContent: 'center',
        textDecorationLine: 'underline',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
    messageText: {
        color: 'green',
        fontSize: 14,
        marginBottom: 10,
    },
});

export default PasswordRecovery;
