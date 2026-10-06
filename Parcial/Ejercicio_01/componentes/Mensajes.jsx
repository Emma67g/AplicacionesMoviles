import { StyleSheet, View, Text } from "react-native";

export default function Mensaje(props){

    return(
        <View>
            <Text style={styles.Colormsg}>{props.msg}</Text>
            <Text style={styles.Colormsg}>{props.num}</Text>
        </View>
    );
    
}

const styles = StyleSheet.create({
  Colormsg: {
    color: 'green',
    backgroundColor: 'black',
  }
}); 