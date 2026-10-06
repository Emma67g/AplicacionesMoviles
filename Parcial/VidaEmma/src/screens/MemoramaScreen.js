import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const EMOJIS = ['🐶', '🐱', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁'];

export default function MemoramaScreen() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    reiniciarJuego();
  }, []);

  const reiniciarJuego = () => {
    const duplicated = [...EMOJIS, ...EMOJIS];
    const shuffled = duplicated.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
  };

  const handleCardPress = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched((prev) => [...prev, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memorama</Text>

      <View style={styles.grid}>
        {cards.map((emoji, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <TouchableOpacity
              key={index}
              style={[styles.card, isFlipped && styles.cardFlipped]}
              onPress={() => handleCardPress(index)}
            >
              <Text style={styles.cardText}>{isFlipped ? emoji : '❓'}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={reiniciarJuego}>
        <Text style={styles.resetText}>Reiniciar Juego</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#F8F9FA' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: 320 },
  card: { width: 70, height: 70, backgroundColor: '#6C63FF', justifyContent: 'center', alignItems: 'center', margin: 5, borderRadius: 10 },
  cardFlipped: { backgroundColor: '#FFF', borderWidth: 2, borderColor: '#6C63FF' },
  cardText: { fontSize: 30 },
  resetButton: { marginTop: 30, backgroundColor: '#EF4444', padding: 12, borderRadius: 8 },
  resetText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});