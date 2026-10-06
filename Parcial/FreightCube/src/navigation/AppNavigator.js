import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import CubicajeScreen from '../screens/CubicajeScreen';
import CotizadorScreen from '../screens/CotizadorScreen';
import BalanceScreen from '../screens/BalanceScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0F172A' },
        headerTintColor: '#F8FAFC',
        tabBarStyle: { backgroundColor: '#1E293B', borderTopColor: '#334155' },
        tabBarActiveTintColor: '#38BDF8',
        tabBarInactiveTintColor: '#64748B',
      }}
    >
      <Tab.Screen 
        name="Inicio" 
        component={HomeScreen} 
        options={{ tabBarIcon: ({ color }) => <Text style={{ color }}>🏠</Text> }}
      />
      <Tab.Screen 
        name="Cubicaje" 
        component={CubicajeScreen} 
        options={{ tabBarIcon: ({ color }) => <Text style={{ color }}>📦</Text> }}
      />
      <Tab.Screen 
        name="Cotizador" 
        component={CotizadorScreen} 
        options={{ tabBarIcon: ({ color }) => <Text style={{ color }}>🚚</Text> }}
      />
      <Tab.Screen 
        name="Balance" 
        component={BalanceScreen} 
        options={{ tabBarIcon: ({ color }) => <Text style={{ color }}>📐</Text> }}
      />
    </Tab.Navigator>
  );
}