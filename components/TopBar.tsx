import { Divider, Heading, View } from "@gluestack-ui/themed";
import { Pressable } from "react-native";

type TopBarProps = {
  button?: {
    jsx: JSX.Element;
    onPress: () => void;
  };
  text: string;
};

export const TopBar = ({ text, button }: TopBarProps) => {
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

        <Heading textAlign="center" padding={9}>
          {text}
        </Heading>

        <View />
      </View>

      <Divider style={{ backgroundColor: "#E6E6E6", height: 1 }} />
    </View>
  );
};
