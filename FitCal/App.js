import React from 'react';
import { SafeAreaView } from 'react-native';
import Calculadora from './componentes/Calculadora';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Calculadora />
    </SafeAreaView>
  );
}
