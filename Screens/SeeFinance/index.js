import React, { useState, useContext } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { ListItem, Avatar, Button, Card } from 'react-native-elements';
import { ListAndCostsContext } from 'providers/listAndCostsProvider';
import { commaFormatCurrency } from 'utils/currency';
import { getESLocalDate } from 'utils/date';




const SeeFinanceScreen = ({ navigation })  => {
  const { activeList, requestCosts, activeListCosts, createNewListAndAssignID } = useContext(ListAndCostsContext);

  const requestListsAndRedirect = () => {
    if (!activeListCosts) requestCosts();
    navigation.navigate('SeeCosts');
  };

  const onActiveListFinish = () => {
    createNewListAndAssignID();
  };

  const ActiveListMainInfo = () => (
    <>
      <Card.Title>Creada el {getESLocalDate(activeList.createdAt)}</Card.Title>
      <Card.Title>Lista {activeList.active ? 'Activa' : 'Inactiva'}</Card.Title>
    </>
  );

  const NoLastCostContent = () => (
    <>
      <Card containerStyle={{}} wrapperStyle={{}}>
        <ActiveListMainInfo />
      </Card>

      <Text>Deseas agregar un costo nuevo?</Text>
      <Button title='Agregar un costo nuevo' onPress={() => navigation.navigate('AddCost')} />
    </>
  );

  const LastCostContent = () => (
    <>
      <TouchableHighlight
        onPress={() => requestListsAndRedirect()}
      >
        <Card containerStyle={{}} wrapperStyle={{}}>
          <Card.Title>Presionar para ver todos los gatos</Card.Title>
          <ActiveListMainInfo />
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
      <Button title='Finalizar Lista Y Sumar al total de deuda' onPress={() => onActiveListFinish()} />
    </>
  );

  const Content = !!activeList?.lastCost ? LastCostContent : NoLastCostContent;
  return(
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    {/* Pending Work:
        -Finish List, set it as false.
        -Create a new list and set it as active
        -Total deuda.
        - Split lastCost into a new component.
        - Conditional content for if has last cost, if not suggest to add a new cost.
        - If activeList has no cost don't allow finish it.
    */}
    <Text>Lista Actual</Text>
      <Content />
  </View>
)};

export default SeeFinanceScreen;
