import { Tabs } from "expo-router";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000000'
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Заказы",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "truck-delivery" : "truck-delivery-outline"}
              size={24}
              color={focused ? "#000000" : "#828282"}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Профиль",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              size={24}
              color={focused ? "#000000" : "#828282"}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
