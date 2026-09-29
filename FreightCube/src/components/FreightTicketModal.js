import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function FreightTicketModal({ visible, onClose, data }) {
  if (!data) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.ticketHeader}>📦 RESUMEN DE COTIZACIÓN DE FLETE</Text>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Vehículo Selected:</Text>
            <Text style={styles.value}>{data.vehicle}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Distancia:</Text>
            <Text style={styles.value}>{data.distance} km</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Peso Total:</Text>
            <Text style={styles.value}>{data.weight} kg</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Peso Volumétrico:</Text>
            <Text style={styles.value}>{data.volumetricWeight} kg</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>Costo Total Estimado:</Text>
            <Text style={styles.totalValue}>${data.totalCost.toFixed(2)} USD</Text>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar Ticket</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#38BDF8',
  },
  ticketHeader: { color: '#38BDF8', fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 },
  label: { color: '#94A3B8', fontSize: 14 },
  value: { color: '#F8FAFC', fontSize: 14, fontWeight: '600' },
  totalLabel: { color: '#F8FAFC', fontSize: 16, fontWeight: 'bold' },
  totalValue: { color: '#10B981', fontSize: 20, fontWeight: 'bold' },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#38BDF8',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: { color: '#0F172A', fontWeight: 'bold', fontSize: 16 },
});