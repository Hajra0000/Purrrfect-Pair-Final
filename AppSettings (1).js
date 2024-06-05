import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo vector icons
import { useNavigation } from '@react-navigation/native';

// Dummy data for profiles
const profiles = [
  { id: 1, name: 'Help', icon: 'information-circle' },
  { id: 2, name: 'Contact Veterinarian', icon: 'call' },
  { id: 3, name: 'Adopt a Pet', icon: 'paw' },
  { id: 4, name: 'Upcoming Events', icon: 'calendar' },
];

// Mapping object to associate item names with screen names
const screenMapping = {
  'Help': 'Help',
  'Contact Veterinarian': 'ContactVet',
  'Adopt a Pet': 'AdoptPet',
  'Upcoming Events': 'UpcomingEvent',
};

const AppSettings = () => {
    const navigation = useNavigation();

  // Render individual profile item
  const renderProfile = ({ item }) => {
    const navigateToScreen = (screenName) => {
      navigation.navigate(screenMapping[screenName]);
    };

    return (
      <TouchableOpacity
        style={styles.optionItem}
        onPress={() => navigateToScreen(item.name)}
      >
        <Ionicons name={item.icon} size={30} color="black" style={styles.icon} />
        <Text style={styles.optionText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </SafeAreaView>
      <FlatList
        data={profiles}
        renderItem={renderProfile}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.profilesList}
        ItemSeparatorComponent={() => <SafeAreaView style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'relative',
    backgroundColor: '#dfb2ea',
    padding: 15,
    height: 130,
    marginBottom: 30
  },
  icon: {
    marginRight: 40,
    marginLeft: 40,
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
  profilesList: {
    flex: 1,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  optionText: {
    fontSize: 22.3,
    marginTop: 10
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default AppSettings;
