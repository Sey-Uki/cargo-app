import { Text, View } from "@gluestack-ui/themed";

type EmailAndPhoneProps = {
  email: string | undefined;
  phone: string | undefined;
};

export const EmailAndPhone = ({ email, phone }: EmailAndPhoneProps) => {
  return (
    <View backgroundColor="#fff" borderRadius={10}>
      <View
        padding={16}
        flexDirection="row"
        borderBottomColor="#E6E6E6"
        borderBottomWidth={1}
      >
        <Text color="$black" fontWeight={500} width={100}>
          Email
        </Text>
        <Text color="#3C3C434D" fontFamily="SFProText-Regular" fontSize={17}>
          {email}
        </Text>
      </View>
      <View padding={16} flexDirection="row">
        <Text color="$black" fontWeight={500} width={100}>
          Телефон
        </Text>
        <Text color="#3C3C434D" fontFamily="SFProText-Regular" fontSize={17}>
          {phone}
        </Text>
      </View>
    </View>
  );
};
