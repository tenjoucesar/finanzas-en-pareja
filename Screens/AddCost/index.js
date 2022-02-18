import React, { useState, useContext } from 'react';
import { Text, View } from 'react-native';
import { Input, Button, ButtonGroup } from 'react-native-elements';
import { getDatabase, ref, onValue, set, push, runTransaction } from 'firebase/database';
import { ListAndContextProvider, ListAndCostsContext } from '../../Providers/listAndCostsProvider';

function commaFormatCurrency(input) {
  if (!input) {
    return '';
  }
  return `₡${input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

function getInputValueWithoutCurrency(value) {
  return Number(value.replace('₡', '').replaceAll(',', ''));
}

const PERSON_MAP = {
  0: 'cesar',
  1: 'lindsay'
};

const CATEGORY_MAP = {
  0: 'compras casa',
  1: 'weed',
  2: 'gastos casa',
  3: 'salida a comer',
  4: 'otro'
}

// Component/Firebase Pending Stuff
//Set lastCost on list.
//Move this into a provider/Pending Stuff.
//Clean input after submit
//Add category & description
//Write batch when upload cost.
//Refactor.
//Move input utils into a util file

const AddCostScreen = () => {
  const [selectedPerson, setSelectedPerson] = useState(0);
  const [category, setCategory] = useState(0);
  const [description, setDescription] = useState(undefined);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [cost, setCost] = useState(undefined);
  const { activeList } = useContext(ListAndCostsContext)
  const db =  getDatabase();

  const handleKeyPress = (e) => {
    const inputValue = getInputValueWithoutCurrency(e.target.value);
    const disableButton = isNaN(inputValue) || Number(inputValue) <= 0;
    setButtonDisabled(disableButton)
    setCost(inputValue);
    e.target.value = commaFormatCurrency(inputValue);
  }

  const submitCost = () => {
    const costs = {
      amount: cost,
      category: CATEGORY_MAP[category],
      description: description,
      timestamp: Date.now()
    }
    debugger;
    const user = PERSON_MAP[selectedPerson];
    const costRef = ref(db, 'costs/' + activeList + `/${user}`);
    //Push to create a new obj
    push(costRef, costs);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Agregar gasto</Text>
      <Text>El gasto lo pago</Text>
      <ButtonGroup
        buttons={['cesar', 'lindsay']}
        selectedIndex={selectedPerson}
        onPress={(value) => setSelectedPerson(value)}
        containerStyle={{ marginBottom: 20 }}
      />
      <Text>Categoria</Text>
      <ButtonGroup
        buttons={['Compras Casa', 'Weed', 'Gastos Casa', 'Salida a Comer', 'Otros']}
        selectedIndex={category}
        onPress={(value) => setCategory(value)}
        containerStyle={{ marginBottom: 20 }}
      />
      <Input
        placeholder="Agrega la descripcion"
        leftIcon={{ type: 'font-awesome', name: 'comment' }}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        placeholder="Agrega el gasto"
        leftIcon={{ type: 'font-awesome', name: 'money' }}
        keyboardType='number-pad'
        onChange={(value) => handleKeyPress(value)}
      />
      <Button title='Guardar costo' disabled={buttonDisabled} onPress={() => submitCost()}/>
    </View>
  )
};

export default AddCostScreen;
