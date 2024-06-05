import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore database
import { Linking } from 'react-native';

const AdoptPet = () => {
  const [profiles, setProfiles] = useState([]);
  const navigation = useNavigation();

  const openMaps = (location) => {
    if (location) {
      const formattedLocation = encodeURIComponent(location);
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${formattedLocation}`);
    }
  };

  const openEmailApp = (email) => {
    if (email) {
      Linking.openURL(`mailto:${email}`);
    }
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profilesCollection = collection(db, 'adoptionCentres');
        const profileSnapshot = await getDocs(profilesCollection);
        const profileList = profileSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProfiles(profileList);
      } catch (error) {
        console.error("Error fetching profiles: ", error);
      }
    };

    fetchProfiles();
  }, []);

  const renderProfile = ({ item }) => (
    <SafeAreaView style={styles.profileItem}>
      <SafeAreaView style={styles.profileContainer}>
        <Image source={{ uri: item.profilePic }} style={styles.profileImage} resizeMode="contain" />
        <SafeAreaView style={styles.profileInfo}>
          <Text style={styles.profileName}>{item.centreName}</Text>
          <TouchableOpacity onPress={() => openEmailApp(item.email)}>
            <Text style={styles.email}>{item.email}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileTouchable} onPress={() => openMaps(item.address)}>
            <Text style={styles.location}>{item.address}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerTitle}>Adopt a Pet</Text>
      </SafeAreaView>
      <FlatList
        data={profiles}
        renderItem={renderProfile}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.profilesList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  profilesList: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 34.3,
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
  header: {
    position: 'relative',
    backgroundColor: '#dfb2ea',
    padding: 15,
    height: 130,
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
    marginBottom: 20,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 140,
    borderRadius: 0,
    marginRight: 20,
    aspectRatio: 1
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 15,
    paddingTop: 15
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileTouchable: {
    borderRadius: 10,
    overflow: 'visible',
  },
  email: {
    fontSize: 13,
    fontWeight: 'bold'
  },
  location: {
    fontSize: 12,
    fontWeight: '50'
  },
});

export default AdoptPet;
