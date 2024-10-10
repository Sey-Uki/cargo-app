import { Text, View } from "@gluestack-ui/themed";
import { InfoPayment } from "./InfoPayment";

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
        <InfoPayment label="Товар на сумму" value={order.goods} />
        <InfoPayment label="Страховка" value={order.insurance} />
        <InfoPayment label="Упаковка" value={order.package} />
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
