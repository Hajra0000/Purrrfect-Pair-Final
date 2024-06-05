import React, { useState, useContext } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import uuid from 'react-native-uuid';
import { EventContext } from './EventContext'; // Adjust the import path as needed

const AddEvent = () => {
  const navigation = useNavigation();
  const { handleAddEvent } = useContext(EventContext);
  const [eventName, setEventName] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [eventDate, setEventDate] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setEventDate(date);
    hideDatePicker();
  };

  const validateTime = (time) => {
    const timeFormat = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeFormat.test(time);
  };

  const handleAddEventPress = async () => {
    if (!eventName.trim()) {
      Alert.alert('Validation Error', 'Event name is required.');
      return;
    }
    if (!eventTime.trim() || !validateTime(eventTime)) {
      Alert.alert('Validation Error', 'Event time is required and must be in HH:MM format.');
      return;
    }
    if (!eventDate) {
      Alert.alert('Validation Error', 'Event date is required.');
      return;
    }
    if (!eventLocation.trim()) {
      Alert.alert('Validation Error', 'Event location is required.');
      return;
    }

    const newEvent = {
      id: uuid.v4(),
      name: eventName,
      time: eventTime,
      location: eventLocation,
      date: eventDate,
    };

    try {
      await handleAddEvent(newEvent);
      navigation.navigate('UpcomingEvent');
    } catch (error) {
      console.error('Error adding event:', error);
      Alert.alert('Error', 'Failed to add event. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.MainContainer}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerTitle}>Add Event</Text>
      </SafeAreaView>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Write event name..."
            value={eventName}
            onChangeText={setEventName}
          />
          <Text style={styles.label}>Time</Text>
          <TextInput
            style={styles.input}
            placeholder="HH:MM"
            value={eventTime}
            onChangeText={setEventTime}
          />
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity style={styles.input} onPress={showDatePicker}>
            <Text>{eventDate ? moment(eventDate).format('MMMM DD, YYYY') : 'Select date'}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Event's location..."
            value={eventLocation}
            onChangeText={setEventLocation}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddEventPress}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  headerTitle: {
    fontSize: 41,
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
    position: 'absolute',
  },
  header: {
    position: 'relative',
    backgroundColor: '#dfb2ea',
    padding: 15,
    height: 130,
  },
  label: {
    fontSize: 17,
    marginBottom: 5,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginRight: 10,
    marginLeft: 28,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 15,
    height: 65,
    width: 305,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 15,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    elevation: 18,
  },
  button: {
    backgroundColor: '#dfb2ea',
    borderRadius: 8,
    padding: 16,
    marginTop: 30,
    alignItems: 'center',
    width: '50%',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddEvent;
