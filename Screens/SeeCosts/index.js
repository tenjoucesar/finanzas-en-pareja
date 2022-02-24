import React, { useContext } from 'react';
import { Text, View } from 'react-native';

import CostComponent from 'components/Costs';
import { ListAndCostsContext } from 'providers/listAndCostsProvider';

const SeeCostsScreen = () => {
  const { activeListCosts } = useContext(ListAndCostsContext);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Costos</Text>
      {activeListCosts && (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <CostComponent
            costs={activeListCosts.lindsay}
            userName='Lindsay'
            num={1}
          />
          <CostComponent
            costs={activeListCosts.cesar}
            userName='Cesar'
            num={2}
          />
        </View>
      )}
    </View>
  )
};

export default SeeCostsScreen;
