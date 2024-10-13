import React, { useCallback } from "react";
import { Pressable, TouchableOpacity } from "react-native";

import * as Clipboard from 'expo-clipboard';

import { MaterialIcons } from "@expo/vector-icons";

import { Heading, View, Text } from "@gluestack-ui/themed";

type TopBarProps = {
  button: {
    jsx: JSX.Element;
    onPress: () => void;
  };
  title: string;
  text: string;
};

export const TopBar = React.memo(({ title, text, button }: TopBarProps) => {
  const onCopy = useCallback(async() => {
    await Clipboard.setStringAsync(title);
  }, [title])

  return (
    <View
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      paddingHorizontal={20}
    >
      <Pressable
        hitSlop={{ left: 5, top: 5, right: 5, bottom: 5 }}
        onPress={button.onPress}
      >
        {button.jsx}
      </Pressable>

      <View padding={9}>
        <Heading fontSize="md" textAlign="center" lineHeight={15}>
          {title}
        </Heading>

        {text && <Text color="#605E5E" textAlign="center">{text}</Text>}
      </View>

      <TouchableOpacity
        hitSlop={{ left: 5, top: 5, right: 5, bottom: 5 }}
        onPress={onCopy}
      >
        <MaterialIcons name="file-copy" size={22} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
})

TopBar.displayName = 'TopBar'
