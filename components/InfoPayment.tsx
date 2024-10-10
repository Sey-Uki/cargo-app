import { Text } from "@gluestack-ui/themed";
import { View } from "@gluestack-ui/themed";

type Props = {
  label: string;
  value: number;
};

export const InfoPayment = ({ label, value }: Props) => (
  <View flexDirection="row" justifyContent="space-between">
    <Text color="#797676" size="md">
      {label}
    </Text>
    <Text color="black" size="md">
      {value} ₽
    </Text>
  </View>
);
