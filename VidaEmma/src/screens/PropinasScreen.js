import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function PropinasScreen() {
  const [monto, setMonto] = useState('');
  const [porcentaje, setPorcentaje] = useState(15);
  const [personas, setPersonas] = useState('1');

  const numMonto = parseFloat(monto) || 0;
  const numPersonas = parseInt(personas) || 1;
  const propinaTotal = (numMonto * porcentaje) / 100;
  const totalConPropina = numMonto + propinaTotal;
  const totalPorPersona = totalConPropina / numPersonas;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Calculadora de Propinas</Text>

      <Text style={styles.label}>Monto de la Cuenta ($):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ej. 500"
        value={monto}
        onChangeText={setMonto}
      />

      <Text style={styles.label}>Porcentaje de Propina (%):</Text>
      <View style={styles.percentContainer}>
        {[10, 15, 20, 25].map((pct) => (
          <TouchableOpacity
            key={pct}
            style={[styles.pctButton, porcentaje === pct && styles.pctActive]}
            onPress={() => setPorcentaje(pct)}
          >
            <Text style={[styles.pctText, porcentaje === pct && styles.pctActiveText]}>{pct}%</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Número de Personas:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="1"
        value={personas}
        onChangeText={setPersonas}
      />

      <View style={styles.resultCard}>
        <Text style={styles.resultText}>Propina Total: ${propinaTotal.toFixed(2)}</Text>
        <Text style={styles.resultText}>Total General: ${totalConPropina.toFixed(2)}</Text>
        <Text style={styles.resultHighlight}>Por Persona: ${totalPorPersona.toFixed(2)}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F8F9FA', flexGrow: 1 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2C3E50', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, fontWeight: '600', color: '#34495E', marginTop: 15, marginBottom: 5 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, padding: 12, fontSize: 16 },
  percentContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  pctButton: { flex: 1, padding: 12, backgroundColor: '#E2E8F0', borderRadius: 8, alignItems: 'center', marginHorizontal: 4 },
  pctActive: { backgroundColor: '#4CAF50' },
  pctText: { fontWeight: 'bold', color: '#475569' },
  pctActiveText: { color: '#FFF' },
  resultCard: { backgroundColor: '#10B981', padding: 20, borderRadius: 12, marginTop: 25, alignItems: 'center' },
  resultText: { fontSize: 16, color: '#E6F4EA', marginBottom: 5 },
  resultHighlight: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginTop: 10 },
});