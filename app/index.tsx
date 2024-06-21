import { Link, Redirect } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";

const index = () => {
  const [isLogin, setIsLogin] = useState(false);

  if (!isLogin) {
    return <Redirect href="/sign_in" />;
  }

  return <Redirect href="/home" />;
};

export default index;

const styles = StyleSheet.create({});
