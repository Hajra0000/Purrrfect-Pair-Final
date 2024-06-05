// import React, { useState, useEffect } from 'react';
// import { SafeAreaView, Text, TouchableOpacity, StyleSheet, FlatList, Image, View, TextInput, Button } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo vector icons
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as ImagePicker from 'expo-image-picker';

// const ChatBoxPage = () => {
//   const navigation = useNavigation();
//   const route = useRoute(); 
//   const { name } = route.params;
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [image, setImage] = useState(null);

//   const openCamera = async () => {
//     const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

//     if (permissionResult.granted === false) {
//       alert("You've refused to allow this app to access your camera!");
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [9, 16],
//       quality: 1,
//       saveToPhotos: true,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const sendImage = () => {
//     if (image) {
//       {image && <Button title="Send Image" onPress={sendImage} />}
//     }
//   };

//   useEffect(() => {
//     // Load messages from storage when the component mounts
//     loadMessages();
//   }, []);

//   const loadMessages = async () => {
//     try {
//       // Retrieve messages from AsyncStorage
//       const storedMessages = await AsyncStorage.getItem(`messages_${name}`);
//       if (storedMessages !== null) {
//         // Set the retrieved messages to state
//         setMessages(JSON.parse(storedMessages));
//       }
//     } catch (error) {
//       console.error('Error loading messages:', error);
//     }
//   };

//   const saveMessage = async () => {
//     try {
//       // Create a new message object
//       const newMessage = { id: messages.length + 1, text: message, sender: 'John' }; // Assuming 'John' is the sender
//       // Save the new message to AsyncStorage
//       await AsyncStorage.setItem(`messages_${name}`, JSON.stringify([...messages, newMessage]));
//       // Update the messages state with the new message
//       setMessages([...messages, newMessage]);
//       // Clear the message input after sending
//       setMessage('');
//     } catch (error) {
//       console.error('Error saving message:', error);
//     }
//   };

//    return (
//     <SafeAreaView style={styles.container}>
//       <SafeAreaView style={styles.header}>
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back-circle" size={38} color="black" style={styles.Backicon} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>{name}</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('CallingPage')}>
//           <Ionicons name="call" size={30} color="black" style={styles.icon} />
//         </TouchableOpacity>
//       </SafeAreaView>

//       <FlatList
//         data={messages}
//         renderItem={({ item }) => (
//           <SafeAreaView style={item.sender === 'John' ? styles.userContainer : styles.otherContainer}>
//             <Text style={styles.messageText}>{item.text}</Text>
//           </SafeAreaView>
//         )}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.messagesList}
//         // inverted // To display the latest message at the top
//       />
//       <SafeAreaView style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Type your message..."
//           multiline={true}
//           value={message}
//           onChangeText={(text) => setMessage(text)}
//         />
//         <TouchableOpacity style={styles.sendButton} onPress={saveMessage}>
//            <Ionicons name="send" size={24} color="black" />
//          </TouchableOpacity>
//          <TouchableOpacity style={styles.iconButton} onPress={openCamera}>
//          {image && <Image source={{ uri: image }} style={styles.image} />}
//           {/* {image && <Button title="Send Image" onPress={sendImage} />} */}
//            <Ionicons name="camera" size={30} color="black" />
//          </TouchableOpacity>
//          <TouchableOpacity style={styles.micButton}>
//            <Ionicons name="mic" size={30} color="black" />
//          </TouchableOpacity>
//       </SafeAreaView>
//     </SafeAreaView>
//   );
// };

import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, FlatList, Image, View, TextInput, Button, Alert, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo vector icons
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebase'; // Import the Firebase Storage instance
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ChatBoxPage = () => {
  const navigation = useNavigation();
  const route = useRoute(); 
  const { name } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);

  // Function to make a phone call
  const makePhoneCall = () => {
    const phoneNumber = '03267453454'; // Replace '1234567890' with the phone number you want to call
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }
  
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
      saveToPhotos: true,
    });
  
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      sendImage(result.assets[0].uri); // Call sendImage function after capturing the image
    }
  };
  
  const sendImage = async () => {
    try {
      if (!image) {
        Alert.alert("No Image Selected", "Please capture an image first.");
        return;
      }

      // Upload the captured image to Firebase Storage
      const imageURL = await uploadImage(image);
      
      // Create a new message object with the image URL
      const newMessage = { id: messages.length + 1, image: imageURL, sender: 'Momina' }; // Assuming 'John' is the sender

      // Save the new message to AsyncStorage
      await AsyncStorage.setItem(`messages_${name}`, JSON.stringify([...messages, newMessage]));

      // Update the messages state with the new message
      setMessages([...messages, newMessage]);

      // Clear the image state after sending
      setImage(null);

      Alert.alert("Image Sent", "The image has been sent successfully!");
    } catch (error) {
      console.error('Error sending image:', error);
      Alert.alert("Error", "Failed to send image. Please try again later.");
    }
  };
