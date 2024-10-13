import React from "react";
import { Pressable } from "react-native";

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
  return (
    <View
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      paddingHorizontal={20}
    >
      {button && (
        <Pressable
          hitSlop={{ left: 5, top: 5, right: 5, bottom: 5 }}
          onPress={button.onPress}
        >
          {button.jsx}
        </Pressable>
      )}
      <View padding={9}>
        <Heading fontSize="md" textAlign="center" lineHeight={15}>
          {title}
        </Heading>

        {text && <Text color="#605E5E" textAlign="center">{text}</Text>}
      </View>

      <View />
    </View>
  );
})

TopBar.displayName = 'TopBar'
