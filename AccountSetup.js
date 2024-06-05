import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker'; // Import DocumentPicker
import { uploadImage, imageToBase64 } from '../firebase'; // Assuming you have a function to upload images and convert image to base64

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

const AccountSetup = () => {
  const navigation = useNavigation();
  const [about, setAbout] = useState('');
  const [petName, setPetName] = useState('');
  const [isPedigree, setIsPedigree] = useState(false);
  const [aboutPet, setAboutPet] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerAge, setOwnerAge] = useState('');
  const [documentUri, setDocumentUri] = useState(null);
  const [petPictureUri, setPetPictureUri] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleDocumentUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' }); // Only allow PDF files
      console.log("Document upload result:", result);
      if (!result.cancelled && result.assets.length > 0) {
        const documentTempUri = result.assets[0].uri;
        console.log("Document temporary URI:", documentTempUri);
        setDocumentUri(documentTempUri);
        setUploadMessage('Document uploaded successfully!');
      }
    } catch (error) {
      console.error('Error uploading document: ', error);
    }
  };
  
  
  const handlePetPictureUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log("Pet picture upload result:", result);
      if (!result.cancelled && result.assets.length > 0) {
        const petPictureTempUri = result.assets[0].uri;
        console.log("Pet picture temporary URI:", petPictureTempUri);
        setPetPictureUri(petPictureTempUri);
        setUploadMessage('Pet picture uploaded successfully!');
      }
    } catch (error) {
      console.error('Error uploading pet picture: ', error);
    }
  };
  
  
  const handleConfirmChanges = async () => {
    console.log("about:", about);
    console.log("petName:", petName);
    console.log("aboutPet:", aboutPet);
    console.log("petAge:", petAge);
    console.log("petBreed:", petBreed);
    console.log("ownerName:", ownerName);
    console.log("ownerAge:", ownerAge);
    console.log("documentUri:", documentUri);
    console.log("petPictureUri:", petPictureUri);

    if (!about || !petName || !aboutPet || !petAge || !petBreed || !ownerName || !ownerAge ){
      // || !documentUri || !petPictureUri) {
      Alert.alert('Error', 'Please fill in all fields and upload required documents.');
      return;
    }

    try {
      // const documentUrl = await uploadImage(documentUri, false);
      // const petPictureUrl = await uploadImage(petPictureUri, true); // For images

      const docRef = await addDoc(collection(db, 'users'), {
        about,
        petName,
        isPedigree,
        aboutPet,
        petAge,
        petBreed,
        ownerName,
        ownerAge,
        // documentUrl,
        // petPictureUrl,
      });
      console.log('Document written with ID: ', docRef.id);
      navigation.navigate('Profile');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <Text style={styles.headerTitle}>Account Setup</Text>
       </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>About Yourself</Text>
          <TextInput
            style={inputStyles}
            placeholder="Write something..."
            value={about}
            onChangeText={setAbout}
          />
          <TouchableOpacity onPress={handleDocumentUpload}>
            <Text style={styles.label}>Upload Related Documents (PDF)</Text>
          </TouchableOpacity>
          {documentUri && <Text>{uploadMessage}</Text>}

          <Text style={styles.label}>Pet's Name</Text>
          <TextInput
            style={inputStyles}
            placeholder="Your Pet's Name here"
            value={petName}
            onChangeText={setPetName}
          />
          <TouchableOpacity onPress={handlePetPictureUpload}>
            <Text style={styles.label}>Upload Pet Pictures</Text>
          </TouchableOpacity>
          {petPictureUri && <Text>{uploadMessage}</Text>}

          <Text style={styles.label}>Pedigree</Text>
           <View style={styles.pedigreeContainer}>
             <Text style={styles.toggleText}>Yes</Text>
             <Switch
              value={isPedigree}
              onValueChange={setIsPedigree}
              trackColor={{ false: '#767577', true: '#6B46C1' }}
              thumbColor={isPedigree ? '#ffffff' : '#f4f3f4'}
              style={styles.switch}
            />
            {/* <Text style={styles.toggleText}>No</Text> */}
          </View>
          <Text style={styles.label}>About Your Pet</Text>
          <TextInput
            style={inputStyles}
            placeholder="Write something..."
            value={aboutPet}
            onChangeText={setAboutPet}
            multiline
          />
          <Text style={styles.label}>Pet's Age</Text>
          <TextInput
            style={inputStyles}
            placeholder="Your Pet's Age here"
            value={petAge}
            onChangeText={setPetAge}
            keyboardType='numeric'
          />
          <Text style={styles.label}>Pet's Breed</Text>
          <TextInput
            style={inputStyles}
            placeholder="Your Pet's Breed here"
            value={petBreed}
            onChangeText={setPetBreed}
          />
          <Text style={styles.label}>Owner's Name</Text>
          <TextInput
            style={inputStyles}
            placeholder="Your Name here"
            value={ownerName}
            onChangeText={setOwnerName}
          />
          <Text style={styles.label}>Owner's Age</Text>
          <TextInput
            style={inputStyles}
            placeholder="Your Age here"
            value={ownerAge}
            onChangeText={setOwnerAge}
            keyboardType='numeric'
          />

          <TouchableOpacity onPress={handleConfirmChanges} style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirm Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    position: 'relative',
    backgroundColor: '#dfb2ea',
    padding: 15,
    height: 130,
    marginBottom: 30,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 42,
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
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  label: {
    fontSize: 17,
    marginBottom: 5,
    marginLeft: 5,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#dfb2ea',
    borderRadius: 15,
    height: 60,
    width: 305,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default AccountSetup;
