import React from 'react';
import { View, Text, StyleSheet,SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons,FontAwesome,Entypo,MaterialIcons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



const Profile = ({ route }) => {
  const { profile } = route.params;
  const navigation = useNavigation();

  const navigateToOtherPictures = () => {
    navigation.navigate('OtherPictures', { name: profile.ownerName, age: profile.ownerAge }); // Navigate to 'OtherPictures' page
  };
  return (
    <SafeAreaView style={styles.container}>
           {/* Header */}
           <View style={styles.header}>
             {/* Profile Picture */}
            
            <View style={styles.profileContainer}>
             </View>
             {/* Menu Icon */}
             <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('ProfileSettings')}>
               <Entypo name="menu" size={35} color="black" />
             </TouchableOpacity>
             {/* Name */}
             <View style={styles.nameContainer}>
               <Text style={styles.name}>{profile.ownerName}, {profile.ownerAge}</Text>
            </View>
           </View>
           <ScrollView style={styles.content}>
        {/* Main Picture */}
        <TouchableOpacity style={styles.mainPicture} onPress={navigateToOtherPictures}> 
        </TouchableOpacity>
        <View style={styles.descriptions}>
          <Text style={styles.aboutOwner}>About the Owner:</Text>
          <Text style={styles.aboutOwnerText}>
            {profile.about}
          </Text>
          <Text style={styles.petDetails}>Breed:</Text>
          <Text style={styles.aboutPetText}>{profile.petBreed}</Text>
          <Text style={styles.petDetails}>Name:</Text>
          <Text style={styles.aboutPetText}>{profile.petName}</Text>
          <Text style={styles.petDetails}>{profile.isPedigree? 'Pedigree: Yes' : 'Pedigree: No'}</Text>
          <Text style={styles.aboutPet}>About:</Text>
          <Text style={styles.aboutPetText}>
            {profile.aboutPet}
            </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );  
    
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#dfb2ea',
    padding: 15,
    height: 130,
  },
  profileContainer: {
    position: 'absolute',
    left: 20,
    top: 65,
    bottom: 0,
    opacity:100,
    backgroundColor:'lavender'
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 90,
    position:'absolute'
  },
  nameContainer: {
    marginLeft: 135,
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    left:100,
    top:60
  },
  menuIcon: {
    position: 'absolute',
    right: 15,
    top: 25,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  mainPicture: {
    // width: '100%',
    aspectRatio: 1.5, // Adjust aspect ratio as needed
    borderRadius: 10,
    left:45,
    right:15,
    marginTop:30,
    marginBottom: 30,
    backgroundColor:'lavender'
  },
  otherPicturesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'lavender',
    flexWrap: 'wrap',
    marginBottom: 30,
    marginTop:50,
  },
  otherPicture: {
    width: '48%',
    aspectRatio: 1, // Ensure square aspect ratio
    borderRadius: 10,
  },
  descriptions: {
    marginBottom: 20,
  },
  aboutOwner: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    
  },
  aboutOwnerText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign:'justify'
  },
  petDetails: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight:'bold'
  },
  aboutPet: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
  aboutPetText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign:'justify'
  },
});

export default Profile;
