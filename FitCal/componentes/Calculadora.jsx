import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Modal, Button, Dimensions } from 'react-native';

export default function Calculadora() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [resultadoIMC, setResultadoIMC] = useState('');

  const calcularIMC = () => {
    const p = parseFloat(peso);
    const a = parseFloat(altura);

    if (p && a) {
      const imc = p / (a * a);
      setResultadoIMC(imc.toFixed(2));
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Peso (Kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />

        <Text>Altura (m)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
        />
      </View>

      <Pressable
        onPress={calcularIMC}
        style={({ pressed }) => [
          styles.boton,
          { backgroundColor: pressed ? 'blue' : 'gray' }
        ]}
      >
        <Text style={styles.textoBoton}>Calcular IMC</Text>
      </Pressable>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalFondo}>
          <View style={styles.modalContenido}>
            <Text>Resultado de tu IMC:</Text>
            <Text style={styles.resultadoTexto}>{resultadoIMC}</Text>
            
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between', 
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 10,
    padding: 5,
  },
  boton: {
    padding: 10,
    alignItems: 'center',
    marginBottom: 20, 
  },
  textoBoton: {
    color: 'white',
  },
  modalFondo: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContenido: {
    height: Dimensions.get('window').height * 0.5, 
    width: '80%', 
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1, 
    borderColor: 'black',
  },
  resultadoTexto: {
    fontSize: 32,
    marginVertical: 20,
  },
});
