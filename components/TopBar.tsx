import { Text } from "@gluestack-ui/themed";
import { Divider, Heading, View } from "@gluestack-ui/themed";
import { Pressable } from "react-native";

type TopBarProps = {
  button?: {
    jsx: JSX.Element;
    onPress: () => void;
  };
  title: string;
  text?: string;
};

export const TopBar = ({ title, text, button }: TopBarProps) => {
  return (
    <View>
      <View
        alignItems="center"
        flexDirection={button && "row"}
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
          <Heading textAlign="center">
            {title}
          </Heading>

          {text && <Text color="#605E5E" textAlign="center">{text}</Text>}
        </View>
        <View />
      </View>

      <Divider style={{ backgroundColor: "#E6E6E6", height: 1 }} />
    </View>
  );
};
