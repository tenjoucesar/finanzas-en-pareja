import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ListItem, Avatar, Button } from 'react-native-elements';

const finanzas = {
  active: true,
  createdAt: undefined,
  finished: undefined,
  listOfCosts: [
    {
      owner: 'lindsay',
      costs: [
        {
          name: 'Mc',
          category: 'comida',
          amount: 3000,
        },
        {
          name: 'Baldi',
          category: 'viaje',
          amount: 25000,
        }
      ]
    },
    {
      owner: 'Cesar',
      costs: [
        {
          name: 'Compras Super',
          category: 'gastos casa',
          amount: 13000,
        },
        {
          name: 'Luz',
          category: 'gastos casa',
          amount: 30000,
        }
      ]
    },
  ]
};
const getTotalAmount = (costs) => {
  let total = 0;
  costs.map((cost) => total = total + cost.amount);

  return total;
};

const SeeFinanceScreen = ()  => {
  return(
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Finance Screen</Text>
    <View style={{ flex: 1, flexDirection: 'row',alignItems: 'flex-start', justifyContent: 'space-between'}}>
      {finanzas.listOfCosts.map((list, i) => (

        <ListItem
          containerStyle={{}}
          disabledStyle={{ opacity: 0.5 }}
          pad={20}
          key={i}
        >
          <ListItem.Content>
            <Avatar
              source={{
                uri:
                  "https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4"
              }}
            />
            <ListItem.Title>
              <Text>{list.owner}</Text>
            </ListItem.Title>
            {list.costs.map((cost, index) => (
              <ListItem
                containerStyle={{}}
                disabledStyle={{ opacity: 0.5 }}
                pad={20}
                key={index}
              >
                <ListItem.Title>
                  <Text>{cost.amount}</Text>
                </ListItem.Title>
                <ListItem.Subtitle style={{ display: 'flex', flexDirection: 'column'}}>
                  <Text>{cost.name}</Text>
                  <Text>{cost.category}</Text>
                </ListItem.Subtitle>
              </ListItem>
            ))}

            <ListItem.Title>
              <Text>Total: {getTotalAmount(list.costs)}</Text>
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
    <Button title='Finalizar Lista Y Sumar al total de deuda' />
  </View>
)};

export default SeeFinanceScreen;
