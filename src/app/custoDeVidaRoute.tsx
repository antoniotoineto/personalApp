import React from 'react';
import CustoDeVidaScreen from '../screens/CustoDeVidaScreen'; 
import { Stack } from 'expo-router';

export default function CustoDeVidaRoute() {
    return (
        <>
          <Stack.Screen options={{ headerShown: false }} />
          <CustoDeVidaScreen />
        </>
      );
}