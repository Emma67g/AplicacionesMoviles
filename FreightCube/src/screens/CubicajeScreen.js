import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function CubicajeScreen() {
  const [length, setLength] = useState('100'); // cm
  const [width, setWidth] = useState('80');   // cm
  const [height, setHeight] = useState('120'); // cm
  const [quantity, setQuantity] = useState('10');

  // Cálculos matemáticos offline
  const lengthM = (parseFloat(length) || 0) / 100;
  const widthM = (parseFloat(width) || 0) / 100;
  const heightM = (parseFloat(height) || 0) / 100;
  const qty = parseInt(quantity) || 0;

  const unitVolume = lengthM * widthM * heightM; // m³
  const totalVolume = unitVolume * qty;

  // Factor de conversión IATA estándar: 1 m³ = 166.67 kg (ó Divisor 6000 cm³/kg)
  const volumetricWeight = ((parseFloat(length) || 0) * (parseFloat(width) || 0) * (parseFloat(height) || 0) / 6000) * qty;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Cálculo de Cubicaje y Volumen</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Largo (cm):</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={length} onChangeText={setLength} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Ancho (cm):</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={width} onChangeText={setWidth} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Alto (cm):</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={height} onChangeText={setHeight} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Cantidad de Cajas / Bultos:</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={quantity} onChangeText={setQuantity} />
      </View>

      <View style={styles.resultsCard}>
        <Text style={styles.resultTitle}>Resultados Obtenidos</Text>
        <View style={styles.row}>
          <Text style={styles.resultLabel}>Volumen Unitario:</Text>
          <Text style={styles.resultValue}>{unitVolume.toFixed(3)} m³</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.resultLabel}>Volumen Total:</Text>
          <Text style={styles.resultValue}>{totalVolume.toFixed(2)} m³</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.resultLabel}>Peso Volumétrico Total:</Text>
          <Text style={styles.resultValue}>{volumetricWeight.toFixed(2)} kg</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  content: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 20 },
  inputGroup: { marginBottom: 14 },
  label: { color: '#94A3B8', fontSize: 14, marginBottom: 6 },
  input: { backgroundColor: '#1E293B', color: '#F8FAFC', padding: 12, borderRadius: 8, borderBottomWidth: 2, borderColor: '#38BDF8' },
  resultsCard: { backgroundColor: '#1E293B', padding: 18, borderRadius: 12, marginTop: 20 },
  resultTitle: { color: '#38BDF8', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 },
  resultLabel: { color: '#94A3B8', fontSize: 14 },
  resultValue: { color: '#F8FAFC', fontSize: 16, fontWeight: 'bold' },
});