import { persistor, store } from "@/store";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function Root() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GluestackUIProvider config={config}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(app)" />
          </Stack>
        </GluestackUIProvider>
      </PersistGate>
    </Provider>
  );
}
