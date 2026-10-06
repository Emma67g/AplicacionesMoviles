import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import MemoramaScreen from '../screens/MemoramaScreen';
import TicTacToeScreen from '../screens/TicTacToeScreen';

const Tab = createBottomTabNavigator();

export default function GamesTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Memorama') iconName = 'grid-outline';
          else if (route.name === 'TicTacToe') iconName = 'close-circle-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6C63FF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Memorama" component={MemoramaScreen} options={{ title: 'Memorama' }} />
      <Tab.Screen name="TicTacToe" component={TicTacToeScreen} options={{ title: 'Tic Tac Toe' }} />
    </Tab.Navigator>
  );
}