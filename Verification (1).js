// import React, { useState } from 'react';
// import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../firebase'; // Import Firestore database

// const inputStyles = {
//     backgroundColor: 'white',
//     borderRadius: 15,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//     marginLeft: 10,
//     elevation: 18,
//     borderWidth: 2,
//     borderColor: 'dimgrey',
//     padding: 3,
//     textAlign: 'center',
// };

// const Verification = () => {
//         const [code, setCode] = useState(['', '', '', '', '']);
//         const navigation = useNavigation();
//         const route = useRoute();
//         const { email } = route.params; // Get the email from the previous screen
    
//         const handleCodeChange = (index, value) => {
//             const newCode = [...code];
//             newCode[index] = value;
//             setCode(newCode);
//         };
    
//         const handleVerifyCode = async () => {
//             // Combine the digits entered by the user into a single string
//             const enteredCode = code.map(digit => digit.toString()).join('').trim();
    
//             // Check if the combined code is empty
//             if (enteredCode.length !== 5) {
//                 Alert.alert('Error', 'Please enter all 5 digits of the verification code.');
//                 return;
//             }
    
//             try {
//                 // Construct the Firestore query to check if the code exists
//                 const q = query(collection(db, 'verificationCodes'), where('email', '==', email), where('code', '==', parseInt(enteredCode, 10)));
//                 const querySnapshot = await getDocs(q);
    
//                 // Check if a matching document is found
//                 if (!querySnapshot.empty) {
//                     navigation.navigate('NewPassword');
//                 } else {
//                     Alert.alert('Error', 'Invalid verification code');
//                 }
//             } catch (error) {
//                 Alert.alert('Error', error.message);
//             }
//         };
    
    
// //     const handleCodeChange = (index, value) => {
// //         const newCode = [...code];
// //         newCode[index] = value;
// //         setCode(newCode);
// //     };

// //     const handleVerifyCode = async () => {
// //       // Combine the digits entered by the user into a single string
// //       const enteredCode = code.map(digit => digit.toString()).join('').trim();
  
// //       // Check if the combined code is empty
// //       if (enteredCode.length !== 5) {
// //           Alert.alert('Error', 'Please enter all 5 digits of the verification code.');
// //           return;
// //       }
  
// //       try {
// //           // Construct the Firestore query to check if the code exists
// //           const q = query(collection(db, 'verificationCodes'), where('code', '==', parseInt(enteredCode, 10)));
// //           const querySnapshot = await getDocs(q);
  
// //           // Check if a matching document is found
// //           if (!querySnapshot.empty) {
// //               navigation.navigate('NewPassword');
// //           } else {
// //               Alert.alert('Error', 'Invalid verification code');
// //           }
// //       } catch (error) {
// //           Alert.alert('Error', error.message);
// //       }
// //   };

//     return (
//         <SafeAreaView style={styles.mainContainer}>
//             <SafeAreaView style={styles.card}>
//                 <Text style={styles.title}>Verification</Text>
//                 <Text style={styles.label}>Enter Verification Code</Text>
//                 <SafeAreaView style={styles.inputFieldContainer}>
//                     {code.map((digit, index) => (
//                         <TextInput
//                             key={index}
//                             style={inputStyles}
//                             maxLength={1}
//                             keyboardType="numeric"
//                             value={digit}
//                             onChangeText={(value) => handleCodeChange(index, value)}
//                         />
//                     ))}
//                 </SafeAreaView>
//                 <Text style={styles.subtitle}>Please check your inbox for the verification code.</Text>
//                 <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
//                     <Text style={styles.buttonText}>Enter</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.lowerText}>Or</Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//                     <Text style={styles.loginText}>Back to Login</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.lowerText}>Don't have an account?</Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
//                     <Text style={styles.signupText}>Sign up here!</Text>
//                 </TouchableOpacity>
//             </SafeAreaView>
//         </SafeAreaView>
//     );
// };
// const styles = StyleSheet.create({
//     inputFieldContainer: {
//         flexDirection: 'row',
//         flex: 0.25
//     },
//     mainContainer: {
//         backgroundColor: '#dfb2ea',
//         flex: 1,
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         paddingBottom: 10,
//         height: 'auto',
//         width: '100%',
//     },
//     card: {
//         shadowOpacity: 10,
//         shadowRadius: 20,
//         shadowOffset: 20,
//         elevation: 20,
//         backgroundColor: 'white',
//         borderTopLeftRadius: 68,
//         borderTopRightRadius: 68,
//         height: 700,
//         top: 100,
//         width: '100%',
//         padding: 40,
//         alignItems: 'center',
//     },
//     title: {
//         fontSize: 38,
//         fontWeight: '900',
//         textAlign: 'center',
//         fontStyle: 'italic',
//         marginBottom: 40,
//     },
//     subtitle: {
//         fontSize: 16,
//         color: 'grey',
//         marginTop: 15,
//         marginBottom: 20,
//         marginLeft: 5,
//         alignSelf: 'flex-start',
//         fontWeight: 'bold'
//     },
//     lowerText: {
//         fontSize: 15,
//         color: 'grey',
//         textAlign: 'center',
//         justifyContent: 'center',
//         fontWeight: 'bold',
//         marginTop: 10,
//     },
//     label: {
//         fontSize: 17,
//         marginBottom: 20,
//         marginLeft: 5,
//         alignSelf: 'flex-start',
//         fontWeight: 'bold',
//         textAlign: 'justify'
//     },
//     button: {
//         backgroundColor: '#dfb2ea',
//         borderRadius: 15,
//         height: 60,
//         width: 305,
//         paddingHorizontal: 20,
//         paddingVertical: 10,
//         marginTop: 10,
//         justifyContent: 'center'
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 22,
//         textAlign: 'center',
//         fontWeight: 'bold',
//     },
//     loginText: {
//         color: '#dfb2ea',
//         fontSize: 15,
//         marginTop: 10,
//         textAlign: 'center',
//         textDecorationLine: 'underline',
//     },
//     signupText: {
//         color: '#dfb2ea',
//         fontSize: 15,
//         marginTop: 10,
//         textAlign: 'center',
//         textDecorationLine: 'underline',
//     },
// });

// export default Verification;
