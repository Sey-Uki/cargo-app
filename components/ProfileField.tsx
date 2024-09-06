import { Text, View } from "@gluestack-ui/themed";

type ProfileFieldProps = {
  title: string;
  text: string;
};

export const ProfileField = ({ title, text }: ProfileFieldProps) => {
  return (
    <View
      flexDirection="row"
      alignItems="center"
      backgroundColor="#fff"
      padding={16}
      borderRadius={10}
    >
      <Text color="$black" fontWeight={500} width={100}>
        {title}
      </Text>
      <Text color="#3C3C434D" fontFamily="SFProText-Regular" fontSize={17}>
        {text}
      </Text>
    </View>
  );
};
