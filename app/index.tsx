import { useAppSelector } from "@/store";
import { selectIsLoggedIn } from "@/store/slices/auth";
import { Redirect } from "expo-router";

export default function index() {
  const isLogIn = useAppSelector(selectIsLoggedIn);

  if (!isLogIn) {
    return <Redirect href="/sign_in" />;
  }

  return <Redirect href="/(tabs)" />;
}
