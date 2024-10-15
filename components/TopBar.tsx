import React from "react";
import { Pressable, TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { Heading, View, Text } from "@gluestack-ui/themed";

type TopBarProps = {
  left: {
    text?: string;
    onPress?: () => void;
  };
  right: {
    icon?: JSX.Element;
    text?: string;
    onPress?: () => void;
  };
  title: string;
  text: string;
};

export const TopBar = React.memo(
  ({ title, text, left, right }: TopBarProps) => {
    return (
      <View
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        paddingHorizontal={20}
      >
        <Pressable
          hitSlop={{ left: 5, top: 5, right: 5, bottom: 5 }}
          onPress={left?.onPress}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="#007AFF" />
          {left.text && <Text>{left.text}</Text>}
        </Pressable>

        <View padding={9}>
          <Heading fontSize="md" textAlign="center" lineHeight={15}>
            {title}
          </Heading>

          {text && (
            <Text color="#605E5E" textAlign="center">
              {text}
            </Text>
          )}
        </View>

        <TouchableOpacity
          hitSlop={{ left: 5, top: 5, right: 5, bottom: 5 }}
          onPress={right?.onPress}
        >
          {right.icon}
          {right.text && <Text>{right.text}</Text>}
        </TouchableOpacity>
      </View>
    );
  }
);

TopBar.displayName = "TopBar";
