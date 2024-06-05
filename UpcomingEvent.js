import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventContext } from './EventContext'; // Adjust the import path as needed
import { Linking } from 'react-native';

const UpcomingEvents = () => {
  const navigation = useNavigation();
  const { events } = useContext(EventContext);
  const [loadedEvents, setLoadedEvents] = useState(events);

  const openMaps = (location) => {
    if (location) {
      const formattedLocation = encodeURIComponent(location);
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${formattedLocation}`);
    }
  };

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const storedEvents = await AsyncStorage.getItem('events');
        if (storedEvents) {
          setLoadedEvents(JSON.parse(storedEvents));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load events.');
      }
    };

    loadEvents();
  }, [events]);

  const renderEvent = ({ item }) => (
    <TouchableOpacity style={styles.eventItem}>
      <Text style={styles.eventName}>Name: {item.name}</Text>
      <Text style={styles.eventDetails}>Time: {item.time}</Text>
      <TouchableOpacity style={styles.eventDetails} onPress={() => openMaps(item.location)}>
            <Text style={styles.location}>Location: {item.location}</Text>
          </TouchableOpacity>
      {/* <Text style={styles.eventDetails}>Location: {item.location}</Text> */}
      <Text style={styles.eventDetails}>Date: {moment(item.date).format('MMMM DD, YYYY')}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
    <SafeAreaView style={styles.header}>
      <Text style={styles.headerTitle}>Upcoming Events</Text>
    </SafeAreaView>
    <FlatList
      data={loadedEvents}
      renderItem={renderEvent}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.eventsList}
      ItemSeparatorComponent={() => <SafeAreaView style={styles.separator} />}
    />
    <TouchableOpacity onPress={() => navigation.navigate('AddEvent')} style={styles.addButton}>
      <Text style={styles.addButtonText}>Add Event</Text>
    </TouchableOpacity>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    position: 'absolute'
  },
  header: {
    position: 'relative',
    backgroundColor: '#dfb2ea',
    padding: 15,
    height: 130,
  },
  addButton: {
    backgroundColor: '#dfb2ea',
    borderRadius: 15,
    height: 65,
    width: 160,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 90,
    right: 50,
  },
  addButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  eventsList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  eventItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDetails: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    width: 300,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default UpcomingEvents;
