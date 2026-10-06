import { StyleSheet, View, ImageBackground, Dimensions, Image, Text } from "react-native";

const DemoImagen = () =>{
    return(
        <View styles={styles.container}>
            <ImageBackground
                style={styles.fondo}
                source={require('../assets/images.png')}
            >
            <View style={styles.container}>
                <Text style={styles.textoGatos}>Gatos HTTP</Text>
                <Image
                    style={styles.foto}
                    source={{uri:'https://http.cat/301'}}
                />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fondo: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  foto: {
    width: 200,
    height: 200,
    borderRadius: 16,
    borderWidth: 10,
    borderColor:'#bd5',
    shadowColor: '#444',
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    elevation: 8,
  },
    textoGatos: {
    position: 'absolute',     
    top: 100,                
    width: Dimensions.get("window").width,            
    textAlign: 'center',      
    fontSize: 64,                   
    backgroundColor: 'rgba(38, 0, 255, 0.5)', 
  }
});

export default DemoImagen;