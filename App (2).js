import React, { useState, useEffect } from 'react';
import { View, StatusBar, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventContext } from './Components/EventContext';
import Login from './Components/Login';
import Signup from './Components/Signup';
import CategorySelection from './Components/CategorySelection';
import PasswordRecovery from './Components/PasswordRecovery';
import NewPassword from './Components/NewPassword';
import CatsCategory from './Components/CatsCategory';
import DogsCategory from './Components/DogsCategory';
import Dogs_CatsCategory from './Components/Dogs_CatsCategory';
import MessagesPage from './Components/MessagesPage';
import CameraPage from './Components/CameraPage';
import ChatBoxPage from './Components/ChatBoxPage';
import CallingPage from './Components/CallingPage';
import ProfileSettings from './Components/ProfileSettings';
import AppSettings from './Components/AppSettings';
import Help from './Components/Help';
import ContactVet from './Components/ContactVet';
import AdoptPet from './Components/AdoptPet';
import UpcomingEvent from './Components/UpcomingEvent';
import AddEvent from './Components/AddEvent';
import CustomerSupport from './Components/CustomerSupport';
import TnC from './Components/TnC';
import Profile from './Components/Profile';
import UpdateAccInfo from './Components/UpdateAccInfo';
import OtherPictures from './Components/OtherPictures';
import AccountSetup from './Components/AccountSetup';

const Stack = createStackNavigator();

const App = () => {
  const [events, setEvents] = useState([]);
  const handleAddEvent = async (newEvent) => {
    try {
      // Update local state with the new event
      setEvents([...events, newEvent]);
  
      // Save events to AsyncStorage
      await AsyncStorage.setItem('events', JSON.stringify([...events, newEvent]));
  
      // Show success message
      Alert.alert('Success', 'Event added successfully!');
    } catch (error) {
      console.error('Error adding event:', error);
      Alert.alert('Error', 'Failed to add event. Please try again.');
    }
  };
  
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const storedEvents = await AsyncStorage.getItem('events');
        if (storedEvents) {
          setEvents(JSON.parse(storedEvents));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load events.');
      }
    };
    loadEvents();
  }, []);
  return (
    <EventContext.Provider value={{ events, handleAddEvent }}>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="CategorySelection" component={CategorySelection} />
            <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
            <Stack.Screen name="NewPassword" component={NewPassword} />
            <Stack.Screen name="CatsCategory" component={CatsCategory} />
            <Stack.Screen name="DogsCategory" component={DogsCategory} />
            <Stack.Screen name="Dogs_CatsCategory" component={Dogs_CatsCategory} />
            <Stack.Screen name="MessagesPage" component={MessagesPage} />
            <Stack.Screen name="CameraPage" component={CameraPage} />
            <Stack.Screen name="ChatBoxPage" component={ChatBoxPage} />
            <Stack.Screen name="CallingPage" component={CallingPage} />
            <Stack.Screen name="AppSettings" component={AppSettings} />
            <Stack.Screen name="Help" component={Help} />
            <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
            <Stack.Screen name="ContactVet" component={ContactVet} />
            <Stack.Screen name="AdoptPet" component={AdoptPet} />
            <Stack.Screen name="UpcomingEvent" component={UpcomingEvent} />
            <Stack.Screen name="AddEvent" component={AddEvent} />
            <Stack.Screen name="CustomerSupport" component={CustomerSupport} />
            <Stack.Screen name="TnC" component={TnC} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="UpdateAccInfo" component={UpdateAccInfo} />
            <Stack.Screen name="OtherPictures" component={OtherPictures} />
            <Stack.Screen name="AccountSetup" component={AccountSetup} />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </EventContext.Provider>
  );
};

export default App;
