import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useRef, useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  // Permisos
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions({
    writeOnly: true, // solo necesitamos guardar, no leer la galería
  });

  // Aún cargando el estado de los permisos
  if (!cameraPermission || !mediaPermission) return <View />;

  // Pedir permisos si faltan
  if (!cameraPermission.granted || !mediaPermission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>
          Necesitamos permiso de cámara y de galería para continuar.
        </Text>
        <Button
          title="Conceder permisos"
          onPress={async () => {
            await requestCameraPermission();
            await requestMediaPermission();
          }}
        />
      </View>
    );
  }

  const takePhoto = async () => {
    try {
      const photo = await cameraRef.current?.takePictureAsync({ quality: 0.8 });
      if (!photo) return;
      setPhotoUri(photo.uri);

      // Guardar en la galería del celular
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      Alert.alert('Listo', 'La foto se guardó en tu galería.');
    } catch (e) {
      Alert.alert('Error', 'No se pudo tomar o guardar la foto.');
      console.error(e);
    }
  };

  // Vista previa de la foto tomada
  if (photoUri) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photoUri }} style={styles.preview} />
        <Button title="Tomar otra" onPress={() => setPhotoUri(null)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
      <View style={styles.buttons}>
        <Button
          title="Girar cámara"
          onPress={() => setFacing((f) => (f === 'back' ? 'front' : 'back'))}
        />
        <Button title="📸 Tomar foto" onPress={takePhoto} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  text: { textAlign: 'center', marginBottom: 16 },
  camera: { flex: 1 },
  preview: { flex: 1, resizeMode: 'contain' },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
  },
});