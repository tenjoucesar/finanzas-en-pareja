import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <View>
      <Button title='Ver Finanzas' onPress={() => navigation.navigate('Finance')} />
      <Button title='Agregar gasto' onPress={() => navigation.navigate('AddCost')} />
    </View>
  </View>
);

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
