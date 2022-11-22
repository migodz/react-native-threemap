import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapCanvas from './MapCanvas';
import GestureView from './GestureView';

export default function App() {
  return (
    <View style={styles.container}>

      {/* <View style={styles.span}/> */}

      <MapCanvas/>
      
      {/* <View style={styles.span}/> */}
      <GestureView style={styles.gesture}/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  span: {
    flex: 0.5,
    backgroundColor: '#000',
  },
  gesture: {
    flex: 1
  }
});
