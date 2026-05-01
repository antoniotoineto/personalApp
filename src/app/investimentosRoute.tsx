import React from 'react';
import InvestimentosScreen from '../screens/InvestimentosScreen';
import { Stack } from 'expo-router';

export default function InvestimentosRoute() {
    return (
        <>
          <Stack.Screen options={{ headerShown: false }} />
          <InvestimentosScreen />
        </>
      );
}