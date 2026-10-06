import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import FreightTicketModal from '../components/FreightTicketModal';
import VehicleDetailModal from '../components/VehicleDetailModal';

export default function CotizadorScreen() {
  const [distance, setDistance] = useState('250');
  const [weight, setWeight] = useState('1500');
  const [selectedVehicle, setSelectedVehicle] = useState('Furgón Mediano');
  
  // Modales
  const [ticketModalVisible, setTicketModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  const vehicles = [
    { name: 'Van / Camioneta', baseRate: 50, costPerKm: 0.8, capacityKg: 1000, volumeM3: 8 },
    { name: 'Furgón Mediano', baseRate: 100, costPerKm: 1.2, capacityKg: 3500, volumeM3: 20 },
    { name: 'Camión Pesado', baseRate: 200, costPerKm: 1.8, capacityKg: 12000, volumeM3: 50 },
  ];

  const currentVehicleObj = vehicles.find(v => v.name === selectedVehicle);

  const handleCalculate = () => {
    const dist = parseFloat(distance);
    const w = parseFloat(weight);

    // Validación activa de errores
    if (isNaN(dist) || dist <= 0 || isNaN(w) || w <= 0) {
      Alert.alert('Entrada Inválida', 'Por favor ingrese valores numéricos mayores a cero.');
      return;
    }

    const veh = currentVehicleObj;
    const weightSurcharge = w > 1000 ? (w - 1000) * 0.05 : 0;
    const totalCost = veh.baseRate + (dist * veh.costPerKm) + weightSurcharge;

    setTicketData({
      vehicle: selectedVehicle,
      distance: dist,
      weight: w,
      volumetricWeight: Math.round(w * 1.1),
      totalCost,
    });
    setTicketModalVisible(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Cotización de Fletes</Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>ℹ️ Modelo de Cálculo Logístico</Text>
        <Text style={styles.infoText}>
          Los valores de la cotización están estructurados bajo la Fórmula Estándar de Costos Logísticos:
        </Text>
        <Text style={styles.formulaText}>Costo Total = Base + (Distancia × $/km) + Recargo Peso</Text>
      </View>

      <Text style={styles.label}>Seleccionar Vehículo:</Text>
      <View style={styles.vehicleSelector}>
        {vehicles.map((v) => (
          <TouchableOpacity
            key={v.name}
            style={[styles.vehicleOption, selectedVehicle === v.name && styles.selectedOption]}
            onPress={() => setSelectedVehicle(v.name)}
          >
            <Text style={[styles.vehicleText, selectedVehicle === v.name && styles.selectedVehicleText]}>
              {v.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {currentVehicleObj && (
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Tarifa de {currentVehicleObj.name}:</Text>
          <Text style={styles.detailItem}>• Tarifa Base: ${currentVehicleObj.baseRate} USD</Text>
          <Text style={styles.detailItem}>• Costo Variable: ${currentVehicleObj.costPerKm} USD / km</Text>
          
          <TouchableOpacity style={styles.specBtn} onPress={() => setDetailModalVisible(true)}>
            <Text style={styles.specBtnText}>📋 Ver Ficha Técnica Completa</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Distancia Estimada (km):</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={distance} onChangeText={setDistance} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Peso Real de la Carga (kg):</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={weight} onChangeText={setWeight} />
      </View>

      <TouchableOpacity style={styles.calculateBtn} onPress={handleCalculate}>
        <Text style={styles.calculateBtnText}>Generar Cotización y Ticket</Text>
      </TouchableOpacity>

      {/* Modal 1: Ticket */}
      <FreightTicketModal
        visible={ticketModalVisible}
        onClose={() => setTicketModalVisible(false)}
        data={ticketData}
      />

      {/* Modal 2: Ficha Técnica */}
      <VehicleDetailModal
        visible={detailModalVisible}
        onClose={() => setDetailModalVisible(false)}
        vehicle={currentVehicleObj}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  content: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 16 },
  infoCard: { backgroundColor: '#1E293B', padding: 14, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#334155' },
  infoTitle: { color: '#38BDF8', fontSize: 14, fontWeight: 'bold', marginBottom: 6 },
  infoText: { color: '#CBD5E1', fontSize: 12 },
  formulaText: { color: '#10B981', fontSize: 12, fontWeight: 'bold', marginTop: 6 },
  label: { color: '#94A3B8', fontSize: 14, marginBottom: 8 },
  vehicleSelector: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  vehicleOption: { flex: 1, backgroundColor: '#1E293B', padding: 10, borderRadius: 8, marginHorizontal: 3, alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  selectedOption: { backgroundColor: '#38BDF8', borderColor: '#38BDF8' },
  vehicleText: { color: '#94A3B8', fontSize: 11, fontWeight: 'bold', textAlign: 'center' },
  selectedVehicleText: { color: '#0F172A' },
  detailCard: { backgroundColor: '#16243A', padding: 12, borderRadius: 8, marginBottom: 16, borderWidth: 1, borderColor: '#334155' },
  detailTitle: { color: '#38BDF8', fontSize: 13, fontWeight: 'bold', marginBottom: 4 },
  detailItem: { color: '#CBD5E1', fontSize: 12, marginVertical: 2 },
  specBtn: { marginTop: 8, padding: 6, backgroundColor: '#1E293B', borderRadius: 6, alignItems: 'center' },
  specBtnText: { color: '#38BDF8', fontSize: 12, fontWeight: 'bold' },
  inputGroup: { marginBottom: 14 },
  input: { backgroundColor: '#1E293B', color: '#F8FAFC', padding: 12, borderRadius: 8, borderBottomWidth: 2, borderColor: '#38BDF8' },
  calculateBtn: { backgroundColor: '#10B981', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 16, marginBottom: 30 },
  calculateBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});