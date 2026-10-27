import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList, TouchableOpacity } from 'react-native';
import { supabase } from './supabase';

export default function App() {
  const [producto, setProducto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [listaProductos, setListaProductos] = useState([]);
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        Alert.alert('Error al cargar', error.message);
        return;
      }
      setListaProductos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const guardarProducto = async () => {
    if (!producto || !precio) {
      Alert.alert('Aviso', 'El nombre del producto y el precio son obligatorios.');
      return;
    }

    try {
      if (idEditando) {
        const { error } = await supabase
          .from('productos')
          .update({ producto, descripcion, precio: parseFloat(precio) })
          .eq('id', idEditando);

        if (error) throw error;
        Alert.alert('Éxito', 'Producto actualizado');
      } else {
        const { error } = await supabase
          .from('productos')
          .insert([{ producto, descripcion, precio: parseFloat(precio) }]);

        if (error) throw error;
        Alert.alert('Éxito', 'Producto agregado');
      }

      limpiarFormulario();
      obtenerProductos();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const iniciarEdicion = (item) => {
    setProducto(item.producto);
    setDescripcion(item.descripcion || '');
    setPrecio(item.precio.toString());
    setIdEditando(item.id);
  };

  const limpiarFormulario = () => {
    setProducto('');
    setDescripcion('');
    setPrecio('');
    setIdEditando(null);
  };

  // 1. Alerta de confirmación antes de eliminar
  const confirmarEliminacion = (id) => {
    Alert.alert(
      '¿Eliminar producto?',
      'Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => eliminarProducto(id) },
      ]
    );
  };

  // 2. Función DELETE: Eliminar de Supabase
  const eliminarProducto = async (id) => {
    try {
      const { error } = await supabase
        .from('productos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      Alert.alert('Éxito', 'Producto eliminado');
      obtenerProductos(); // Actualizar la lista al borrar
      
      // Si el usuario estaba editando el producto que acaba de borrar, limpiamos el formulario
      if (idEditando === id) {
        limpiarFormulario();
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.tarjeta}>
      <View style={styles.infoContenedor}>
        <Text style={styles.nombreProducto}>{item.producto}</Text>
        {item.descripcion ? <Text style={styles.textoDescripcion}>{item.descripcion}</Text> : null}
        <Text style={styles.textoPrecio}>${item.precio}</Text>
      </View>
      
      {/* 3. Contenedor para agrupar los botones de acción */}
      <View style={styles.accionesContenedor}>
        <TouchableOpacity 
          style={styles.botonEditar} 
          onPress={() => iniciarEdicion(item)}
        >
          <Text style={styles.textoBotonBlanco}>Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.botonEliminar} 
          onPress={() => confirmarEliminacion(item.id)}
        >
          <Text style={styles.textoBotonBlanco}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{idEditando ? 'Editar Producto' : 'Nuevo Producto'}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={producto}
        onChangeText={setProducto}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción (opcional)"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />
      
      <View style={styles.botonesFormulario}>
        <View style={styles.botonEspacio}>
          <Button 
            title={idEditando ? "Actualizar" : "Guardar"} 
            onPress={guardarProducto} 
          />
        </View>
        {idEditando && (
          <View style={styles.botonEspacio}>
            <Button title="Cancelar" color="red" onPress={limpiarFormulario} />
          </View>
        )}
      </View>

      <Text style={[styles.titulo, { marginTop: 30, marginBottom: 10 }]}>Lista de Productos</Text>
      
      <FlatList
        data={listaProductos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 50,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  botonesFormulario: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonEspacio: {
    flex: 1,
    marginHorizontal: 5,
  },
  lista: {
    flex: 1,
  },
  tarjeta: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  infoContenedor: {
    flex: 1,
  },
  nombreProducto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textoDescripcion: {
    color: '#666',
    marginTop: 4,
  },
  textoPrecio: {
    fontSize: 16,
    color: '#2e8b57',
    fontWeight: 'bold',
    marginTop: 8,
  },
  accionesContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botonEditar: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 8,
  },
  botonEliminar: {
    backgroundColor: '#DC3545', // Rojo
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  textoBotonBlanco: {
    color: '#fff',
    fontWeight: 'bold',
  },
});