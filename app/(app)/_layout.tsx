import { useAppSelector } from "@/store";
import { selectIsLoggedIn } from "@/store/slices/auth";
import { Redirect } from "expo-router";
import { Stack } from "expo-router/stack";

export default function AppLayout() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <Redirect href="/sign_in" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
