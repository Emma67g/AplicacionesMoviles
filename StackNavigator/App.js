import { StyleSheet, Text, View } from 'react-native';
import CurrencyScreen from './src/screens/CurrencyScreen.jsx';
import ImcScreen from './src/screens/IMCScreens.jsx';
import TipScreen from './src/screens/TipScreen.jsx';
import HomeScreen from './src/screens/HomeScreen.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

const Stack=createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} options={{title:'Menu principal'}}/>
        <Stack.Screen name='IMC' component={ImcScreen} options={{title:'Calculadora IMC'}}/>
        <Stack.Screen name='divisas' component={CurrencyScreen} options={{title:'Calculadora Divisas'}}/>
        <Stack.Screen name='tips' component={TipScreen} options={{title:'Calculadora de propina'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
