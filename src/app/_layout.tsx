import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { CustoDeVidaProvider } from './context/CustoDeVidaContext';
import { InvestimentosProvider } from './context/InvestimentosContext';
import { ValorLivreProvider } from './context/ValorLivreContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ValorLivreProvider>
      <InvestimentosProvider>
        <CustoDeVidaProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="screens/CustoDeVidaScreen" options={{ headerShown: false }} />
              <Stack.Screen name="screens/InvestimentosScreen" options={{ headerShown: false }} />
              <Stack.Screen name="screens/ValorLivreScreen" options={{ headerShown: false }} />
              <Stack.Screen name="screens/DebitoScreen" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
        </CustoDeVidaProvider>
      </InvestimentosProvider>
    </ValorLivreProvider>
  );
}
