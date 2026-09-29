import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import InclinometerGauge from '../components/InclinometerGauge';
import SensorGuideModal from '../components/SensorGuideModal';

export default function BalanceScreen() {
  const [guideVisible, setGuideVisible] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Verificación de Balance</Text>
      <Text style={styles.desc}>
        Coloque el dispositivo plano sobre la superficie del furgón o palet para verificar la inclinación física del contenedor.
      </Text>
      
      <TouchableOpacity style={styles.guideBtn} onPress={() => setGuideVisible(true)}>
        <Text style={styles.guideBtnText}>❓ Ver Instrucciones de Calibración</Text>
      </TouchableOpacity>

      <InclinometerGauge />

      <SensorGuideModal visible={guideVisible} onClose={() => setGuideVisible(false)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  content: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 8 },
  desc: { color: '#94A3B8', fontSize: 14, marginBottom: 16, lineHeight: 20 },
  guideBtn: { backgroundColor: '#1E293B', padding: 12, borderRadius: 8, marginBottom: 16, borderWidth: 1, borderColor: '#334155', alignItems: 'center' },
  guideBtnText: { color: '#10B981', fontWeight: 'bold', fontSize: 13 },
});