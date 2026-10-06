import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function VehicleDetailModal({ visible, onClose, vehicle }) {
  if (!vehicle) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.header}>🚛 Especificaciones Técnicas</Text>
          <Text style={styles.vehicleName}>{vehicle.name}</Text>
          <View style={styles.divider} />

          <Text style={styles.item}>• Capacidad Máxima: {vehicle.capacityKg} kg</Text>
          <Text style={styles.item}>• Volumen Útil: {vehicle.volumeM3} m³</Text>
          <Text style={styles.item}>• Tarifa Base de Salida: ${vehicle.baseRate} USD</Text>
          <Text style={styles.item}>• Costo Variable: ${vehicle.costPerKm} USD / km</Text>
          <Text style={styles.item}>• Tipo de Licencia Requerida: C3 / Comercial</Text>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Entendido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#1E293B', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#38BDF8' },
  header: { color: '#38BDF8', fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  vehicleName: { color: '#F8FAFC', fontSize: 20, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 12 },
  item: { color: '#CBD5E1', fontSize: 14, marginVertical: 4 },
  closeBtn: { marginTop: 18, backgroundColor: '#38BDF8', padding: 12, borderRadius: 8, alignItems: 'center' },
  closeText: { color: '#0F172A', fontWeight: 'bold' }
});