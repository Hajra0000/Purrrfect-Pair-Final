import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const storedEvents = await AsyncStorage.getItem('events');
        if (storedEvents) {
          setEvents(JSON.parse(storedEvents));
        }
      } catch (error) {
        console.error('Error fetching events: ', error);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = async (newEvent) => {
    try {
      setEvents(prevEvents => {
        const updatedEvents = [...prevEvents, newEvent];
        AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
        return updatedEvents;
      });
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  };

  return (
    <EventContext.Provider value={{ events, handleAddEvent }}>
      {children}
    </EventContext.Provider>
  );
};
