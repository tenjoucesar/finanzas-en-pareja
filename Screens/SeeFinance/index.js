import React, { useState, useContext } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { ListItem, Avatar, Button, Card } from 'react-native-elements';
import { ListAndCostsContext } from 'providers/listAndCostsProvider';
import { commaFormatCurrency } from 'utils/currency';
import { getESLocalDate } from 'utils/date';

const SeeFinanceScreen = ({ navigation })  => {
  const { activeList, requestCosts, activeListCosts } = useContext(ListAndCostsContext);

  const requestListsAndRedirect = () => {
    if (!activeListCosts) requestCosts();
    navigation.navigate('SeeCosts');
  }

  return(
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Lista Actual</Text>
    <TouchableHighlight
      onPress={() => requestListsAndRedirect()}
    >
      <Card containerStyle={{}} wrapperStyle={{}}>
        <Card.Title>Presionar para ver todos los gatos</Card.Title>
        <Card.Title>Creada el {getESLocalDate(activeList.createdAt)}</Card.Title>
        <Card.Title>Lista {activeList.active ? 'Activa' : 'Inactiva'}</Card.Title>
        <Card.Divider />
        <Card containerStyle={{ paddingBottom: 15 }} wrapperStyle={{}}>
          <Card.Title>Ultimo Costo</Card.Title>
          <Card.Title>Pagado por: {activeList.lastCost.owner}</Card.Title>
          <Text>Costo: {commaFormatCurrency(activeList.lastCost.amount)}</Text>
          <Text>Fecha: {getESLocalDate(activeList.lastCost.createdAt)}</Text>
          <Text>Categoria: {activeList.lastCost.category}</Text>
          <Text>Descripcion: {activeList.lastCost.description}</Text>
        </Card>
      </Card>
    </TouchableHighlight>
    <Button title='Finalizar Lista Y Sumar al total de deuda' />
  </View>
)};

export default SeeFinanceScreen;
