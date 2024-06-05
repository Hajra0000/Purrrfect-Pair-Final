import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, Image, TouchableOpacity, Platform, Linking } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function CallingPage({ name }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const soundObject = new Audio.Sound();


  const makePhoneCall = () => {
    const phoneNumber = '1234567890'; // Replace '1234567890' with the phone number you want to call
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const toggleMute = async () => {
    setIsMuted(!isMuted);
    if (isMuted) {
      await soundObject.setIsMutedAsync(false);
    } else {
      await soundObject.setIsMutedAsync(true);
    }
  };

  const toggleSpeaker = async () => {
    setIsSpeakerOn(!isSpeakerOn);
    if (isSpeakerOn) {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        playThroughEarpieceAndroid: true,
      });
    } else {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        playThroughEarpieceAndroid: false,
      });
    }
  };

  const endCall = () => {
    Linking.openURL('tel:'); // This will end the ongoing call
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.profileContainer}>
        <SafeAreaView style={styles.profileImageContainer}>
          <Image source={require('../assets/Cats.png')} style={styles.profilePic} />
        </SafeAreaView>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.callingText}>Calling...</Text>
        <SafeAreaView style={styles.buttonContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={toggleSpeaker}>
            <Ionicons name={isSpeakerOn ? "volume-high" : "volume-off"} size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={toggleMute}>
            <Ionicons name={isMuted ? "mic-off" : "mic"} size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={makePhoneCall}>
            <Ionicons name="call" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={endCall}>
            <MaterialIcons name="call-end" size={24} color="red" />
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7E1FE',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 20,
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 24,
    color: '#333',
    marginBottom: 10,
  },
  callingText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 30,
    marginHorizontal: 10,
  },
});
