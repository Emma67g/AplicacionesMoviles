import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AccelerometerSensor from './componentes/AccelerometerSensor';
import BallGame from './componentes/BallGame';
import GyroscopeSensor from './componentes/GyroscopeSensor';
import GyroBallGame from './componentes/GyroBallGame';
import MagnetometerSensor from './componentes/MagnetometerSensor';
import DigitalCompass from './componentes/DigitalCompass';
import PedometerSensor from './componentes/PedometerSensor';

export default function App() {
  return (
    <View style={styles.container}>
      <PedometerSensor />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
});
