import { StyleSheet, Text, View } from 'react-native';
import Cat from './componentes/Cat.jsx'
import Mensaje from './componentes/Mensajes.jsx';

export default function App() {
  //Codigo
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text style={styles.texto_rojo}> Este es otro componente de texto </Text>
      <Cat></Cat>
      <Mensaje msg="Mi mensaje como propiedad" num="3000"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto_rojo:{
    color:'red',
  },
}); 