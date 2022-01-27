import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Input, Button, ButtonGroup } from 'react-native-elements';

function commaFormatCurrency(input) {
  if (!input) {
    return '';
  }
  return `₡${input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

function getInputValueWithoutCurrency(value) {
  return Number(value.replace('₡', '').replaceAll(',', ''));
}


const AddCostScreen = () => {
  const [selectedPerson, setSelectedPerson] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [cost, setCost] = useState(undefined);

  const handleKeyPress = (e) => {
    const inputValue = getInputValueWithoutCurrency(e.target.value);
    const disableButton = isNaN(inputValue) || Number(inputValue) <= 0;
    setButtonDisabled(disableButton)
    setCost(inputValue);
    e.target.value = commaFormatCurrency(inputValue);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Agregar gasto</Text>
      <Text>El gasto lo pago</Text>
      <ButtonGroup
        buttons={['Cesar', 'Lindsay']}
        selectedIndex={selectedPerson}
        onPress={(value) => setSelectedPerson(value)}
        containerStyle={{ marginBottom: 20 }}
      />
      <Input
        placeholder="Agrega el gasto"
        leftIcon={{ type: 'font-awesome', name: 'money' }}
        keyboardType='number-pad'
        onChange={value => handleKeyPress(value)}
      />
      <Button title='Guardar costo' disabled={buttonDisabled}/>
    </View>
  )
};

export default AddCostScreen;
