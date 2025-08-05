import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import SubmissionScreen from './screens/SubmissionScreen';
import ListingScreen from './screens/ListingScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8E8E93',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#E5E5EA',
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 4,
          },
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 1,
            borderBottomColor: '#E5E5EA',
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
          },
        }}
      >
        <Tab.Screen
          name="Submit"
          component={SubmissionScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="edit" size={size} color={color} />
            ),
            headerTitle: 'Submit Idea',
          }}
        />
        <Tab.Screen
          name="Ideas"
          component={ListingScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bulb" size={size} color={color} />
            ),
            headerTitle: 'All Ideas',
          }}
        />
        <Tab.Screen
          name="Leaderboard"
          component={LeaderboardScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="emoji-events" size={size} color={color} />
            ),
            headerTitle: 'Top Ideas',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
