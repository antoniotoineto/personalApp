import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from './(tabs)/explore';
import CustoDeVidaScreen from './screens/CustoDeVidaScreen';
import InvestimentoScreen from './screens/InvestimentosScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Explore">
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="CustoDeVida" component={CustoDeVidaScreen} />
        <Stack.Screen name="Investimento" component={InvestimentoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
