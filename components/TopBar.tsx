import { Heading, View } from "@gluestack-ui/themed";

export const TopBar = ({ text }: { text: string }) => {
  return (
    <View>
      <Heading textAlign="center" padding={9}>
        {text}
      </Heading>

      <View style={{ backgroundColor: "#E6E6E6", height: 1 }} />
    </View>
  );
};
