import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider, useAuth } from '../context/AuthContext';

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(tabs)' || segments[0] === 'screens';

    if (!user && inAuthGroup) {
      router.replace('/login' as any);
    } else if (user && (segments[0] as any) === 'login') {
      router.replace('/(tabs)' as any);
    }
  }, [user, loading, segments]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="screens/HomeScreen" options={{ title: 'Ticket Booking', headerShown: false }} />
        <Stack.Screen name="screens/DetailsScreen" options={{ title: 'Movie Details' }} />
        <Stack.Screen name="screens/SeatScreen" options={{ title: 'Select Seats' }} />
        <Stack.Screen name="screens/CheckoutScreen" options={{ title: 'Checkout' }} />
        <Stack.Screen name="screens/SuccessScreen" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
