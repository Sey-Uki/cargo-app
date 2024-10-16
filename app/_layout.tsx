import { persistor, store } from "@/store";
import { config } from "@gluestack-ui/config";
import { SafeAreaView } from "react-native-safe-area-context";

import { GluestackUIProvider } from "@gluestack-ui/themed";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';

SplashScreen.preventAutoHideAsync();

export default function Root() {
  const [loaded, error] = useFonts({
    'SFProText-Regular': require('../assets/fonts/SFProText-Regular.ttf'),
    'SFProText-Medium': require('../assets/fonts/SFProText-Medium.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GluestackUIProvider config={config}>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: "white"
            }}
          >
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(app)" />
            </Stack>
          </SafeAreaView>
        </GluestackUIProvider>
      </PersistGate>
    </Provider>
  );
}
