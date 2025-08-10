import React from 'react';

import tw from '@/lib/tailwind';
import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Alert, Platform, Text, TouchableOpacity } from 'react-native';
import { useAppDispatch } from '@/store';
import { getSalary } from '@/slices/game.slice';

export default function TabLayout() {
  const dispatch = useAppDispatch();

  const setSalary = () => {
    Alert.alert('Are you sure want to get salary?', '', [
      {
        style: 'cancel',
        text: 'No',
      },
      {
        onPress: () => dispatch(getSalary()),
        text: 'Get',
      },
    ]);
  };

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#ff9900',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: Platform.select({
            default: tw`bg-white h-16`,
            ios: [tw`bg-white h-16`, { position: 'absolute' }],
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
      </Tabs>

      <TouchableOpacity
        onPress={setSalary}
        style={tw`absolute bottom-12 -translate-x-8 left-1/2 h-20 w-20 p-1 items-center justify-center rounded-full bg-orange-500 z-50`}
      >
        <Text style={tw`text-center text-base text-gray-900 font-bold`}>Get Salary</Text>
      </TouchableOpacity>
    </>
  );
}
