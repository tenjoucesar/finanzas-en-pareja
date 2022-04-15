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

const AddCostScreen = () => {
  const [selectedPerson, setSelectedPerson] = useState(0);
  const [category, setCategory] = useState(0);
  const [description, setDescription] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [cost, setCost] = useState(undefined);
  const { postCost } = useContext(ListAndCostsContext);

  const handleKeyPress = (e) => {
    const inputValue = getInputValueWithoutCurrency(e.target.value);
    const disableButton = isNaN(inputValue) || Number(inputValue) <= 0;
    setButtonDisabled(disableButton)
    setCost(inputValue);
    e.target.value = commaFormatCurrency(inputValue);
  };

  const buildCostObj = () => ({
    amount: cost,
    category: CATEGORY_MAP[category],
    description: description,
    createdAt: Date.now(),
    owner: PERSON_MAP[selectedPerson],
  });

  const cleanFormValues = () => {
    setDescription('');
    setCost('');
    setCategory(0);
  };

  const renderSuccessMessage = () => {
    setShowSuccessMessage(true);
    const timer = setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
    return () => clearTimeout(timer);
  };

  const submitCost = async () => {
    await postCost(buildCostObj());
    renderSuccessMessage();
    cleanFormValues();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* Pending Work
        - Styling
        - Add a green check at Success Message.
      */}
      {showSuccessMessage && <Text>Costo agregado exitosamente.</Text>}
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
        value={description}
      />
      <Input
        placeholder="Agrega el gasto"
        leftIcon={{ type: 'font-awesome', name: 'money' }}
        keyboardType='number-pad'
        onChange={(value) => handleKeyPress(value)}
        value={commaFormatCurrency(cost)}
      />
      <Button title='Guardar costo' disabled={buttonDisabled} onPress={() => submitCost()}/>
    </View>
  )
};

export default AddCostScreen;
