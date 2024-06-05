import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { Ionicons,FontAwesome,Entypo,MaterialIcons} from '@expo/vector-icons';

import MixHeader from './MixHeader';
import { db } from '../firebase'; // Import Firestore instance

const Dogs_CatsCategory = () => {
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const profileData = querySnapshot.docs.map(doc => doc.data());
        setProfiles(profileData);
      } catch (error) {
        console.error('Error fetching registered profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  // Render individual profile item
  const renderProfile = ({ item }) => (
    <TouchableOpacity style={styles.profileTouchable} onPress={() => navigation.navigate('Profile', { profile: item })}>
      <View style={styles.profileItem}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{item.petName} , {item.petAge}</Text>
            <Text style={styles.ownerName}>{item.ownerName} , {item.ownerAge}</Text>
            <Text style={styles.breed}>{item.petBreed}</Text>
            <View style={styles.iconsContainer}>
            <MaterialIcons name="star" size={28} color="orange" style={styles.icon} />
            <FontAwesome name="bookmark" size={22} color="purple" style={styles.icon} />
          </View>
          </View>
          </View>
          </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <MixHeader />
      <FlatList
  data={profiles}
  renderItem={renderProfile}
  keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
  contentContainerStyle={styles.profilesList}
/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  iconsContainer: {
    position: 'absolute',
    top: 70,
    left: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 130,
    height: 120,
    marginRight: 30,
    // marginLeft:15,
    borderRadius: 10,
    backgroundColor: 'lavender',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E7E1FE',
    height: 151,
    width: 345,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 30,
    top:25,
    left:20
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileTouchable: {
    borderRadius: 10,
    overflow: 'visible',
  },
  ownerName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  ownerAge: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  breed: {
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default Dogs_CatsCategory;

