import React from 'react';

import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          default: {},
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <></>,
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color }) => <></>,
          title: 'Explore',
        }}
      />
    </Tabs>
  );
}
