import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import VolumeProgressBar from '../components/VolumeProgressBar';

export default function DiagnosticoScreen() {
  const [cargoName, setCargoName] = useState('Mercancía General');
  
  // Datos reales ingresados por el usuario
  const [usedWeight, setUsedWeight] = useState('2500'); // kg
  const [usedVolume, setUsedVolume] = useState('15');   // m3
  
  // Parámetros de capacidad del vehículo
  const [maxWeight, setMaxWeight] = useState('3500');   // kg
  const [maxVolume, setMaxVolume] = useState('25');     // m3

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Diagnóstico de Ocupación</Text>
      <Text style={styles.subtitle}>
        Ingrese las características físicas de la carga y del vehículo para determinar si la restricción crítica es por Peso ($kg$) o por Espacio ($m^3$).
      </Text>

      {/* Componente Gráfico Animado */}
      <VolumeProgressBar
        usedVolume={parseFloat(usedVolume) || 0}
        maxVolume={parseFloat(maxVolume) || 1}
        usedWeight={parseFloat(usedWeight) || 0}
        maxWeight={parseFloat(maxWeight) || 1}
        cargoType={cargoName}
      />

      {/* Formulario de Entrada de Parámetros */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>📋 Nombre / Descripción de la Carga</Text>
        <TextInput
          style={styles.input}
          value={cargoName}
          onChangeText={setCargoName}
          placeholder="Ej: Madera, Cajas de Textil, Bobinas..."
          placeholderTextColor="#64748B"
        />

        <Text style={styles.cardHeader}>⚖️ Parámetros de Masa (Peso)</Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Peso Carga (kg):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={usedWeight}
              onChangeText={setUsedWeight}
            />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Máx. Autorizado (kg):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={maxWeight}
              onChangeText={setMaxWeight}
            />
          </View>
        </View>

        <Text style={styles.cardHeader}>📐 Parámetros Espaciales (Volumen)</Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Volumen Carga ($m^3$):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={usedVolume}
              onChangeText={setUsedVolume}
            />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Máx. Furgón ($m^3$):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={maxVolume}
              onChangeText={setMaxVolume}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  content: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 4 },
  subtitle: { color: '#94A3B8', fontSize: 13, lineHeight: 18, marginBottom: 16 },
  card: { backgroundColor: '#1E293B', padding: 16, borderRadius: 14, marginTop: 12, borderWidth: 1, borderColor: '#334155' },
  cardHeader: { color: '#38BDF8', fontSize: 13, fontWeight: 'bold', marginTop: 8, marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  col: { flex: 0.48 },
  label: { color: '#CBD5E1', fontSize: 12, marginBottom: 4 },
  input: { backgroundColor: '#0F172A', color: '#F8FAFC', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#334155', fontSize: 14, marginBottom: 8 },
});