import {
  Card,
  GluestackUIProvider,
  Heading,
  Text,
  View,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { ArrowRight } from "@/components/ArrowRight";
import { TopBar } from "@/components/TopBar";
import { useAppSelector } from "@/store";
import { selectOrders } from "@/store/slices/orders";

export default function index() {
  const ordersList = useAppSelector(selectOrders);

  return (
    <GluestackUIProvider config={config}>
      <View style={{ height: 70 }} />

      <TopBar text="Все заказы" />
      {ordersList.map((order) => {
        return (
          <Card
            bgColor="#EDEDED"
            size="lg"
            variant="filled"
            m="$1"
            borderColor="#81838F"
            borderWidth="$1"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            key={order.id}
          >
            <View>
              <Heading mb="$1" size="md">
                {order.id}
              </Heading>
              <Text size="sm">{order.location}</Text>
            </View>

            <ArrowRight />
          </Card>
        );
      })}
    </GluestackUIProvider>
  );
}
