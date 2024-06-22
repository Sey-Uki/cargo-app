import { Redirect } from "expo-router";
import { useState } from "react";

export default function index() {
  const [isLogin, setIsLogin] = useState(false);

  if (!isLogin) {
    return <Redirect href="/sign_in" />;
  }

  return <Redirect href="/(tabs)" />;
}
