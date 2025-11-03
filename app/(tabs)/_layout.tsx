import React from 'react';

import tw from '@/lib/tailwind';
import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#ff9900',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: Platform.select({
            default: tw`bg-white h-16`,
            ios: [tw`bg-white h-20`, { position: 'absolute' }],
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
            title: 'Poor Circle',
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
            title: 'Rich Circle',
          }}
        />

        <Tabs.Screen
          name="assets"
          options={{
            tabBarIcon: ({ color }) => <FontAwesome6 name="house" size={24} color="black" />,
            title: 'Assets',
          }}
        />
      </Tabs>
    </>
  );
}
