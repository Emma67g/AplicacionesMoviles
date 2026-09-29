import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function VolumeProgressBar({ usedVolume, maxVolume, usedWeight, maxWeight, cargoType }) {
  const safeMaxVol = maxVolume > 0 ? maxVolume : 1;
  const safeMaxWeight = maxWeight > 0 ? maxWeight : 1;

  const volPercentage = Math.min(Math.round((usedVolume / safeMaxVol) * 100), 100);
  const weightPercentage = Math.min(Math.round((usedWeight / safeMaxWeight) * 100), 100);

  // Animaciones nativas
  const animVol = useRef(new Animated.Value(0)).current;
  const animWeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animVol, { toValue: volPercentage, duration: 500, useNativeDriver: false }),
      Animated.timing(animWeight, { toValue: weightPercentage, duration: 500, useNativeDriver: false }),
    ]).start();
  }, [volPercentage, weightPercentage]);

  const getColor = (pct) => {
    if (pct < 75) return '#10B981'; // Verde (Seguro)
    if (pct <= 95) return '#F59E0B'; // Amarillo (Precaución)
    return '#EF4444'; // Rojo (Límite / Sobrecarga)
  };

  // Diagnóstico logístico
  const getDiagnosis = () => {
    if (volPercentage >= 100 || weightPercentage >= 100) return { text: '🚨 SOBRECARGA DETECTADA', color: '#EF4444' };
    if (weightPercentage > volPercentage) return { text: '⚖️ Carga Pesada (Limitada por Peso en Ejes)', color: '#F59E0B' };
    if (volPercentage > weightPercentage) return { text: '📦 Carga Voluminosa (Limitada por Espacio)', color: '#38BDF8' };
    return { text: '✅ Carga Balanceada (Peso y Espacio Equilibrados)', color: '#10B981' };
  };

  const diagnosis = getDiagnosis();

  return (
    <View style={styles.container}>
      {/* Indicador de Tipo de Carga */}
      <View style={styles.contextHeader}>
        <Text style={styles.contextLabel}>Mercancía Registrada:</Text>
        <Text style={styles.cargoTypeText}>{cargoType || 'Carga General'}</Text>
      </View>

      <View style={styles.divider} />

      {/* Barra 1: Espacio / Volumen */}
      <View style={styles.barSection}>
        <View style={styles.row}>
          <Text style={styles.barLabel}>📐 Ocupación Espacial (Volumen):</Text>
          <Text style={[styles.pctText, { color: getColor(volPercentage) }]}>{volPercentage}%</Text>
        </View>
        <View style={styles.track}>
          <Animated.View style={[styles.fill, { 
            width: animVol.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
            backgroundColor: getColor(volPercentage) 
          }]} />
        </View>
        <Text style={styles.subtext}>{usedVolume.toFixed(1)} m³ de {safeMaxVol} m³ útiles</Text>
      </View>

      {/* Barra 2: Masa / Peso Utile */}
      <View style={styles.barSection}>
        <View style={styles.row}>
          <Text style={styles.barLabel}>⚖️ Capacidad de Masa (Peso):</Text>
          <Text style={[styles.pctText, { color: getColor(weightPercentage) }]}>{weightPercentage}%</Text>
        </View>
        <View style={styles.track}>
          <Animated.View style={[styles.fill, { 
            width: animWeight.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
            backgroundColor: getColor(weightPercentage) 
          }]} />
        </View>
        <Text style={styles.subtext}>{usedWeight.toFixed(0)} kg de {safeMaxWeight} kg máx. autorizados</Text>
      </View>

      {/* Diagnóstico en Tiempo Real */}
      <View style={[styles.diagnosisBox, { borderColor: diagnosis.color }]}>
        <Text style={[styles.diagnosisText, { color: diagnosis.color }]}>{diagnosis.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#1E293B', padding: 16, borderRadius: 14, marginVertical: 8 },
  contextHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  contextLabel: { color: '#94A3B8', fontSize: 12 },
  cargoTypeText: { color: '#38BDF8', fontSize: 13, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 12 },
  barSection: { marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  barLabel: { color: '#F8FAFC', fontSize: 13, fontWeight: '600' },
  pctText: { fontSize: 13, fontWeight: 'bold' },
  track: { height: 10, backgroundColor: '#0F172A', borderRadius: 5, overflow: 'hidden', marginVertical: 4 },
  fill: { height: '100%', borderRadius: 5 },
  subtext: { color: '#64748B', fontSize: 11, textAlign: 'right' },
  diagnosisBox: { marginTop: 6, padding: 8, borderRadius: 8, borderWidth: 1, backgroundColor: '#0F172A', alignItems: 'center' },
  diagnosisText: { fontSize: 12, fontWeight: 'bold' },
});