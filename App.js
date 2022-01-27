import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddCostScreen from './Screens/AddCost';

const FinanceScreen = ()  => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Finance Screen</Text>
  </View>
);

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <View>
      <Button title='Ver Finanzas' onPress={() => navigation.navigate('Finance')} />
      <Button title='Agregar gasto' onPress={() => navigation.navigate('AddCost')} />
    </View>
  </View>
);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddCost" component={AddCostScreen} />
          <Stack.Screen name="Finance" component={FinanceScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
