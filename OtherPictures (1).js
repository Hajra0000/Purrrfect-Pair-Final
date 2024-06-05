// import { Entypo } from '@expo/vector-icons';
// import React from 'react';
// import { SafeAreaView, ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook


// const OtherPictures = () => {
//     const navigation = useNavigation();
//   return (
//         <SafeAreaView style={styles.container}>
//     {/* Header */}
//     <View style={styles.header}>
//          {/* Profile Picture */}
//          <View style={styles.profileContainer}>
//           <Image
//             source={require('../assets/Dogs.png')}
//             style={styles.profilePicture}
//           />
//         </View>
//         {/* Menu Icon */}
//         <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('ProfileSettings')}>
//           <Entypo name="menu" size={35} color="black" />
//         </TouchableOpacity>
//         {/* Name */}
//         <View style={styles.nameContainer}>
//           <Text style={styles.name}>Juliana Silvia, 24</Text>
//         </View>
//       </View>

//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {/* Render other pictures here */}
//         <Image
//           source={require('../assets/Cats.png')}
//           style={styles.otherPicture}
//         />
//         <Image
//           source={require('../assets/Cats.png')}
//           style={styles.otherPicture}
//         />
//         <Image
//           source={require('../assets/Cats.png')}
//           style={styles.otherPicture}
//         />
//         <Image
//           source={require('../assets/Cats.png')}
//           style={styles.otherPicture}
//         />
//         <Image
//           source={require('../assets/Dogs&Cats.png')}
//           style={styles.otherPicture}
//         />
//         {/* Add more images as needed */}
//       </ScrollView>
//     </SafeAreaView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//       },
//       header: {
//         flexDirection: 'row',
//         backgroundColor: '#dfb2ea',
//         padding: 15,
//         height: 130,
//       },
//       profileContainer: {
//         position: 'absolute',
//         left: 30,
//         top: 15,
//         bottom: 0,
//         opacity:100,
//         backgroundColor:'lavender'
//       },
//       profilePicture: {
//         width: 100,
//         height: 100,
//         borderRadius: 90,
//         position:'absolute'
//       },
//       nameContainer: {
//         marginLeft: 85,
//         marginTop: 20,
//       },
//       name: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         left:100,
//         top:60
//       },
//       menuIcon: {
//         position: 'absolute',
//         right: 15,
//         top: 25,
//       },
//       content: {
//         flex: 1,
//         paddingHorizontal: 20,
//         paddingTop: 20,
//       },
//   scrollContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     paddingVertical: 20,
//     paddingHorizontal: 10,
    
//   },
//   otherPicture: {
//     width: '70%', // Adjust the width as needed
//     aspectRatio: 1, // Ensure square aspect ratio
//     borderRadius: 10,
//     marginBottom: 30, // Add some spacing between images
//     marginTop:30,
//     backgroundColor: 'lavender',
//   },
// });

// export default OtherPictures;
import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const OtherPictures = ({ route }) => {
    const navigation = useNavigation();
    const { name, age } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* Profile Picture */}
                <View style={styles.profileContainer}>
                    <Image
                        source={require('../assets/Dogs.png')}
                        style={styles.profilePicture}
                    />
                </View>
                {/* Menu Icon */}
                <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('ProfileSettings')}>
                    <Entypo name="menu" size={35} color="black" />
                </TouchableOpacity>
                {/* Name */}
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{name}, {age}</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Render other pictures here */}
                <Image
                    source={require('../assets/Cats.png')}
                    style={styles.otherPicture}
                />
                <Image
                    source={require('../assets/Cats.png')}
                    style={styles.otherPicture}
                />
                <Image
                    source={require('../assets/Cats.png')}
                    style={styles.otherPicture}
                />
                <Image
                    source={require('../assets/Cats.png')}
                    style={styles.otherPicture}
                />
                <Image
                    source={require('../assets/Dogs&Cats.png')}
                    style={styles.otherPicture}
                />
                {/* Add more images as needed */}
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
        left: 30,
        top: 15,
        bottom: 0,
        opacity: 100,
        backgroundColor: 'lavender'
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 90,
        position: 'absolute'
    },
    nameContainer: {
        marginLeft: 135,
        marginTop: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        left: 100,
        top: 60
    },
    menuIcon: {
        position: 'absolute',
        right: 15,
        top: 25,
    },
    scrollContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,

    },
    otherPicture: {
        width: '70%', // Adjust the width as needed
        aspectRatio: 1, // Ensure square aspect ratio
        borderRadius: 10,
        marginBottom: 30, // Add some spacing between images
        marginTop: 30,
        backgroundColor: 'lavender',
    },
});

export default OtherPictures;
