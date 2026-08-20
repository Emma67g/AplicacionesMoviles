import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import DemoImagen from './componentes/DemoImagen';

export default function App() {
  return (
    <View style={styles.container}>
      <DemoImagen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fc9def',
  },
  panel1:{
    flex: 1,
    backgroundColor: '#039111'
  },
  panel2:{
    flex: 1,
    backgroundColor: '#ffffff'
  },
  panel3:{
    flex: 1,
    backgroundColor: '#c00606'
  },
});