const uploadImage = async (imageUri) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Create a reference to the file location in Firebase Storage
      const storageRef = ref(storage, 'images/' + new Date().toISOString());
      
      // Upload the file to the specified reference
      await uploadBytes(storageRef, blob);

      // Get the download URL for the uploaded image
      const downloadURL = await getDownloadURL(storageRef);
      
      // Now you can do whatever you want with the download URL
      console.log("Image URL:", downloadURL);
    } catch (error) {
      console.error('Error occurred while uploading image:', error);
      throw error; // Re-throw the error for handling in the calling function
    }
  };

  useEffect(() => {
    // Load messages from storage when the component mounts
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      // Retrieve messages from AsyncStorage
      const storedMessages = await AsyncStorage.getItem(`messages_${name}`);
      if (storedMessages !== null) {
        // Set the retrieved messages to state
        setMessages(JSON.parse(storedMessages));
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const saveMessage = async () => {
    try {
      // Create a new message object
      const newMessage = { id: messages.length + 1, text: message, sender: 'John' }; // Assuming 'John' is the sender
      // Save the new message to AsyncStorage
      await AsyncStorage.setItem(`messages_${name}`, JSON.stringify([...messages, newMessage]));
      // Update the messages state with the new message
      setMessages([...messages, newMessage]);
      // Clear the message input after sending
      setMessage('');
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

   return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={38} color="black" style={styles.Backicon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{name}</Text>
        <TouchableOpacity onPress={makePhoneCall}>
          <Ionicons name="call" size={30} color="black" style={styles.icon} />
        </TouchableOpacity>
      </SafeAreaView>

      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <SafeAreaView style={item.sender === 'John' ? styles.userContainer : styles.otherContainer}>
            {item.text && <Text style={styles.messageText}>{item.text}</Text>}
            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
          </SafeAreaView>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messagesList}
        // inverted // To display the latest message at the top
      />
      <SafeAreaView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          multiline={true}
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={saveMessage}>
           <Ionicons name="send" size={24} color="black" />
         </TouchableOpacity>
         <TouchableOpacity style={styles.iconButton} onPress={openCamera}>
         {image && <Image source={{ uri: image }} style={styles.image} />}
           <Ionicons name="camera" size={30} color="black" />
         </TouchableOpacity>
         <TouchableOpacity style={styles.micButton}>
           <Ionicons name="mic" size={30} color="black" />
         </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end', // Move messages to the bottom
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#dfb2ea',
   // justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
    paddingHorizontal: 20,
  },
  headerTitle: {
    flex: 1,
    fontSize: 35,
    bottom:-28,
    left:15,
    marginRight:30,
    fontWeight: '900',
    textAlign: 'center',
  },
  icon: {
    marginRight: 10,
    transform: [{ scaleX: -1 }],
  },
  Backicon: {
    marginLeft: 8,
    // transform: [{ scaleX: -1 }],
    fontWeight:'900'
  },
  messageText: {
    fontSize: 16,
  },
  messagesList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#ccc',
    paddingVertical: 5,
    marginTop:10,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10, // Maintain padding on the left
    width: 440, // Adjust the width as needed to extend the boundary to the right
    marginLeft:20,
    
  },
  iconButton: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    width: 40,
    height: 40,
    marginRight: -5, // Adjust marginRight to move the mic icon to the right
    paddingRight:2,
    paddingLeft:2
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 50,
    width: 40,
    height: 40,
    marginLeft: -44,
    marginRight: 30,
  },
  micButton: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    width: 40,
    height: 40,
    marginRight: 5, // Adjust marginRight to move the mic icon to the right
    paddingRight:2,
    paddingLeft:2
  },
  userContainer: {
    backgroundColor: '#D889EC', // User message container color
    padding: 10,
    margin:5,
    marginRight:20,
    borderRadius: 20,
    maxWidth: '70%', // Limit user message container width
    alignSelf: 'flex-end', // Align user messages to the right
  },
  otherContainer: {
    backgroundColor: '#E7E1FE', // Other user message container color
    padding: 10,
    margin:5,
    marginLeft: 20,
    borderRadius: 10,
    maxWidth: '70%', // Limit other user message container width
    alignSelf: 'flex-start', // Align other user messages to the left
  },
});

export default ChatBoxPage;