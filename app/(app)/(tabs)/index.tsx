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
import { Pressable } from "react-native";
import { router } from "expo-router";

export default function index() {
  const ordersList = useAppSelector(selectOrders);

  return (
    <GluestackUIProvider config={config}>
      <View style={{ height: 70 }} />

      <TopBar text="Все заказы" />
      <View marginTop={14}>
        {ordersList.map((order) => {
          return (
            <Pressable
              key={order.id}
              onPress={() => {
                router.navigate({
                  pathname: "/(cards)/[id]",
                  params: { id: order.id },
                });
              }}
            >
              <Card
                bgColor={
                  order.status === "paid"
                    ? "rgba(21, 124, 19, 0.15)"
                    : "#FFFFFF"
                }
                size="lg"
                variant="filled"
                m="$0.5"
                borderColor={order.status === "paid" ? "#157C13" : "#81838F"}
                borderWidth="$1"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                borderRadius={4}
              >
                <View gap={3}>
                  <Heading size="md">{order.id}</Heading>
                  <Text size="sm" color="$black">{order.location}</Text>
                  {order.status !== "transit" && (
                    <Text
                      size="sm"
                      color={order.status === "paid" ? "#157C13" : "#000000"}
                      fontWeight={500}
                    >
                      {order.status === "paid" ? "Оплачено" : "Ждет оплаты"}
                    </Text>
                  )}
                </View>

                <ArrowRight />
              </Card>
            </Pressable>
          );
        })}
      </View>
    </GluestackUIProvider>
  );
}
