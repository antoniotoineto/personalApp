import React from 'react';
import ValorLivreScreen from '../screens/ValorLivreScreen';
import { Stack } from 'expo-router';

export default function ValorLivreRoute() {
    return (
        <>
          <Stack.Screen options={{ headerShown: false }} />
          <ValorLivreScreen />
        </>
      );
}