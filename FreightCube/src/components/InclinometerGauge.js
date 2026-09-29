import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function InclinometerGauge() {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    Accelerometer.setUpdateInterval(100);
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  // Conversión de datos del acelerómetro a ángulos de inclinación (Grados)
  const tiltX = Math.round(x * 90);
  const tiltY = Math.round(y * 90);
  const isBalanced = Math.abs(tiltX) <= 3 && Math.abs(tiltY) <= 3;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Nivelador Fisico de Carga (Acelerómetro)</Text>
      
      <View style={styles.gaugeContainer}>
        <View style={[
          styles.bubble, 
          { 
            transform: [
              { translateX: Math.max(-80, Math.min(80, tiltX * 2)) },
              { translateY: Math.max(-80, Math.min(80, tiltY * 2)) }
            ],
            backgroundColor: isBalanced ? '#10B981' : '#EF4444'
          }
        ]} />
      </View>

      <View style={styles.statusBox}>
        <Text style={[styles.statusText, { color: isBalanced ? '#10B981' : '#EF4444' }]}>
          {isBalanced ? '✓ CARGA BALANCEADA' : '⚠️ DESBALANCE DETECTADO'}
        </Text>
        <Text style={styles.degText}>Inclinación Lateral (X): {tiltX}° | Inclinación Frontal (Y): {tiltY}°</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginVertical: 10,
  },
  title: { color: '#F8FAFC', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  gaugeContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    overflow: 'hidden',
  },
  bubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    position: 'absolute',
  },
  statusBox: { marginTop: 12, alignItems: 'center' },
  statusText: { fontSize: 14, fontWeight: 'bold', letterSpacing: 1 },
  degText: { color: '#94A3B8', fontSize: 12, marginTop: 4 },
});