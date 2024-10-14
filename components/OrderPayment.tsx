import { Text, View } from "@gluestack-ui/themed";
import { PaymentItem } from "./PaymentItem";

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
        <PaymentItem label="Товар на сумму" value={order.goods} />
        <PaymentItem label="Страховка" value={order.insurance} />
        <PaymentItem label="Упаковка" value={order.package} />
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
