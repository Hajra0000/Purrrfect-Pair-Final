import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, FlatList, View } from 'react-native';
import { FontAwesome5,Ionicons,MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; // Import Ionicons from Expo vector icons
import { useNavigation } from '@react-navigation/native';


const ProfileSettings = () => {
  const navigation = useNavigation();
  // Render individual profile item
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerTitle}>Profile Settings</Text>
      </SafeAreaView>
      <TouchableOpacity style={styles.optionItem} onPress={()=>navigation.navigate('AccountSetup')}>
      <MaterialCommunityIcons name='account-details' size={24} color="black" style={styles.icon} />
      <Text style={styles.optionText}>Account Setup</Text>
    </TouchableOpacity>
    <View style={styles.separator} />
    {/* <TouchableOpacity style={styles.optionItem} onPress={()=>navigation.navigate('UpdateAccInfo')}>
      <FontAwesome5 name='edit' size={24} color="black" style={styles.icon} />
      <Text style={styles.optionText}>Update Account Info</Text>
    </TouchableOpacity> */}
    {/* <View style={styles.separator} /> */}
    <TouchableOpacity style={styles.optionItem} onPress={()=>navigation.navigate('CameraPage')}>
    <MaterialIcons name='add-photo-alternate' size={30} color="black" style={styles.icon} />
    <Text style={styles.optionText}>Add Media</Text>
  </TouchableOpacity>
  <View style={styles.separator} />
  <TouchableOpacity style={styles.optionItem} onPress={()=>navigation.navigate('Login')}>
    <MaterialIcons name='logout' size={30} color="black" style={styles.icon} />
    <Text style={styles.optionText}>Logout</Text>
  </TouchableOpacity>
  <View style={styles.separator} />
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
    width: 300,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default ProfileSettings;
