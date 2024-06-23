import { store } from "@/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function Root() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(app)" />
      </Stack>
    </Provider>
  );
}
