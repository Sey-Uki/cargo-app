import { Text } from "@gluestack-ui/themed";
import { View } from "@gluestack-ui/themed";

type Props = {
  label: string;
  value: string;
  marginRight?: number;
};

export const InvoiceItem = ({ label, value, marginRight }: Props) => (
  <View marginRight={marginRight}>
    <Text color="#797676" size="sm">
      {label}
    </Text>
    <Text color="$black" size="md" fontWeight={500}>
      {value}
    </Text>
  </View>
);
