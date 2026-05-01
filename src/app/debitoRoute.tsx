import React from 'react';
import { Stack } from 'expo-router';
import DebitoScreen from '../screens/DebitoScreen';

export default function DebitoRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false}} />
      <DebitoScreen />
    </>
  );
}