import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddCostScreen from 'screens/AddCost';
import SeeFinanceScreen from 'screens/SeeFinance';
import HomeScreen from 'screens/Home';
import SeeCostsScreen from 'screens/SeeCosts';
import { initializeApp } from 'firebase/app';
import { ListAndCostsProvider } from 'providers/listAndCostsProvider';

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
            <Stack.Screen name="SeeCosts" component={SeeCostsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ListAndCostsProvider>
  );
}
