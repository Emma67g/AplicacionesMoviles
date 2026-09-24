import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert
} from 'react-native';

export default function App() {
  // Estados para Login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // Estados para Lista de Películas y Modal
  const [movies, setMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Función para Iniciar Sesión en el servidor
  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Error", "Ingresa tu usuario y contraseña");
      return;
    }

    setLoginLoading(true);

    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json().then(data => ({ status: res.status, body: data })))
      .then(({ status, body }) => {
        setLoginLoading(false);
        if (status === 200) {
          setIsLoggedIn(true);
          obtenerPeliculas();
        } else {
          Alert.alert("Error de Inicio de Sesión", body.mensaje || "Credenciales inválidas");
        }
      })
      .catch((error) => {
        setLoginLoading(false);
        Alert.alert("Error de Red", "No se pudo conectar con el servidor backend");
        console.log(error);
      });
  };

  // Función para obtener las películas una vez autenticado
  const obtenerPeliculas = () => {
    setLoadingMovies(true);
    fetch("http://localhost:4000/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoadingMovies(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingMovies(false);
      });
  };

  // Abrir Modal con la película seleccionada
  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  // ----------------------------------------------------
  // VISTA 1: Formulario de Login si NO está autenticado
  // ----------------------------------------------------
  if (!isLoggedIn) {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Acceso MongoDB Atlas</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuario de MongoDB"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loginLoading}>
          {loginLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Conectar a MongoDB</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  // ----------------------------------------------------
  // VISTA 2: Lista de Películas + Modal de Detalle
  // ----------------------------------------------------
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleSelectMovie(item)} activeOpacity={0.7}>
      {item.poster ? (
        <Image source={{ uri: item.poster }} style={styles.poster} />
      ) : (
        <View style={styles.noPoster}>
          <Text style={{ textAlign: 'center', fontSize: 12 }}>No Imagen</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.plot} numberOfLines={3}>
          {item.fullplot || item.plot || "Sin descripción"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      {loadingMovies ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#07f" />
        </View>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      )}

      {/* MODAL DETALLADO DE LA PELÍCULA */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedMovie && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {selectedMovie.poster ? (
                  <Image source={{ uri: selectedMovie.poster }} style={styles.modalPoster} />
                ) : (
                  <View style={[styles.modalPoster, styles.noPoster]}>
                    <Text>Sin Imagen</Text>
                  </View>
                )}

                <Text style={styles.modalTitle}>{selectedMovie.title}</Text>
                
                {selectedMovie.year && (
                  <Text style={styles.modalMeta}>📅 Año: {selectedMovie.year}</Text>
                )}

                {selectedMovie.imdb && selectedMovie.imdb.rating && (
                  <Text style={styles.modalMeta}>⭐ Calificación IMDb: {selectedMovie.imdb.rating} / 10</Text>
                )}

                {selectedMovie.genres && (
                  <Text style={styles.modalMeta}>🎬 Género: {selectedMovie.genres.join(', ')}</Text>
                )}

                {selectedMovie.directors && (
                  <Text style={styles.modalMeta}>🎥 Director(es): {selectedMovie.directors.join(', ')}</Text>
                )}

                {selectedMovie.cast && (
                  <Text style={styles.modalMeta}>🎭 Reparto: {selectedMovie.cast.join(', ')}</Text>
                )}

                <Text style={styles.modalSectionTitle}>Sinopsis Extendida:</Text>
                <Text style={styles.modalPlot}>
                  {selectedMovie.fullplot || selectedMovie.plot || "No hay descripción extendida disponible."}
                </Text>

                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Cerrar Detalle</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // Estilos de Login
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f4f4f6",
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#07f",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  // Estilos de Tarjeta
  card: {
    flexDirection: "row",
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 10,
  },
  noPoster: {
    width: 80,
    height: 120,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  plot: {
    fontSize: 12,
    color: "gray",
  },
  // Estilos del Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxHeight: "85%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  modalPoster: {
    width: 150,
    height: 220,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  modalMeta: {
    fontSize: 13,
    color: "#444",
    marginBottom: 4,
  },
  modalSectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  modalPlot: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#d9534f",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});