import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function IMCScreen() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcularIMC = () => {
    const p = parseFloat(peso);
    const a = parseFloat(altura) / 100; // cm a metros

    if (p > 0 && a > 0) {
      const imc = p / (a * a);
      let estado = '';
      let color = '#333';

      if (imc < 18.5) { estado = 'Bajo peso'; color = '#3B82F6'; }
      else if (imc < 24.9) { estado = 'Normal'; color = '#10B981'; }
      else if (imc < 29.9) { estado = 'Sobrepeso'; color = '#F59E0B'; }
      else { estado = 'Obesidad'; color = '#EF4444'; }

      setResultado({ imc: imc.toFixed(1), estado, color });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de IMC</Text>

      <Text style={styles.label}>Peso (kg):</Text>
      <TextInput style={styles.input} keyboardType="numeric" placeholder="Ej. 70" value={peso} onChangeText={setPeso} />

      <Text style={styles.label}>Altura (cm):</Text>
      <TextInput style={styles.input} keyboardType="numeric" placeholder="Ej. 175" value={altura} onChangeText={setAltura} />

      <TouchableOpacity style={styles.button} onPress={calcularIMC}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {resultado && (
        <View style={[styles.resultBox, { backgroundColor: resultado.color }]}>
          <Text style={styles.resultValue}>{resultado.imc}</Text>
          <Text style={styles.resultStatus}>{resultado.estado}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#F8F9FA' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2C3E50', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, fontWeight: '600', color: '#34495E', marginTop: 15, marginBottom: 5 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, padding: 12, fontSize: 16 },
  button: { backgroundColor: '#FF9800', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 25 },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  resultBox: { marginTop: 30, padding: 20, borderRadius: 12, alignItems: 'center' },
  resultValue: { fontSize: 40, fontWeight: 'bold', color: '#FFF' },
  resultStatus: { fontSize: 20, fontWeight: '600', color: '#FFF', marginTop: 5 },
});