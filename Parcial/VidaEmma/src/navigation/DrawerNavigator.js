import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import PropinasScreen from '../screens/PropinasScreen';
import IMCScreen from '../screens/IMCScreen';
import GamesTabNavigator from './GamesTabNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#6C63FF' },
        headerTintColor: '#FFF',
        drawerActiveTintColor: '#6C63FF',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Inicio',
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Propinas"
        component={PropinasScreen}
        options={{
          title: 'Calculadora Propinas',
          drawerIcon: ({ color, size }) => <Ionicons name="cash-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="IMC"
        component={IMCScreen}
        options={{
          title: 'Calculadora IMC',
          drawerIcon: ({ color, size }) => <Ionicons name="fitness-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="JuegosTab"
        component={GamesTabNavigator}
        options={{
          title: 'Sección de Juegos',
          drawerIcon: ({ color, size }) => <Ionicons name="game-controller-outline" size={size} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}