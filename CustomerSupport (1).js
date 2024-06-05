import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo vector icons
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomerSupport = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name } = route.params || { name: 'Customer Support' }; // Ensure name is provided or set a default
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Load messages from storage when the component mounts
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      // Retrieve messages from AsyncStorage using a unique key
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
      const newMessage = { id: messages.length + 1, text: message, sender: 'CustomerSupport' }; // Assuming 'CustomerSupport' is the sender
      // Save the new message to AsyncStorage using a unique key
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
        <Text style={styles.headerTitle}>{name}</Text>
      </SafeAreaView>

      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <SafeAreaView style={item.sender === 'CustomerSupport' ? styles.userContainer : styles.otherContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
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
    position: 'relative',
    backgroundColor: '#dfb2ea',
    padding: 15,
    height: 130,
    // marginBottom: 30
  },
  headerTitle: {
    fontSize: 38,
    textAlign: 'center',
    fontWeight: '900',
    fontStyle: 'italic',
    color: 'black',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 15,
    top: 65,
    left: 50,
    right: 50,
    position: 'absolute'
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
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10, // Maintain padding on the left
    width: 440, // Adjust the width as needed to extend the boundary to the right
    marginLeft: 23,
    marginBottom:15
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
    marginBottom:20
  },
  userContainer: {
    backgroundColor: '#D889EC', // User message container color
    padding: 10,
    margin: 5,
    marginRight: 20,
    borderRadius: 20,
    maxWidth: '70%', // Limit user message container width
    alignSelf: 'flex-end', // Align user messages to the right
  },
  otherContainer: {
    backgroundColor: '#E7E1FE', // Other user message container color
    padding: 10,
    margin: 5,
    marginLeft: 20,
    borderRadius: 10,
    maxWidth: '70%', // Limit other user message container width
    alignSelf: 'flex-start', // Align other user messages to the left
  },
});

export default CustomerSupport;
