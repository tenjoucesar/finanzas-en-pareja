import React, { useState, useContext } from 'react';
import { Text, View } from 'react-native';
import { Input, Button, ButtonGroup } from 'react-native-elements';
import { ListAndCostsContext } from 'providers/listAndCostsProvider';
import { commaFormatCurrency, getInputValueWithoutCurrency } from 'utils/currency';

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
};


//Clean input after submit

//Refactor.

const AddCostScreen = () => {
  const [selectedPerson, setSelectedPerson] = useState(0);
  const [category, setCategory] = useState(0);
  const [description, setDescription] = useState(undefined);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [cost, setCost] = useState(undefined);
  const { postCost } = useContext(ListAndCostsContext);

  const handleKeyPress = (e) => {
    const inputValue = getInputValueWithoutCurrency(e.target.value);
    const disableButton = isNaN(inputValue) || Number(inputValue) <= 0;
    setButtonDisabled(disableButton)
    setCost(inputValue);
    e.target.value = commaFormatCurrency(inputValue);
  }

  const buildCostObj = () => ({
    amount: cost,
    category: CATEGORY_MAP[category],
    description: description,
    createdAt: Date.now(),
    owner: PERSON_MAP[selectedPerson],
  });

  const submitCost = () => postCost(buildCostObj());


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
