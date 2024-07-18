import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, ClerkLoaded, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Slot, Stack } from "expo-router";
import { useFonts } from "expo-font";
import LoginScreen from './../components/LoginScreen';
import React from 'react';

// Implementing tokenCache
const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env');
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'montserrat': require('./../assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-medium': require('./../assets/fonts/Montserrat-Medium.ttf'),
    'montserrat-bold': require('./../assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Render nothing or a loading indicator while fonts are loading
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <SignedIn>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
