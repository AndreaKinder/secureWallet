import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Transactions from './transactions';
import App from './index';

export default function RootLayout() {
  return (
    <Stack>
       <Stack.Screen name="index" isLoggedIn={false} content={App} />
       <Stack.Screen name="transactions" content={Transactions} />
    </Stack>
  );
}

