import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons,FontAwesome,Entypo} from '@expo/vector-icons'; // Assuming you are using Expo for vector icons
import { useNavigation } from '@react-navigation/native';


const CatsHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Image source={require('../assets/BackgroundImage.png')} style={styles.backgroundImage} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>CATS</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.icon} onPress={()=>navigation.navigate('ProfileSettings')}>
          <Ionicons name="person-circle-outline" size={35} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={()=>navigation.navigate('MessagesPage')}>
          <FontAwesome name="envelope" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={()=>navigation.navigate('AppSettings')}>
          <Entypo name="menu" size={35} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    backgroundColor: '#dfb2ea',
    padding: 15,
    height: 130,
  },
  backgroundImage: {
    position: 'absolute',
    top: -4,
    // left: 20,
    width: '120%',
    height: '135%',
    opacity: 0.3,
  },
  titleContainer: {
    flex: 1,
    // backgroundColor:'#dfb2ea',
    alignItems: 'center',
    top:80,
    left:50,
    right:50,
    position: 'absolute',
    // top: 40,
    // left: 50,
    // right: 50,
    // alignItems: 'center',
    zIndex: 1, // Ensure the title is on top
    backgroundColor: 'transparent', // Set background color to transparent
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    fontStyle: 'italic',
    color: 'black', // Adjust the color as needed
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow color
    textShadowOffset: { width: 4, height: 4 }, // Shadow offset
    textShadowRadius: 15, // Shadow blur radius
  },
  iconsContainer: {
    flexDirection: 'row',
    // backgroundColor:'#dfb2ea',
    alignItems: 'center',
    bottom: 50,
    position: 'absolute',
    // flexDirection: 'row',
    // bottom: 10,
    left: 250,
    // zIndex: 1, // Ensure the icons are on top
    backgroundColor: 'transparent', // Set background color to transparent
  },
  icon: {
    marginLeft: 10,
  },
});

export default CatsHeader;
