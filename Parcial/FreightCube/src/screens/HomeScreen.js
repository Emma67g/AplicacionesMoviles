import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  // Animaciones de Entrada (FadeIn + SlideUp)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const modules = [
    {
      id: 'Diagnostico',
      title: '📊 Diagnóstico de Ocupación en Tiempo Real',
      desc: 'Evalúa la doble restricción física entre peso ($kg$) y espacio útil ($m^3$).',
      screen: 'Diagnostico',
    },
    {
      id: 'Cubicaje',
      title: '📦 Calculadora de Cubicaje e IATA',
      desc: 'Calcula volumen unitario, peso volumétrico y cantidad de bultos.',
      screen: 'Cubicaje',
    },
    {
      id: 'Cotizador',
      title: '🚚 Cotizador de Fletes',
      desc: 'Estima costos por tipo de vehículo, kilometraje y recargos por peso.',
      screen: 'Cotizador',
    },
    {
      id: 'Balance',
      title: '📐 Inclinómetro de Carga',
      desc: 'Monitorea el balance y nivelación del contenedor mediante acelerómetro.',
      screen: 'Balance',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        
        {/* Encabezado Principal */}
        <View style={styles.headerContainer}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2891/2891415.png' }} 
            style={{ width: 48, height: 48, marginBottom: 8 }} 
          />
          <Text style={styles.appName}>FreightCube</Text>
          <Text style={styles.tagline}>Sistema de Gestión y Cálculo Logístico</Text>
        </View>

        <Text style={styles.sectionTitle}>Módulos de Operación</Text>

        {/* Tarjetas de Módulos */}
        {modules.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.moduleCard}
            onPress={() => navigation.navigate(item.screen)}
            activeOpacity={0.8}
          >
            <Text style={styles.moduleTitle}>{item.title}</Text>
            <Text style={styles.moduleDesc}>{item.desc}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.actionText}>Abrir Módulo →</Text>
            </View>
          </TouchableOpacity>
        ))}

      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  content: { padding: 20 },
  headerContainer: { marginBottom: 24, marginTop: 10 },
  appName: { fontSize: 30, fontWeight: 'bold', color: '#F8FAFC', letterSpacing: 0.5 },
  tagline: { fontSize: 13, color: '#38BDF8', marginTop: 4, fontWeight: '500' },
  sectionTitle: { color: '#94A3B8', fontSize: 13, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 14, letterSpacing: 1 },
  moduleCard: { backgroundColor: '#1E293B', padding: 18, borderRadius: 14, marginBottom: 14, borderWidth: 1, borderColor: '#334155' },
  moduleTitle: { color: '#F8FAFC', fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  moduleDesc: { color: '#94A3B8', fontSize: 12, lineHeight: 18, marginBottom: 12 },
  cardFooter: { borderTopWidth: 1, borderTopColor: '#334155', paddingTop: 8, alignItems: 'flex-end' },
  actionText: { color: '#38BDF8', fontSize: 12, fontWeight: 'bold' },
});