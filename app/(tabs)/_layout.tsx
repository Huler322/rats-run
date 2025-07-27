import React from 'react';

import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ff9900',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: Platform.select({
          default: {},
          ios: { position: 'absolute' },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <Feather name="info" size={24} color={color} />,
          title: 'Info',
        }}
      />

      <Tabs.Screen
        name="poorCircle"
        options={{
          tabBarIcon: ({ color }) => <Feather name="trending-down" size={24} color={color} />,
          title: 'Poor Circle',
        }}
      />

      <Tabs.Screen
        name="stocks"
        options={{
          tabBarIcon: ({ color }) => <Feather name="bar-chart-2" size={24} color={color} />,
          title: 'Stocks',
        }}
      />

      <Tabs.Screen
        name="richCircle"
        options={{
          tabBarIcon: ({ color }) => <Feather name="trending-up" size={24} color={color} />,
          title: 'Rich Circle',
        }}
      />
    </Tabs>
  );
}
