import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TicTacToeScreen() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = checkWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe (Gato)</Text>

      <Text style={styles.status}>
        {winner ? `¡Ganador: ${winner}! 🎉` : `Turno: ${isXNext ? 'X' : 'O'}`}
      </Text>

      <View style={styles.board}>
        {board.map((value, index) => (
          <TouchableOpacity key={index} style={styles.square} onPress={() => handleClick(index)}>
            <Text style={[styles.squareText, value === 'X' ? styles.textX : styles.textO]}>
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetText}>Reiniciar Juego</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#F8F9FA' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  status: { fontSize: 20, fontWeight: '600', marginBottom: 20, color: '#555' },
  board: { width: 300, height: 300, flexDirection: 'row', flexWrap: 'wrap' },
  square: { width: 100, height: 100, borderWidth: 2, borderColor: '#333', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' },
  squareText: { fontSize: 40, fontWeight: 'bold' },
  textX: { color: '#E74C3C' },
  textO: { color: '#3498DB' },
  resetButton: { marginTop: 30, backgroundColor: '#9C27B0', padding: 12, borderRadius: 8 },
  resetText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});