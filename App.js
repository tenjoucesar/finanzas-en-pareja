import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddCostScreen from './Screens/AddCost';
import SeeFinanceScreen from './Screens/SeeFinance';
import { initializeApp } from 'firebase/app';
import { ListAndCostsProvider } from './Providers/listAndCostsProvider';
//Peding firebase config
initializeApp({
  apiKey: 'api-key',
  authDomain: 'project-id.firebaseapp.com',
  databaseURL: "https://finanzas-en-pareja-2249f-default-rtdb.firebaseio.com",
  projectId: 'finanzas-en-pareja-2249f',
  storageBucket: 'project-id.appspot.com',
  messagingSenderId: 'sender-id',
  appId: 'app-id',
  measurementId: 'G-measurement-id',
});

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
    <ListAndCostsProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddCost" component={AddCostScreen} />
            <Stack.Screen name="Finance" component={SeeFinanceScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ListAndCostsProvider>
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
