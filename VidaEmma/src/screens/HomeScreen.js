import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const cards = [
    { title: 'Calculadora de Propinas', icon: 'cash-outline', screen: 'Propinas', color: '#4CAF50' },
    { title: 'Calculadora IMC', icon: 'fitness-outline', screen: 'IMC', color: '#FF9800' },
    { title: 'Juegos (Gato & Memorama)', icon: 'game-controller-outline', screen: 'JuegosTab', color: '#9C27B0' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }}>
        <Text style={styles.welcomeText}>¡Bienvenido a VidaEmma!</Text>
        <Text style={styles.description}>Selecciona una opción del menú o toca abajo para comenzar:</Text>

        {cards.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { borderLeftColor: item.color }]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Ionicons name={item.icon} size={32} color={item.color} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={24} color="#888" />
          </TouchableOpacity>
        ))}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F9' },
  content: { padding: 20 },
  welcomeText: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  description: { fontSize: 16, color: '#666', marginBottom: 25 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: { flex: 1, marginLeft: 15, fontSize: 17, fontWeight: '600', color: '#333' },
});