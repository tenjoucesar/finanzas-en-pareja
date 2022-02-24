import React from 'react';
import { ListItem } from 'react-native-elements';
import { Text } from 'react-native';
import { getESLocalDate } from 'utils/date';
import { getTotalAmountCurrency, commaFormatCurrency } from 'utils/currency';

const CostComponent = ({ costs, userName, num }) => (
  <ListItem
    containerStyle={{}}
    disabledStyle={{ opacity: 0.5 }}
    pad={20}
    key={num}
  >
    <ListItem.Content>
      <ListItem.Title>
        <Text>{userName}</Text>
      </ListItem.Title>
      {costs.map((cost, index) => (
        <ListItem
          containerStyle={{}}
          disabledStyle={{ opacity: 0.5 }}
          pad={20}
          key={index}
        >
          <ListItem.Title>
            <Text>{commaFormatCurrency(cost.amount)}</Text>
          </ListItem.Title>
          <ListItem.Subtitle style={{ display: 'flex', flexDirection: 'column' }}>
            <Text>{cost.owner}</Text>
            <Text>{getESLocalDate(cost.createdAt)}</Text>
            <Text>{cost.category}</Text>
            <Text>{cost.description}</Text>
          </ListItem.Subtitle>
        </ListItem>
      ))}

      <ListItem.Title>
        <Text>Total: {getTotalAmountCurrency(costs)}</Text>
      </ListItem.Title>
    </ListItem.Content>
  </ListItem>
);

export default CostComponent;
