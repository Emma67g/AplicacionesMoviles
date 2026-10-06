import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SensorGuideModal({ visible, onClose }) {
  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.header}>📐 Guía de Uso del Inclinómetro</Text>
          <View style={styles.divider} />

          <Text style={styles.step}>1. Apoye el smartphone sobre una superficie plana en el contenedor.</Text>
          <Text style={styles.step}>2. Observe el indicador central animado.</Text>
          <Text style={styles.step}>3. Ajuste la carga hasta que el indicador se torne <Text style={{color: '#10B981', fontWeight: 'bold'}}>VERDE</Text>.</Text>
          <Text style={styles.step}>4. Evite mover el dispositivo durante el proceso de medición física.</Text>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Comenzar Medición</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#1E293B', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#10B981' },
  header: { color: '#10B981', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 12 },
  step: { color: '#CBD5E1', fontSize: 13, marginVertical: 6, lineHeight: 18 },
  closeBtn: { marginTop: 16, backgroundColor: '#10B981', padding: 12, borderRadius: 8, alignItems: 'center' },
  closeText: { color: '#FFFFFF', fontWeight: 'bold' }
});