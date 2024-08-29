import { Text, View } from "@gluestack-ui/themed";

export const ProfileText = ({ infoText, userText }: any) => {
  return (
    <View
      flexDirection="row"
      alignItems="center"
      backgroundColor="#fff"
      padding={16}
      borderRadius={10}
    >
      <Text color="$black" fontWeight={500} width={100}>
        {infoText}
      </Text>
      <Text color="#3C3C434D" fontFamily="SFProText-Regular" fontSize={17}>
        {userText}
      </Text>
    </View>
  );
};
