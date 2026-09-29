import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import VolumeProgressBar from '../components/VolumeProgressBar';

export default function HomeScreen({ navigation }) {
  // Parámetros de Carga
  const [cargoType, setCargoType] = useState('Madera Densal');
  const [usedVol, setUsedVol] = useState('18');
  const [maxVol, setMaxVol] = useState('30');
  const [usedWeight, setUsedWeight] = useState('3200');
  const [maxWeight, setMaxWeight] = useState('3500');

  // Ajustes predefinidos de prueba rápida para la demo en Zoom
  const applyPreset = (type, vol, weight) => {
    setCargoType(type);
    setUsedVol(vol.toString());
    setUsedWeight(weight.toString());
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.welcome}>Panel Logístico</Text>
      <Text style={styles.subtitle}>FreightCube v1.0 • Evaluación Espacial y de Masa</Text>

      {/* Explicación de Contexto */}
      <View style={styles.contextCard}>
        <Text style={styles.contextTitle}>💡 Evaluación de Doble Restricción</Text>
        <Text style={styles.contextBody}>
          El aprovechamiento real de un furgón depende del valor crítico entre la capacidad espacial ($m^3$) y la masa máxima permitida en ejes (kg).
        </Text>
      </View>

      {/* Componente Evaluador Dinámico */}
      <View style={styles.dashboardCard}>
        <Text style={styles.cardTitle}>Diagnóstico de Ocupación en Tiempo Real</Text>
        
        <VolumeProgressBar 
          usedVolume={parseFloat(usedVol) || 0} 
          maxVolume={parseFloat(maxVol) || 1}
          usedWeight={parseFloat(usedWeight) || 0}
          maxWeight={parseFloat(maxWeight) || 1}
          cargoType={cargoType}
        />

        {/* Botones de Escenario Rápido para Demostración */}
        <Text style={styles.presetLabel}>Simular Escenarios de Carga en Vivo:</Text>
        <View style={styles.presetRow}>
          <TouchableOpacity 
            style={styles.presetBtn} 
            onPress={() => applyPreset('Algodón / Esponja', 27, 800)}
          >
            <Text style={styles.presetText}>☁️ Algodón (Voluminoso)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.presetBtn} 
            onPress={() => applyPreset('Acero / Lingotes', 8, 3400)}
          >
            <Text style={styles.presetText}>⚙️ Acero (Pesado)</Text>
          </TouchableOpacity>
        </View>

        {/* Controles de Edición Manual */}
        <View style={styles.inputGrid}>
          <View style={styles.inputCol}>
            <Text style={styles.inputLabel}>Volumen ($m^3$):</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={usedVol} onChangeText={setUsedVol} />
          </View>
          <View style={styles.inputCol}>
            <Text style={styles.inputLabel}>Peso Total (kg):</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={usedWeight} onChangeText={setUsedWeight} />
          </View>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Módulos de Operación</Text>
      
      <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Cubicaje')}>
        <Text style={styles.actionTitle}>📦 Calculadora de Cubicaje e IATA</Text>
        <Text style={styles.actionDesc}>Calcula m³ unitarios y peso volumétrico de cajas/bultos.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Cotizador')}>
        <Text style={styles.actionTitle}>🚚 Cotizador de Fletes</Text>
        <Text style={styles.actionDesc}>Calcula costos por vehículo, kilometraje y recargos.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Balance')}>
        <Text style={styles.actionTitle}>📐 Inclinómetro de Carga</Text>
        <Text style={styles.actionDesc}>Verifica el balance físico del vehículo con el acelerómetro.</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  content: { padding: 20 },
  welcome: { fontSize: 26, fontWeight: 'bold', color: '#F8FAFC' },
  subtitle: { fontSize: 13, color: '#64748B', marginBottom: 14 },
  
  contextCard: { backgroundColor: '#16243A', padding: 12, borderRadius: 10, marginBottom: 16, borderWidth: 1, borderColor: '#334155' },
  contextTitle: { color: '#38BDF8', fontSize: 13, fontWeight: 'bold', marginBottom: 4 },
  contextBody: { color: '#94A3B8', fontSize: 12, lineHeight: 17 },

  dashboardCard: { backgroundColor: '#1E293B', padding: 16, borderRadius: 16, marginBottom: 20 },
  cardTitle: { color: '#F8FAFC', fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  
  presetLabel: { color: '#94A3B8', fontSize: 12, marginTop: 10, marginBottom: 6 },
  presetRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  presetBtn: { flex: 0.48, backgroundColor: '#0F172A', padding: 8, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  presetText: { color: '#38BDF8', fontSize: 11, fontWeight: 'bold' },

  inputGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  inputCol: { flex: 0.48 },
  inputLabel: { color: '#94A3B8', fontSize: 11, marginBottom: 4 },
  input: { backgroundColor: '#0F172A', color: '#F8FAFC', padding: 8, borderRadius: 6, textAlign: 'center', borderColor: '#334155', borderWidth: 1, fontSize: 13 },

  sectionHeader: { color: '#94A3B8', fontSize: 13, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 12 },
  actionCard: { backgroundColor: '#1E293B', padding: 14, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#334155' },
  actionTitle: { color: '#38BDF8', fontSize: 15, fontWeight: 'bold', marginBottom: 2 },
  actionDesc: { color: '#94A3B8', fontSize: 12 },
});