import { Text, View } from "@gluestack-ui/themed";

type OrderProps = {
  order: {
    goods: number;
    insurance: number;
    package: number;
    finalPrice: number;
  };
  paymentText: string;
};

export const OrderPayment = ({ order, paymentText }: OrderProps) => {
  return (
    <View>
      <View gap={8}>
        <View flexDirection="row" justifyContent="space-between">
          <Text color="#797676" size="md">
            Товар на сумму
          </Text>
          <Text color="black" size="md">
            {order.goods} ₽
          </Text>
        </View>

        <View flexDirection="row" justifyContent="space-between">
          <Text color="#797676" size="md">
            Страховка
          </Text>
          <Text color="black" size="md">
            {order.insurance} ₽
          </Text>
        </View>

        <View flexDirection="row" justifyContent="space-between">
          <Text color="#797676" size="md">
            Упаковка
          </Text>
          <Text color="black" size="md">
            {order.package} ₽
          </Text>
        </View>
      </View>

      <View flexDirection="row" justifyContent="space-between" marginTop={15}>
        <Text color="black" size="md" fontWeight={500}>
          {paymentText}
        </Text>
        <Text color="black" size="lg" fontWeight={500}>
          {order.finalPrice} ₽
        </Text>
      </View>
    </View>
  );
};
