import React from 'react';
import { StatusBar, View, Text, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { 
  createDrawerNavigator, 
  DrawerContentScrollView, 
  DrawerItemList 
} from '@react-navigation/drawer';

// Importación de pantallas
import HomeScreen from './src/screens/HomeScreen';
import DiagnosticoScreen from './src/screens/DiagnosticoScreen';
import CubicajeScreen from './src/screens/CubicajeScreen';
import CotizadorScreen from './src/screens/CotizadorScreen';
import BalanceScreen from './src/screens/BalanceScreen';

const Drawer = createDrawerNavigator();

// Componente Personalizado para el Encabezado y Pie de la Barra Lateral
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2891/2891415.png' }} 
          style={styles.logo} 
        />
        <Text style={styles.appName}>FreightCube</Text>
        <Text style={styles.appSubtitle}>Sistema de Gestión Logística</Text>
      </View>

      <View style={styles.divider} />

      {/* Lista de Opciones del Menú */}
      <View style={styles.itemsContainer}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.drawerFooter}>
        <Text style={styles.footerText}>FreightCube v1.0 • 2026</Text>
      </View>
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0F172A',
          },
          headerTintColor: '#38BDF8',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#F8FAFC',
          },
          headerShadowVisible: false,
          sceneContainerStyle: {
            backgroundColor: '#0F172A',
          },
          drawerStyle: {
            backgroundColor: '#1E293B',
            width: 280,
          },
          drawerActiveBackgroundColor: '#38BDF820',
          drawerActiveTintColor: '#38BDF8',
          drawerInactiveTintColor: '#94A3B8',
          drawerLabelStyle: {
            fontSize: 14,
            fontWeight: '600',
            marginLeft: -10,
          },
        }}
      >
        <Drawer.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Inicio • FreightCube',
            drawerLabel: '🏠 Inicio'
          }} 
        />
        <Drawer.Screen 
          name="Diagnostico" 
          component={DiagnosticoScreen} 
          options={{ 
            title: 'Diagnóstico de Ocupación',
            drawerLabel: '📊 Diagnóstico de Ocupación'
          }} 
        />
        <Drawer.Screen 
          name="Cubicaje" 
          component={CubicajeScreen} 
          options={{ 
            title: 'Cubicaje e IATA',
            drawerLabel: '📦 Cubicaje e IATA'
          }} 
        />
        <Drawer.Screen 
          name="Cotizador" 
          component={CotizadorScreen} 
          options={{ 
            title: 'Cotizador de Fletes',
            drawerLabel: '🚚 Cotizador de Fletes'
          }} 
        />
        <Drawer.Screen 
          name="Balance" 
          component={BalanceScreen} 
          options={{ 
            title: 'Inclinómetro de Carga',
            drawerLabel: '📐 Inclinómetro de Carga'
          }} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#1E293B',
    paddingTop: 20,
  },
  drawerHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'flex-start',
  },
  logo: {
    width: 44,
    height: 44,
    marginBottom: 10,
  },
  appName: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: 'bold',
  },
  appSubtitle: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  itemsContainer: {
    flex: 1,
    paddingTop: 6,
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    alignItems: 'center',
  },
  footerText: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '500',
  },
});